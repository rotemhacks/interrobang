import { sql, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const creator = pgTable('creator', {
	id: serial('id').primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull()
});

// Comic tables
export const pages = pgTable('pages', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().default(sql`now()`),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull().unique(),
	pagenum: integer().unique(),
	url: varchar({ length: 255 }).notNull(),
	thumb: varchar({ length: 255 }).notNull(),
	chapterId: integer(),
	comment: text(),
	next: varchar({ length: 255 })
});

export const chapters = pgTable('chapters', {
	id: serial('id').primaryKey(),
	title: varchar({ length: 255 }),
	chapnum: integer().unique(),
	volumeId: integer()
});

export const volumes = pgTable('volumes', {
	id: serial('id').primaryKey(),
	title: varchar({ length: 255 }),
	volnum: integer().unique().notNull()
});

// Extra features tables
export const blogs = pgTable('blogs', {
	id: serial('id').primaryKey(),
	createdAt: timestamp().default(sql`now()`),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull().unique(),
	text: text()
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	tag: varchar({ length: 255 }).notNull().unique()
});

export const volumeRelations = relations(volumes, ({ many }) => ({
	chapters: many(chapters)
}));

export const chapterRelations = relations(chapters, ({ one, many }) => ({
	volume: one(volumes, {
		fields: [chapters.volumeId],
		references: [volumes.id]
	}),
	pages: many(pages)
}));

export const pageRelations = relations(pages, ({ one }) => ({
	chapter: one(chapters, {
		fields: [pages.chapterId],
		references: [chapters.id]
	})
}));
