import { db } from '$lib/server/db';
import { blogInsertSchema, blogs } from '$lib/server/db/schema';
import { createSlug } from '$lib/utils/stringUtils.js';

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const title = formData?.get('title') as string;
			const text = formData?.get('text') as string;
			const slug = createSlug(title);

			const data = { title, slug, text };
			const parsed = blogInsertSchema.parse(data);

			// write to db
			await db.insert(blogs).values(parsed);

			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false, err };
		}
	}
};
