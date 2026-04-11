import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdhcvbvqreusoxysdbok.supabase.co";
const supabaseAnonKey = "sb_publishable_WvdeLE_JDVxAos5aLmFAGw_K1N-Al55";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
