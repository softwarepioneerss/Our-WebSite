import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export const supabase: SupabaseClient = createClient(
	import.meta.env.VITE_URL_SUPABASE,
	import.meta.env.VITE_KEY_SUPABASE
);
