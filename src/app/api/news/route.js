import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 3600; // Cache news selama 1 jam

export async function GET() {
  try {
    const base = process.env.JKT48CONNECT_BASE_URL || "https://v2.jkt48connect.com/api/jkt48";
    const apiKey = process.env.JKT48CONNECT_PRIORITY_TOKEN || "sJbpVqLinYlp";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "API Key not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${base}/news?priority_token=${apiKey}&apikey=${apiKey}`, {
      method: "GET",
      headers: {
        "x-priority-token": apiKey,
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        message: "Upstream service unavailable",
        data: [],
      });
    }

    const newsData = await res.json();
    
    return NextResponse.json({
      success: true,
      data: newsData.news || [],
    });
  } catch (err) {
    console.error("NEWS API ERROR:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
