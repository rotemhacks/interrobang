import { db } from '$lib/server/db';
import { chapterInsertSchema, chapters, volumes } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const title = formData?.get('title') as string;
			const chapnum = Number(formData?.get('chapnum'));
			const volumeId = Number(formData?.get('volumeId'));

			// validation
			const data = { title, chapnum, volumeId };
			const parsed = chapterInsertSchema.parse(data);

			// write to db
			await db.insert(chapters).values(parsed);

			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false, err };
		}
	}
};

export const load = async () => {
	const vols = await db.select().from(volumes).orderBy(desc(volumes.volnum));
	const chaps = await db.select().from(chapters).orderBy(desc(chapters.chapnum));

	return {
		volumes: vols,
		chapters: chaps
	};
};
