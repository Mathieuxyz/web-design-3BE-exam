import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const blogArticles = pgTable("blog_articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  content: text("content").notNull(),
});

export type BlogArticle = typeof blogArticles.$inferSelect;
