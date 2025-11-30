import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    type: text("type", { enum: ["Mensalista", "Diarista"] }).notNull(),
    avatar: text("avatar"), // URL or placeholder string
    // Skills (1-5)
    speed: integer("speed").notNull().default(3),
    intelligence: integer("intelligence").notNull().default(3),
    stamina: integer("stamina").notNull().default(3),
    vision: integer("vision").notNull().default(3),
    skill: integer("skill").notNull().default(3),
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;
