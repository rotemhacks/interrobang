import { query } from '$app/server';
import { db } from '$lib/server/db';
import { chapters, pages, volumes } from '$lib/server/db/schema.js';
import { asc, desc, eq, isNull } from 'drizzle-orm';
import z from 'zod';

export const getAllPages = query(async () => db.query.pages.findMany());
export const getAllChapters = query(async () => db.query.chapters.findMany());
export const getAllVolumes = query(async () => db.query.chapters.findMany());

export const getAllPagesWithDetails = query(async () =>
	db
		.select({
			page: pages,
			chapter: chapters,
			volume: volumes
		})
		.from(pages)
		.innerJoin(chapters, eq(pages.chapterId, chapters.id))
		.innerJoin(volumes, eq(chapters.volumeId, volumes.id))
		.orderBy(desc(volumes.id), desc(chapters.id), desc(pages.pagenum))
);

export const getPageBySlug = query(z.string(), async (slug) =>
	db.select().from(pages).where(eq(pages.slug, slug))
);

export const getPreviousPageBySlug = query(z.string(), async (slug) =>
	db.select().from(pages).where(eq(pages.next, slug))
);

export const getFirstPage = query(async () =>
	db.select().from(pages).orderBy(asc(pages.pagenum)).limit(1)
);

export const getLatestPage = query(async () => db.select().from(pages).where(isNull(pages.next)));
