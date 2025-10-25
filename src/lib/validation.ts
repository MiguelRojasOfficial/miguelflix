import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  message: z.string().min(10, "Mensaje demasiado corto"),
});
