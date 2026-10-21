    import {
    pgTable,
    pgEnum,
    uuid,
    varchar,
    text,
    boolean,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const todos = pgTable(
    "todos",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        title: varchar("title", { length: 255 }).notNull(),
        description: text("description"),
        completed: boolean("completed").notNull().default(false),
        priority: priorityEnum("priority").notNull().default("medium"),
        dueDate: timestamp("due_date"),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (t) => [index("todos_user_id_idx").on(t.userId)]
);

    // relations
export const usersRelations = defineRelations(
    { users, todos },
    (r) => ({
        users: {
            todos: r.many.todos(),
        },
        todos: {
            user: r.one.users({
                from: r.todos.userId,
                to: r.users.id,
            }),
        },
    })
);

    