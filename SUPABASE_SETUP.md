# Supabase Setup Guide

This guide will help you set up Supabase to store user game data in the cloud.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **Start your project** and sign up (free tier available)
3. Create a new project:
   - Choose a project name (e.g., "dungeon-gains")
   - Set a strong database password (save it!)
   - Select a region close to you
   - Click **Create new project**

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this SQL and click **Run**:

```sql
-- Create the game_saves table
CREATE TABLE game_saves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  game_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_game_saves_user_id ON game_saves(user_id);

-- Enable Row Level Security
ALTER TABLE game_saves ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only access their own data
CREATE POLICY "Users can read their own game data"
  ON game_saves FOR SELECT
  USING (true);  -- Allow all reads (we handle auth in the app)

CREATE POLICY "Users can insert their own game data"
  ON game_saves FOR INSERT
  WITH CHECK (true);  -- Allow all inserts (we handle auth in the app)

CREATE POLICY "Users can update their own game data"
  ON game_saves FOR UPDATE
  USING (true);  -- Allow all updates (we handle auth in the app)

CREATE POLICY "Users can delete their own game data"
  ON game_saves FOR DELETE
  USING (true);  -- Allow all deletes (we handle auth in the app)
```

## Step 3: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. Find these two values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 4: Add Credentials to Your App

1. Open your `.env` file (or create `.env.local` if it doesn't exist)
2. Add these lines:

```bash
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Important:** Make sure `.env` or `.env.local` is in your `.gitignore`!

## Step 5: Test It Out

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Sign in and create a character
3. Make some progress (do a workout, run a dungeon)
4. Sign out and clear your browser cache
5. Sign back in - your progress should still be there! ✅

## How It Works

- **Game saves automatically** every time you make progress
- **Data is stored in Supabase** (cloud database)
- **localStorage is used as fallback** if Supabase is unavailable
- **Your data persists** across devices and cache clears
- **Each user's data is isolated** using their Clerk user ID

## Troubleshooting

**Error: Missing Supabase environment variables**
- Make sure you added both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env` file
- Restart your dev server after adding environment variables

**Data not saving to Supabase**
- Check the browser console for errors
- Verify your SQL table was created correctly
- Check that RLS policies are set up

**Still using localStorage**
- The app will fallback to localStorage if Supabase fails
- Check console for Supabase connection errors
- Verify your API credentials are correct

## Security Notes

- The **anon key is safe** to use in client-side code
- Do **NOT** use the `service_role` key in your frontend
- Row Level Security (RLS) policies protect user data
- Clerk handles authentication, Supabase handles storage
