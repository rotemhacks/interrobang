import { db } from '$lib/server/db';
import { pages } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	// fetch data here
	const page = await db.select().from(pages).where(eq(pages.slug, params.slug)).limit(1);
	const previous = await db.select().from(pages).where(eq(pages.next, page[0].slug)).limit(1);

	return {
		page: page[0],
		previous: previous[0]
	};
};
