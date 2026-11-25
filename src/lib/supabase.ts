import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dyjgxtwvpztszmsonvim.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_EEJTjoy8mVptcAbUIm7P2Q_X0-im7EP'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
