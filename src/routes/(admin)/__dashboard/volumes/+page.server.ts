import { db } from '$lib/server/db';
import { volumeInsertSchema, volumes } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const title = formData?.get('title') as string;
			const volnum = Number(formData?.get('volnum'));

			// validation
			const data = { title, volnum };
			const parsed = volumeInsertSchema.parse(data);

			// write to db
			await db.insert(volumes).values(parsed);

			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false, err };
		}
	}
};

export const load = async () => {
	const vols = await db.select().from(volumes).orderBy(desc(volumes.volnum));

	return {
		volumes: vols
	};
};
