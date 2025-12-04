# Exercise API Integration Guide

## Getting Your API Key

1. Visit [API Ninjas](https://api-ninjas.com/)
2. Click "Sign Up" or "Get API Key"
3. Create a free account (no credit card required)
4. Copy your API key from the dashboard

## Setting Up

1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your API key:
   ```
   VITE_API_NINJAS_KEY=your_actual_api_key_here
   ```

3. Restart the dev server if it's running

## Using the Exercise Browser

1. Go to "Log Workout" in the app
2. Click "📚 Browse More Exercises"
3. Select a muscle group from the dropdown
4. Click "🔍 Search"
5. Click "+" to add any exercise to your workout
6. The exercise will be added with default values (50 lbs, 3 sets, 10 reps)
7. You can adjust the values before completing the workout

## Muscle Groups Available

- **Upper Body**: Biceps, Triceps, Chest, Shoulders, Traps, Forearms
- **Back**: Lats, Middle Back, Lower Back, Neck
- **Lower Body**: Quadriceps, Hamstrings, Calves, Glutes
- **Core**: Abdominals

## Stat Mapping

Exercises are automatically mapped to your character stats:

- **Chest/Triceps** → Strength (Bench-related)
- **Quads/Glutes/Hamstrings** → Power (Squat-related)  
- **Shoulders/Traps** → Endurance (OHP-related)
- **Everything else** → Accessory category (balanced stat gains)

## API Limits

The free tier includes:
- 10,000 API calls per month
- Rate limit: 50 requests per second

This is more than enough for personal use!

## Troubleshooting

**No exercises appearing?**
- Check that your API key is correct in `.env`
- Make sure the file is named `.env` (not `.env.txt`)
- Restart the dev server after adding the key
- Check the browser console for error messages

**Still not working?**
- The app works fine without the API - you can still use the 4 preset exercises
- The exercise browser button will still appear, but searches won't return results
