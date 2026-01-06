# ITAM System - IT Asset Management

A cloud-based IT Asset Management system built with Next.js and Google Sheets as the database.

## Features

- ✅ User authentication (restricted access)
- ✅ Dashboard with key metrics
- ✅ Asset tracking (Utrustning)
- ✅ Package management (Paket i Lager)
- ✅ Onboarding tracking
- ✅ Standard packages (Standardpaket)
- ✅ Orders management (Beställningar)
- ✅ Cases/Tickets (Ärende)
- ✅ Google Sheets as database (easy to edit in Excel/Sheets)
- ✅ Cloud-ready deployment

## Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Google Sheets API
- **Deployment**: Vercel (recommended) or any Node.js platform

## Setup Instructions

### 1. Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and click "Create"
   - Skip the optional steps and click "Done"
5. Create a Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" and click "Create"
   - Save the downloaded JSON file
6. Share your Google Sheet with the service account:
   - Open your ITAM Google Sheet
   - Click "Share"
   - Add the service account email (found in the JSON file as `client_email`)
   - Give it "Editor" access

### 2. Local Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` with your credentials:
```env
# Get these from the Google Service Account JSON file
GOOGLE_SHEETS_SPREADSHEET_ID=1ChcrK82D-fMHZgpfMQ8N2ZgAyTMQRnNFOEHks6Cuay0
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Default credentials (username: admin, password: admin)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### 3. Default Login

- **Username**: `admin`
- **Password**: `admin`

(You can change this in `.env.local` or add more users in `lib/auth.ts`)

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
   - `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `GOOGLE_SHEETS_PRIVATE_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
6. Deploy!

## Project Structure

```
itam-system/
├── app/
│   ├── api/auth/          # NextAuth API routes
│   ├── utrustning/        # Assets pages (example CRUD)
│   ├── login/             # Login page
│   └── page.tsx           # Dashboard
├── components/
│   ├── Navbar.tsx         # Navigation bar
│   └── Providers.tsx      # Session provider
├── lib/
│   ├── auth.ts            # Authentication config
│   ├── sheets.ts          # Google Sheets client
│   └── types.ts           # TypeScript types
└── middleware.ts          # Auth middleware
```

## Google Sheet Structure

The system expects these sheets in your Google Spreadsheet:

1. **0 - Dashboard** - Metrics (Antal kompletta paket, Golv, Målnivå)
2. **1 - Ärende** - Cases/Tickets
3. **2 - Onboarding** - Onboarding tracking
4. **3 - Standardpaket** - Standard package definitions
5. **4 - Beställningar** - Orders
6. **5 - Paket i Lager** - Package inventory
7. **6 - Utrustning (assets)** - Equipment/Assets

## Next Steps

To complete the system, you can:

1. Create CRUD pages for remaining sheets (Ärende, Onboarding, Standardpaket, Beställningar, Paket i Lager)
2. Add API routes for create/update/delete operations
3. Add search and filtering
4. Add export functionality
5. Add more users with different roles

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```
