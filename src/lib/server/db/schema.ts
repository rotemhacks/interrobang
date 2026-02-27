import { sql, relations } from 'drizzle-orm';
import {
	boolean,
	index,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Comic tables
export const pages = pgTable('pages', {
	id: serial('id').primaryKey(),
	createdAt: timestamp()
		.default(sql`now()`)
		.notNull(),
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
	text: text().notNull()
});

export const tags = pgTable('tags', {
	id: serial('id').primaryKey(),
	tag: varchar({ length: 255 }).notNull().unique()
});

// Relations
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

// validation schemas
export const pageInsertSchema = createInsertSchema(pages);
export const chapterInsertSchema = createInsertSchema(chapters);
export const volumeInsertSchema = createInsertSchema(volumes);
export const blogInsertSchema = createInsertSchema(blogs);

// better-auth tables
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	role: text('role'),
	banned: boolean('banned').default(false),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires')
});

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		impersonatedBy: text('impersonated_by')
	},
	(table) => [index('session_userId_idx').on(table.userId)]
);

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));
