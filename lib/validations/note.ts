import { z } from 'zod';

export const deleteNoteSchema = z.object({
  noteId: z.string().min(1),
});

export const noteFormSchema = z.object({
  title: z.string().max(40, 'Title must be less than 40 characters').optional().or(z.literal()),
  content: z.string().min(1, 'Note content is required').max(75000, 'Note content is too long'),
});

export const editNoteSchema = noteFormSchema.extend({
  id: z.string().min(1),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;

export const updateOrderSchema = z.array(
  z.object({
    id: z.string().min(1),
    orderIndex: z.number().int(),
  }),
);