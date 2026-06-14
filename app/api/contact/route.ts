import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "الاسم ورقم الهاتف مطلوبان" },
        { status: 400 },
      );
    }

    console.log("--- رسالة جديدة من الموقع ---");
    console.log(`الاسم: ${name}`);
    console.log(`الهاتف: ${phone}`);
    console.log(`الرسالة: ${message || "—"}`);
    console.log("-------------------------------");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "خطأ في معالجة الطلب" },
      { status: 500 },
    );
  }
}
