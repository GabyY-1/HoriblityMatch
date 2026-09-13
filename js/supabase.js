const SUPABASE_URL = "https://gkdsjtsqxbjgrlinpdba.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_gEaFSPyCuUBCwo_8_RebPg_0P4F7QGW";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
