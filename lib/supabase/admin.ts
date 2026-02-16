import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Admin client bypasses RLS - use with caution!
// Only use this in admin routes protected by user ID check
// Note: Cast to any to avoid TypeScript issues with _dmc table suffixes
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) as any
