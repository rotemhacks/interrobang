import { sql } from 'drizzle-orm';
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
	number: integer(), // is this necessary?
	url: varchar({ length: 255 }).notNull(),
	chapterId: integer(),
	tags: text(),
	comment: text(),
	next: varchar({ length: 255 })
});

export const chapters = pgTable('chapters', {
	id: serial('id').primaryKey(),
	title: varchar({ length: 255 }),
	volumeId: integer()
});

export const volumes = pgTable('volumes', {
	id: serial('id').primaryKey(),
	title: varchar({ length: 255 })
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