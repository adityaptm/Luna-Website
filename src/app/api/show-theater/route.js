import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 60; // Cache data selama 1 menit

export async function GET() {
  try {
    const base =
      process.env.JKT48CONNECT_BASE_URL ||
      "https://v2.jkt48connect.com/api/jkt48";
    const apiKey = process.env.JKT48CONNECT_PRIORITY_TOKEN || "sJbpVqLinYlp";

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Server .env not configured" },
        { status: 500 },
      );
    }

    // Fetch all theater shows
    const res = await fetch(`${base}/theater?priority_token=${apiKey}`, {
      method: "GET",
      headers: {
        "x-priority-token": apiKey,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000), // Meningkatkan timeout ke 30 detik
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({
        success: true,
        message: "Upstream service unavailable",
        data: null,
      });
    }

    const body = await res.json();
    const allShows = body.data || body.theater || (Array.isArray(body) ? body : []);

    if (allShows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Tidak ada jadwal",
        data: null,
      });
    }

    // Filter shows for Lana (Aurhel Alana)
    const now = new Date();
    const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); 

    const lanaShows = allShows
      .filter((show) => {
        const lineup = show.lineup || show.members || [];
        const hasLana = lineup.some(
          (m) =>
            (m.name && m.name.toLowerCase().includes("alana")) ||
            m.url_key === "lana" ||
            String(m.id || m.member_id) === "33"
        );
        if (!hasLana) return false;

        const showDate = new Date(show.date);
        return showDate >= cutoff;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (lanaShows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Tidak ada jadwal upcoming untuk Lana",
        data: null,
      });
    }

    // Map all upcoming shows to a clean format
    const formattedShows = lanaShows.map((show) => ({
      id: show.schedule_id || show.id || show.reference_code,
      title: show.title || "TBA",
      date: show.date || "",
      startTime: show.start_time || "",
      poster: show.poster || show.banner || "",
      members: show.lineup || show.members || [],
      idnTheater: show.idnTheater || null,
      url: show.reference_code 
        ? `https://jkt48.com/purchase/schedule/show?code=${show.reference_code}`
        : null
    }));

    return NextResponse.json({
      success: true,
      data: formattedShows,
    });


  } catch (err) {
    console.error("CRITICAL ROUTE ERROR:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

