import { db } from '$lib/server/db';
import { pages } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	// fetch data here
	const page = await db.select().from(pages).orderBy(desc(pages.createdAt)).limit(1);
	return { page: page[0] };
};
