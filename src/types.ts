import { z } from "zod";

export const npcInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(500),
  description: z.string().max(200),
  image: z.string().optional(),
});
