import { Resend } from "resend";
import { contactSchema } from "./validation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Miguel Rojas <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL!],
      subject: `Nuevo mensaje de ${name}`,
      reply_to: email,
      text: `
De: ${name} <${email}>

${message}
      `,
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      errors: { general: [err.message || "Error enviando mensaje"] },
    };
  }
}