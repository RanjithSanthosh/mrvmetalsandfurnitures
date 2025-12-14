
# MRV Group of Technologies - Product Catalog

A premium, production-ready product catalog web application built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Public Catalog**: Browse products by Category and Type.
- **Product Details**: Carousel images, detailed description, attributes.
- **WhatsApp Inquiry**: Direct "Inquiry" button sending pre-formatted message to business WhatsApp.
- **Admin Dashboard**: Secure admin panel to manage Products and Categories.
- **Authentication**: Secure Admin login with HTTP-only cookies (JWT).
- **Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS and Shadcn UI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4), Shadcn UI, Lucid React Icons
- **Database**: MongoDB (via Mongoose)
- **State/Fetching**: SWR
- **Auth**: JOSE (JWT), BcryptJS

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas Account (or local MongoDB)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mrvfurnituresandsteels
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Copy `.env.example` to `.env.local` and fill in the values.
   ```bash
   cp .env.example .env.local
   ```
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A long random string for security.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: The business phone number (with country code, no +).

### Run Locally

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Admin Setup (First Time)

To create the initial Admin user:

1. Ensure `.env.local` is configured and MongoDB is reachable.
2. Open your browser and navigate to:
   `http://localhost:3000/api/setup`
3. If successful, it will return a JSON response with the default credentials (`admin` / `admin123`).
4. **IMPORTANT**: Go to `/admin/login`, log in, and change your password immediately.
5. (Optional) You can disable the setup route by deleting `src/app/api/setup/route.ts` after use.

## Deployment to Vercel

1. Push code to GitHub.
2. Import project into Vercel.
3. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER`) in Vercel Project Settings.
4. Deploy.

## Folder Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Utilities, DB connection.
- `src/models`: Mongoose models.

## License

Private / Proprietary.
