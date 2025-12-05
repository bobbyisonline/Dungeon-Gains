# Supabase Quick Setup

## 🚀 Quick Start (5 minutes)

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com) → Sign up → Create project
- Note your database password!

### 2. Create Database Table
SQL Editor → New Query → Paste and Run:

```sql
CREATE TABLE game_saves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  game_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_game_saves_user_id ON game_saves(user_id);

ALTER TABLE game_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON game_saves FOR ALL USING (true);
```

### 3. Get API Keys
Settings → API → Copy:
- **Project URL**
- **anon public key**

### 4. Add to .env
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxx...
```

### 5. Restart Dev Server
```bash
npm run dev
```

## ✅ Done!
Your game now saves to the cloud. Test by:
1. Sign in → Create character → Make progress
2. Sign out → Clear cache
3. Sign in again → Progress restored!

---

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.
