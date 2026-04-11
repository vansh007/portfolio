import { createClient } from '@supabase/supabase-js';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import os from 'os';

const DB_NAME = 'blog_views.db';

// Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        }
    })
    : null;

if (supabase) {
    console.log("✅ [DB] Supabase client initialized with URL:", supabaseUrl);
} else {
    console.warn("⚠️ [DB] Supabase client NOT initialized. Missing URL or Key. Falling back to SQLite.");
    console.log("   - URL present?", !!supabaseUrl);
    console.log("   - Key present?", !!supabaseKey);
}

// Determine database path for SQLite fallback
const getDbPath = () => {
    if (process.env.NODE_ENV === 'production') {
        return path.join(os.tmpdir(), DB_NAME);
    }
    const dataDir = path.join(process.cwd(), '.data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, DB_NAME);
};

// Initialize SQLite fallback
let sqliteDb: any = null;
if (!supabase) {
    const dbPath = getDbPath();
    sqliteDb = new Database(dbPath);
    sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS views (
      slug TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    )
  `);
}

/**
 * Fetch view count for a specific slug.
 */
export const getViews = async (slug: string): Promise<number> => {
    if (supabase) {
        console.log(`🔍 [DB] Fetching views for slug: ${slug}`);
        const { data, error } = await supabase
            .from('views')
            .select('count')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('❌ [DB] Supabase error fetching views:', error);
            if (error.code === 'PGRST116') {
                console.log("   - No rows found (PGRST116), returning 0");
                return 0;
            }
            throw error; // Throw so API sends 500
        } else {
            console.log(`✅ [DB] Fetched views for ${slug}:`, data?.count);
        }
        return data?.count || 0;
    }

    // SQLite Fallback
    const stmt = sqliteDb.prepare('SELECT count FROM views WHERE slug = ?');
    const result = stmt.get(slug) as { count: number } | undefined;
    return result ? result.count : 0;
};

/**
 * Increment view count for a specific slug.
 */
export const incrementView = async (slug: string): Promise<number> => {
    if (supabase) {
        // RPC or Upsert logic for Supabase
        // Note: Using upsert with increment isn't atomic in a single SDK call without an RPC.
        // For simplicity here, we'll use an upsert. For real production usage, an RPC is better.
        const currentViews = await getViews(slug);
        const { data, error } = await supabase
            .from('views')
            .upsert({ slug, count: currentViews + 1 }, { onConflict: 'slug' })
            .select('count')
            .single();

        if (error) {
            console.error('Supabase error incrementing views:', error);
        }
        return data?.count || currentViews + 1;
    }

    // SQLite Fallback
    const upsertStmt = sqliteDb.prepare(`
        INSERT INTO views (slug, count) 
        VALUES (?, 1) 
        ON CONFLICT(slug) 
        DO UPDATE SET count = count + 1
    `);
    upsertStmt.run(slug);
    return getViews(slug);
};

/**
 * Helper for bulk initialization or manual override.
 */
export const setViews = async (slug: string, count: number): Promise<void> => {
    if (supabase) {
        const { error } = await supabase
            .from('views')
            .upsert({ slug, count }, { onConflict: 'slug' });

        if (error) {
            console.error('Supabase error setting views:', error);
        }
        return;
    }

    // SQLite Fallback
    const setStmt = sqliteDb.prepare(`
        INSERT INTO views (slug, count) 
        VALUES (?, ?) 
        ON CONFLICT(slug) 
        DO UPDATE SET count = excluded.count
    `);
    setStmt.run(slug, count);
};

export default supabase || sqliteDb;
