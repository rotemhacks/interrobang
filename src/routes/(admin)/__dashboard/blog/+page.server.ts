import { db } from '$lib/server/db';
import { blogs } from '$lib/server/db/schema';
import { createSlug } from '$lib/utils/stringUtils.js';

export const actions = {
	default: async ({ request }) => {
		// TODO: try/catch/finally
		// TODO: validation

		const formData = await request.formData();
		const title = formData?.get('title') as string;
		const text = formData?.get('text') as string; // sanitize here too?
		const slug = createSlug(title);

		// write to db
		await db.insert(blogs).values({ title, slug, text });

		return { success: true };
	}
};
