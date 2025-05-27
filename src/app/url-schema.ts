import { z } from "zod";

export const urlSchema = z.object({
  originalUrl: z.string().url({ message: "URL Inválida." }),
});

export type URLSchemaType = z.infer<typeof urlSchema>;
