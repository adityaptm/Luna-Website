export async function getShowTheater({
  page = 1,
  perpage = 10,
  onlyLana = false,
} = {}) {
  const qs = new URLSearchParams({
    page: String(page),
    perpage: String(perpage),
  });

  if (onlyLana) qs.set("onlyLana", "1");

  const res = await fetch(`/api/show-theater?${qs.toString()}`, {
    cache: "no-store", // kalau mau selalu fresh (atau hapus kalau mau ikut cache)
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json?.message || "Gagal load jadwal");
  }

  return json;
}
