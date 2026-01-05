import { db } from '$lib/server/db';
import { chapters, pages } from '$lib/server/db/schema.js';
import { desc, eq, isNull } from 'drizzle-orm';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// TODO: try/catch/finally
		// TODO: validation

		// upload
		try {
			const formData = await request.formData();
			const uploadedFile = formData?.get('file') as File;
			const filename = `uploads/${crypto.randomUUID()}${extname(uploadedFile?.name)}`;
			await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));

			const title = formData?.get('title') as string;
			const slug = formData?.get('slug') as string;
			const pagenum = Number(formData?.get('pagenum'));
			const chapterId = Number(formData?.get('chapterId'));
			const comment = formData?.get('comment') as string;

			// update previous page's 'next' with this page's slug
			const previous = await db.select().from(pages).where(isNull(pages.next)).limit(1);
			if (previous[0]) {
				await db.update(pages).set({ next: slug }).where(eq(pages.slug, previous[0].slug));
			}
			// write to db
			await db
				.insert(pages)
				.values({ url: '/' + filename, title, slug, pagenum, comment, chapterId });

			return { success: true };
		} catch (err) {
			console.log(err);
			return { success: false, err };
		}
	}
};

export const load = async () => {
	// latest page for page number
	const page = await db.select().from(pages).where(isNull(pages.next)).limit(1);
	// chapters for.. chapters
	const chaps = await db.select().from(chapters).orderBy(desc(chapters.chapnum));

	return {
		page: page[0],
		chapters: chaps
	};
};
