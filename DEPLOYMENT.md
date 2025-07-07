# Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup
- [ ] Create a PostgreSQL database (Vercel Postgres or Neon recommended)
- [ ] Get your database connection string

### 2. Google OAuth Setup
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create a new project or select existing one
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google` (local)
  - `https://your-app.vercel.app/api/auth/callback/google` (production)

### 3. Environment Variables
Set these in your Vercel project settings:

```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Deployment Steps

### 1. Deploy to Vercel
- [ ] Push your code to GitHub
- [ ] Connect your repository to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy

### 2. Database Migration
After deployment:
```bash
# Run database migrations
npx prisma db push

# Or initialize database
npm run db:init
```

### 3. Verify Deployment
- [ ] Check that authentication works
- [ ] Verify database connections
- [ ] Test the game functionality

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Check if database is accessible from Vercel
   - Ensure database is PostgreSQL (not SQLite)

2. **Authentication Errors**
   - Verify Google OAuth redirect URIs
   - Check NEXTAUTH_SECRET is set
   - Ensure NEXTAUTH_URL matches your domain

3. **Build Errors**
   - Check that all dependencies are installed
   - Verify Prisma client is generated
   - Check for TypeScript errors

### Useful Commands

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Open Prisma Studio
npm run db:studio

# Initialize database
npm run db:init
``` 