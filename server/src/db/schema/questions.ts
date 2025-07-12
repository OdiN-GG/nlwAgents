import { uuid, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const questions = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),
  roomId : uuid().references(()=> rooms.id),
  description: text().notNull(),
  answer: text(),
  createDeflate: timestamp().notNull().defaultNow(),
});
