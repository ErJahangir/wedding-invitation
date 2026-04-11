// Supabase-backed client API (frontend)
import { supabase } from "@/core/supabase";

export async function fetchWishes({ limit = 50, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching wishes:", error);
    return { success: false, error: error.message };
  }

  const formattedData = data.map((d) => ({
    id: d.id,
    name: d.name,
    message: d.message,
    attendance: d.attendance,
    created_at: new Date(d.created_at).toISOString(),
  }));

  return { success: true, data: formattedData };
}

export async function createWish(wishData) {
  // check duplicate
  const { data: existing, error: checkError } = await supabase
    .from("wishes")
    .select("id")
    .eq("name", wishData.name)
    .maybeSingle();

  if (checkError) throw checkError;
  if (existing) {
    const err = new Error(
      "You have already submitted a wish. Each guest can only send one wish.",
    );
    err.code = "DUPLICATE_WISH";
    throw err;
  }

  const { data, error } = await supabase
    .from("wishes")
    .insert({
      name: wishData.name,
      message: wishData.message,
      attendance: wishData.attendance,
    })
    .select()
    .single();

  if (error) throw error;

  return {
    success: true,
    data: {
      id: data.id,
      name: data.name,
      message: data.message,
      attendance: data.attendance,
      created_at: new Date(data.created_at).toISOString(),
    },
  };
}

export async function checkWishSubmitted(name) {
  if (!name) return { success: true, hasSubmitted: false };
  const { count, error } = await supabase
    .from("wishes")
    .select("*", { count: "exact", head: true })
    .eq("name", name);

  if (error) return { success: false, error: error.message };
  return { success: true, hasSubmitted: count > 0 };
}

export async function deleteWish(wishId) {
  if (!wishId) return { success: false, error: "Missing id" };

  const { error } = await supabase.from("wishes").delete().eq("id", wishId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ... existing export CSV and Stats code (should also be simplified)

export async function downloadWishesExport() {
  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error exporting wishes:", error);
    return;
  }

  const escapeCsv = (val) => {
    if (val == null) return "";
    const s = String(val);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toISOString().replace("T", " ").slice(0, 19);
  };

  const header = "Name,Message,Attendance,Date";
  const rows = data.map((r) => {
    return `${escapeCsv(r.name)},${escapeCsv(r.message)},${escapeCsv(r.attendance)},${escapeCsv(formatDate(r.created_at))}`;
  });
  const csv = [header, ...rows].join("\n");
  const bom = "\uFEFF";
  const body = bom + csv;

  const blob = new Blob([body], { type: "text/csv; charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `wishes-export.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

export async function fetchAttendanceStats() {
  const { data, error } = await supabase.from("wishes").select("attendance");

  if (error) return { success: false, error: error.message };

  const counts = {
    attending: 0,
    not_attending: 0,
    maybe: 0,
    total: data.length,
  };
  data.forEach((d) => {
    const a = d.attendance;
    if (a === "ATTENDING") counts.attending += 1;
    else if (a === "NOT_ATTENDING") counts.not_attending += 1;
    else if (a === "MAYBE") counts.maybe += 1;
  });
  return { success: true, data: counts };
}

export async function fetchInvitation() {
  try {
    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("uid", "prashant-sujata-2025") // Hardcoded for your specific wedding
      .maybeSingle();

    if (error || !data) {
      return {
        success: false,
        error: error?.message || "Invitation not found",
      };
    }

    // Map DB snake_case to Frontend camelCase
    const mappedData = {
      ...data,
      groomName: data.groom_name,
      brideName: data.bride_name,
      parentGroom: data.parent_groom,
      parentBride: data.parent_bride,
      date: data.wedding_date, // Frontend expects 'date'
      ogImage: data.og_image,
      coupleImage: data.couple_image,
      groomImage: data.groom_image,
      brideImage: data.bride_image,
      // The rest like title, description, time, location, address, maps_url, maps_embed, agenda, audio, banks
      // already match or are directly used.
    };

    return { success: true, data: mappedData };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
