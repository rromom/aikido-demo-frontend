import { createClient } from '@supabase/supabase-js'

// VULN: secret-exposure — the SERVICE_ROLE key (bypasses Row Level Security)
// is bundled into client-side JS instead of the anon/publishable key. Anyone
// who opens devtools or reads the built bundle gets full read/write access
// to the database.
const SUPABASE_URL = 'https://flkysfylxwlymiseprdp.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY =
  'sb_secret_REPLACE_WITH_FAKE_SERVICE_ROLE_KEY_FOR_DEMO_1234567890abcdef'

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
