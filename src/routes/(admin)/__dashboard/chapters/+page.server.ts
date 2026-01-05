import { db } from '$lib/server/db';
import { chapters, volumes } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		// TODO: try/catch/finally
		// TODO: validation

		const formData = await request.formData();
		const title = formData?.get('title') as string;
		const chapnum = Number(formData?.get('chapnum'));
		const volumeId = Number(formData?.get('volumeId'));

		// write to db
		await db.insert(chapters).values({ title, chapnum, volumeId });

		return { success: true };
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
