import { NextResponse } from "next/server";
import { getAllContentItems } from "@/lib/contentful";

export async function GET() {
  try {
    const items = await getAllContentItems();
    return NextResponse.json(items);
  } catch (err) {
    console.error("❌ Error al obtener items de Contentful:", err);
    return NextResponse.json([], { status: 500 });
  }
}
