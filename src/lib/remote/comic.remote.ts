import { form, query } from '$app/server';
import { db } from '$lib/server/db';
import { chapters, pages, pageInsertSchema, volumes } from '$lib/server/db/schema.js';
import { createSlug } from '$lib/utils/stringUtils';
import { asc, desc, eq, isNull } from 'drizzle-orm';
import { writeFile } from 'fs/promises';
import { extname } from 'path';
import sharp from 'sharp';
import { z } from 'zod';

export const getAllPages = query(async () => db.query.pages.findMany());
export const getAllChapters = query(async () => db.query.chapters.findMany());
export const getAllVolumes = query(async () => db.query.volumes.findMany());

export const getAllPagesWithDetails = query(async () =>
	db
		.select({
			page: pages,
			chapter: chapters,
			volume: volumes
		})
		.from(pages)
		.innerJoin(chapters, eq(pages.chapterId, chapters.id))
		.innerJoin(volumes, eq(chapters.volumeId, volumes.id))
		.orderBy(desc(volumes.id), desc(chapters.id), desc(pages.pagenum))
);

export const getAllPagesForArchive = query(async () => {
	const result = await db.query.volumes.findMany({
		with: {
			chapters: {
				orderBy: (chapters, { asc }) => [asc(chapters.chapnum)],
				with: {
					pages: {
						orderBy: (pages, { asc }) => [asc(pages.pagenum)]
					}
				}
			}
		}
	});

	result.sort((a, b) => a.volnum - b.volnum);
	return result;
});

export const getPageBySlug = query(z.string(), async (slug) =>
	db.select().from(pages).where(eq(pages.slug, slug))
);

export const getPreviousPageBySlug = query(z.string(), async (slug) =>
	db.select().from(pages).where(eq(pages.next, slug))
);

export const getFirstPage = query(async () =>
	db.select().from(pages).orderBy(asc(pages.pagenum)).limit(1)
);

export const getLatestPage = query(async () => db.select().from(pages).where(isNull(pages.next)));

export const addNewPage = form(
	z.object({
		file: z
			.instanceof(File)
			.refine((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), {
				message: 'Invalid image file type'
			}),
		title: z.string().min(1, 'Title is required'),
		pagenum: z.number().gt(0),
		chapterId: z.coerce.number().gt(0),
		comment: z.string()
	}),
	async ({ file, title, pagenum, chapterId, comment }) => {
		try {
			// upload file
			const imagefilename = crypto.randomUUID() + extname(file?.name);

			const filename = `uploads/pages/${imagefilename}`;
			const fileBuffer = Buffer.from(await file?.arrayBuffer());
			await writeFile(filename, fileBuffer);

			// generate thumbnail and upload
			const thumbname = `uploads/thumbs/${imagefilename}`;
			const thumbBuffer = await sharp(fileBuffer).resize(150).toBuffer();
			await writeFile(thumbname, thumbBuffer);

			const slug = createSlug(title);

			const pageData = {
				url: '/' + filename,
				thumb: '/' + thumbname,
				title,
				slug,
				pagenum,
				comment,
				chapterId
			};
			// validation
			const parsed = pageInsertSchema.parse(pageData);

			// update previous page's 'next' with this page's slug
			const previous = await db.select().from(pages).where(isNull(pages.next)).limit(1);
			if (previous[0]) {
				await db.update(pages).set({ next: slug }).where(eq(pages.slug, previous[0].slug));
			}
			// write to db
			await db.insert(pages).values(parsed);

			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false, err };
		}
	}
);

export const editPage = form(
	z.object({
		id: z.number().gt(0),
		file: z.instanceof(File).optional(),
		title: z.string().min(1, 'Title is required'),
		pagenum: z.number().gt(0),
		chapterId: z.coerce.number().gt(0),
		comment: z.string()
	}),
	async ({ id, file, title, pagenum, chapterId, comment }) => {
		try {
			const [current] = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
			const slug = createSlug(title);
			const updateData: Record<string, unknown> = { title, slug, pagenum, chapterId, comment };

			if (file && file.size > 0) {
				// upload new file
				const imagefilename = crypto.randomUUID() + extname(file.name);

				const filename = `uploads/pages/${imagefilename}`;
				const fileBuffer = Buffer.from(await file.arrayBuffer());
				await writeFile(filename, fileBuffer);

				// generate thumbnail and upload
				const thumbname = `uploads/thumbs/${imagefilename}`;
				const thumbBuffer = await sharp(fileBuffer).resize(150).toBuffer();
				await writeFile(thumbname, thumbBuffer);

				updateData.url = '/' + filename;
				updateData.thumb = '/' + thumbname;
			}

			if (current && slug !== current.slug) {
				await db.update(pages).set({ next: slug }).where(eq(pages.next, current.slug));
			}

			await db.update(pages).set(updateData).where(eq(pages.id, id));

			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false, err };
		}
	}
);
