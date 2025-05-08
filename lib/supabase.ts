'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ブラウザ環境でのみSupabaseクライアントを初期化
let supabase: SupabaseClient | undefined = undefined;

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabaseの環境変数が設定されていません。.env.localファイルを確認してください。');
  }
  
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };