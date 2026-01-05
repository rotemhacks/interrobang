import { db } from '$lib/server/db';
import { volumes } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		// TODO: try/catch/finally
		// TODO: validation

		const formData = await request.formData();
		const title = formData?.get('title') as string;
		const volnum = Number(formData?.get('volnum'));

		// write to db
		await db.insert(volumes).values({ title, volnum });

		return { success: true };
	}
};

export const load = async () => {
	const vols = await db.select().from(volumes).orderBy(desc(volumes.volnum));

	return {
		volumes: vols
	};
};
