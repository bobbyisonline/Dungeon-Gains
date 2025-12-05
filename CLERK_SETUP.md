# Clerk Authentication Setup

This app uses [Clerk](https://clerk.com/) for user authentication.

## Setup Instructions

### 1. Create a Clerk Account

1. Go to [https://clerk.com/](https://clerk.com/)
2. Sign up for a free account
3. Create a new application

### 2. Get Your Publishable Key

1. In your Clerk Dashboard, go to [API Keys](https://dashboard.clerk.com/last-active?path=api-keys)
2. Select **React** as your framework
3. Copy your **Publishable Key**

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Clerk Publishable Key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   ```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default)

### 4. Run the Application

```bash
npm run dev
```

## Features

- **Sign In/Sign Up**: Click the "Sign In" button in the navigation bar
- **User Profile**: Once signed in, click your profile picture to manage your account
- **Secure**: User authentication is handled entirely by Clerk
- **Persistent Sessions**: Your login session is maintained across page refreshes

## Integration Details

- **SDK**: `@clerk/clerk-react`
- **Provider**: App wrapped with `<ClerkProvider>` in `main.tsx`
- **Components**: Uses `<SignedIn>`, `<SignedOut>`, `<SignInButton>`, and `<UserButton>`
- **Docs**: [https://clerk.com/docs/quickstarts/react](https://clerk.com/docs/quickstarts/react)

## Security Notes

- Never commit your actual Clerk keys to version control
- Use `.env.local` for local development
- Use environment variables in production deployments
- The `VITE_` prefix is required for Vite to expose the variable to the client
