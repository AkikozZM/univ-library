import { date, varchar, uuid, integer, pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';



export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom().unique(),
  fullName: varchar("full_name", {length:255}).notNull(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  email: text('email').notNull().unique(),
  universityCard: text("university_card").notNull().unique(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createAt: timestamp("create_at", {
    withTimezone:true,
  }).defaultNow(),
});
