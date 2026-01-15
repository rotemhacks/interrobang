import { db } from '$lib/server/db';
import { chapters, pageInsertSchema, pages, volumes } from '$lib/server/db/schema.js';
import { desc, eq, isNull } from 'drizzle-orm';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';
import sharp from 'sharp';

export const actions = {
	default: async ({ request }) => {
		try {
			// upload file
			const formData = await request.formData();
			const uploadedFile = formData?.get('file') as File;
			const imagefilename = crypto.randomUUID() + extname(uploadedFile?.name);

			const filename = `uploads/pages/${imagefilename}`;
			const fileBuffer = Buffer.from(await uploadedFile?.arrayBuffer());
			await writeFile(filename, fileBuffer);

			// generate thumbnail and upload
			const thumbname = `uploads/thumbs/${imagefilename}`;
			const thumbBuffer = await sharp(fileBuffer).resize(150).toBuffer();
			await writeFile(thumbname, thumbBuffer);

			const title = formData?.get('title') as string;
			const slug = formData?.get('slug') as string;
			const pagenum = Number(formData?.get('pagenum'));
			const chapterId = Number(formData?.get('chapterId'));
			const comment = formData?.get('comment') as string;

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
};

export const load = async () => {
	// latest page for page number
	const page = await db.select().from(pages).where(isNull(pages.next)).limit(1);
	// chapters for.. chapters
	const chaps = await db.select().from(chapters).orderBy(desc(chapters.chapnum));
	const allPages = await db
		.select({
			page: pages,
			chapter: chapters,
			volume: volumes
		})
		.from(pages)
		.innerJoin(chapters, eq(pages.chapterId, chapters.id))
		.innerJoin(volumes, eq(chapters.volumeId, volumes.id))
		.orderBy(desc(volumes.id), desc(chapters.id), desc(pages.pagenum));

	console.log(allPages);
	return {
		page: page[0],
		chapters: chaps,
		pages: allPages
	};
};
