<div align="center">

  # 🌐 ELEVATEHUB // Decentralized Student Collaboration & Venture Incubator

  [![Live Platform](https://img.shields.io/badge/Live_Platform-elevatehub.lakshya.uk-f59e0b?style=for-the-badge&logo=vercel&logoColor=white)](https://elevatehub.lakshya.uk)
  [![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![WebRTC](https://img.shields.io/badge/WebRTC-Peer_Collaboration-333333?style=for-the-badge)](https://webrtc.org/)

  <p align="center">
    <b>A collaborative hub empowering student engineers, designers, and founders to form multidisciplinary venture teams, exchange peer code reviews, and showcase technical prototypes.</b>
  </p>

</div>

---

## 🏛️ System Architecture

```mermaid
flowchart TB
    subgraph Client ["💻 Web Application Client (Next.js 14 App Router)"]
        AuthUI["NextAuth SSO Authentication (GitHub & University Email)"]
        ProjectFeed["Dynamic Matchmaking & Project Discovery Feed"]
        CollabSpace["Live Peer Workspace & Code Collab Room"]
    end

    subgraph API ["⚡ API & Real-Time Sync Gateway"]
        ServerActions["Next.js Server Actions & Edge Route Handlers"]
        WebRTCSignaling["WebRTC Peer Signaling Server"]
        PrismaClient["Prisma Type-Safe ORM Layer"]
    end

    subgraph DataStore ["🗄️ Persistence & Storage Layer"]
        PostgresDB["Supabase / PostgreSQL Database"]
        S3Storage["AWS S3 / UploadThing Asset Bucket"]
    end

    AuthUI --> ServerActions
    ProjectFeed --> ServerActions
    CollabSpace --> WebRTCSignaling
    ServerActions --> PrismaClient
    PrismaClient --> PostgresDB
    ServerActions --> S3Storage
```

---

## ✨ Core Features

- **Algorithmic Skill Matchmaking**: Intelligent peer matching algorithm pairing frontend, backend, AI, and design students according to project needs.
- **Real-Time Project Workspaces**: Live markdown design specifications, task sprint boards, and embedded code snippet collaboration.
- **Verified University & Academic Credentials**: Domain-restricted university email verification and GitHub repository activity proofing.
- **Interactive Pitch & Showcase Arena**: Public project demo reels with community upvoting, feedback threads, and mentor reviews.
- **End-to-End Type-Safe Data Layer**: Full relational data modeling with Prisma ORM and automated database migrations.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Radix UI Primitives, Lucide Icons
- **Backend & Database**: Next.js Server Actions, PostgreSQL, Prisma ORM, NextAuth.js
- **Real-Time Communication**: WebRTC, WebSocket Signaling, Socket.io
- **Storage & Media**: AWS S3 / Cloudinary, Vercel Serverless Hosting

---

## 🚀 Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/lak-is-law/elevate-hub.git
cd elevate-hub

# 2. Install dependencies
npm install

# 3. Setup Database environment variables (.env)
cp .env.example .env

# 4. Run Prisma database migrations & generate client
npx prisma migrate dev
npx prisma generate

# 5. Launch local server
npm run dev
```

---

## 🧗 Challenges Faced & Solutions

### 1. Complex Multitenant Permissions & Role Isolation
- **Challenge**: Managing different permission levels (Project Leads, Core Contributors, Mentors, and Viewers) across dozens of collaborative documents without data leaks.
- **Solution**: Designed granular Row-Level Security (RLS) policies and integrated Prisma middleware to enforce role checks before query execution.

### 2. Peer-to-Peer Video/Screen Sync Across NAT Firewalls
- **Challenge**: Students on strict university campus networks faced WebRTC ICE candidate connection failures.
- **Solution**: Configured STUN/TURN server fallback relays with auto-adaptive bitrate renegotiation.

---

## 💡 Lessons Learned

- Next.js Server Actions significantly simplify form handling and optimistic UI updates compared to traditional REST boilerplate.
- Designing a clear database schema with foreign key cascade rules from Day 1 prevents state orphan issues as user bases scale.

---

## 📄 License & Contact

Distributed under the **MIT License**.
Developed by **Lakshya Agarwal** ([contact@lakshya.uk](mailto:contact@lakshya.uk) • [lakshya.uk](https://lakshya.uk)).
