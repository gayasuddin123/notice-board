# Notice Board — Reno Platforms Web Dev Assignment

A full-stack Notice Board application with complete CRUD operations, built with Next.js, Prisma, and TiDB Cloud.

## Live Demo

[https://notice-board-xi.vercel.app/](https://notice-board-xi.vercel.app/)

## Tech Stack

- **Framework:** Next.js (Pages Router)
- **Database ORM:** Prisma
- **Database:** TiDB Cloud (MySQL-compatible, hosted)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS

## Features

- Create, read, update, and delete notices
- Urgent notices always appear above Normal notices (sorted in database query)
- Red "Urgent" badge on urgent notices
- Responsive design for both mobile and desktop
- Server-side input validation on all API routes
- Confirmation dialog before deleting a notice
- Optional image URL support for notices
- Categories: Exam, Event, General
- Priority levels: Normal, Urgent

## How to Run Locally

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/gayasuddin123/notice-board.git
cd notice-board
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

Create a `.env` file in the project root:

\`\`\`
DATABASE_URL=your_tidb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### 4. Generate Prisma client and sync database

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. Start the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
notice-board/
├── components/
│   └── NoticeForm.js        
├── lib/
│   └── prisma.js            
├── pages/
│   ├── api/
│   │   └── notices/
│   │       ├── index.js     
│   │       └── [id].js      
│   ├── notices/
│   │   ├── new.js           
│   │   └── [id]/
│   │       └── edit.js      
│   └── index.js             
├── prisma/
│   └── schema.prisma        
├── prisma.config.ts         
└── .env                     
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/notices | Fetch all notices (Urgent first) |
| POST | /api/notices | Create a new notice |
| GET | /api/notices/:id | Fetch a single notice |
| PUT | /api/notices/:id | Update a notice |
| DELETE | /api/notices/:id | Delete a notice |

## One Thing I Would Improve With More Time

I would add proper image file upload support using Cloudinary instead of asking users to paste an image URL. This would make the experience much more intuitive — users could upload directly from their device. I would also add toast notifications to replace the browser's default alert and confirm dialogs for a more polished feel.

## AI Usage

I used Claude (by Anthropic) as a coding assistant throughout this project. Specifically:

- Generating boilerplate code for API routes and the Prisma schema
- Setting up Tailwind CSS component styling
- Debugging Prisma v7 breaking changes — the new `prisma.config.ts` requirement and driver adapter setup
- Fixing TiDB Cloud SSL connection configuration for both local development and Vercel deployment

All code was reviewed, understood, and tested by me. The core decisions — project structure, API design, sorting logic, form architecture, and deployment configuration — were made by me. I also debugged several issues hands-on, including the Prisma v7 adapter errors, TiDB SSL requirements, and Vercel serverless connection timeouts.