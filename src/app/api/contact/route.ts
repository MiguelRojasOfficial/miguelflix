import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/sendContactEmail";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const result = await sendContactEmail(formData);

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, errors: { general: ["Error del servidor"] } },
      { status: 500 }
    );
  }
}
