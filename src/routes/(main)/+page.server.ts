import { db } from '$lib/server/db';
import { blogs, pages } from '$lib/server/db/schema';
import { asc, desc, eq, isNull } from 'drizzle-orm';

export const load = async () => {
	// fetch data here
	const page = await db.select().from(pages).where(isNull(pages.next)).limit(1);
	const previous = await db.select().from(pages).where(eq(pages.next, page[0].slug)).limit(1);
	const blog = await db.select().from(blogs).orderBy(desc(blogs.createdAt)).limit(1);
	const first = await db.select().from(pages).orderBy(asc(pages.pagenum)).limit(1);

	return {
		page: page[0],
		previous: previous[0],
		blog: blog[0],
		first: first[0]
	};
};
