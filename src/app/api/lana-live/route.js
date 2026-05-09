import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 30; // Cache data selama 30 detik

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

    // Fetch live data
    // Using both apikey and priority_token for maximum compatibility
    const res = await fetch(`${base}/live?priority_token=${apiKey}&apikey=${apiKey}`, {
      method: "GET",
      headers: {
        "x-priority-token": apiKey,
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        message: "Upstream service unavailable",
        data: null,
      });
    }

    const liveData = await res.json();
    
    // Filter for Lana
    // Based on the example, it's an array of objects
    const data = Array.isArray(liveData) ? liveData : (liveData.data || []);
    
    const lanaLive = data.find(live => 
      live.name?.toLowerCase().includes("lana") || 
      live.url_key?.toLowerCase().includes("lana")
    );

    return NextResponse.json({
      success: true,
      data: lanaLive || null,
    });
  } catch (err) {
    console.error("LANA LIVE API ERROR:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
