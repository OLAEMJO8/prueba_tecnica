import { z } from "zod";

export const createInvitacionSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(1).max(255),
  timein: z
    .string({ required_error: "La fecha entrada es requerido" })
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
  timeout: z
    .string({ required_error: "La fecha salida es requerido" })
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
});
export const editarInvitacionSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(1).max(255).optional(),
  timein: z
    .string({ required_error: "La fecha entrada es requerido" })
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).optional(),
  timeout: z
    .string({ required_error: "La fecha salida es requerido" })
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).optional(),
});