import { db } from '$lib/server/db';
import { pages } from '$lib/server/db/schema.js';
import { writeFile } from 'node:fs/promises';
import { extname } from 'path';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// upload
		const formData = await request.formData();
		const uploadedFile = formData?.get('file') as File; // TODO: better stuff than casting
		const filename = `uploads/${crypto.randomUUID()}${extname(uploadedFile?.name)}`;
		await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));

		const title = formData?.get('title') as string;
		const slug = formData?.get('slug') as string;

		// write to db
		await db.insert(pages).values({ url: filename, title, slug });

		return { success: true };
	}
};
