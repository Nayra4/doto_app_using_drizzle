import { createSelectSchema, createInsertSchema } from 'drizzle-orm/zod';
import { z } from 'zod';
import { todos, users } from './schema.js';

export const todoSelectSchema = createSelectSchema(todos);

export const todoInsertSchema = createInsertSchema(todos, {
    dueDate: z.coerce.date().nullable().optional(),
});

export const usersSelectSchema_u = createSelectSchema(users);
export const usersInsertSchema_u = createInsertSchema(users);