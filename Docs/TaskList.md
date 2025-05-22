# Marketplace MVP — Task List (Supabase-Centric)

This checklist focuses on delivering a lean, production-ready MVP that relies exclusively on Supabase for **Auth, Database, Storage, Edge Functions, and Realtime**.  Tasks are ordered by the logical build sequence.

---

## 0. Project Bootstrap
- [x] Create Supabase project & obtain `SUPABASE_URL` + `ANON_KEY`
- [x] Generate Service Role key (server-only)
- [x] Clone repo / set up Next.js 14 + TypeScript (already done)
- [x] Add env vars to `.env.local`

---

## 1. Supabase Backbone
### 1.1 Authentication
- [x] Enable Google provider (MVP)
- [x] (Optional) Enable GitHub provider
- [x] Configure redirect URLs (local + prod)
- [x] Implement email domain restrictions (if required)

### 1.2 Database Schema (SQL)
- [x] `users` (extends `auth.users` with role & profile)
- [x] `categories`
- [x] `items`
- [x] `orders`
- [x] Create SQL migration file & run via Supabase CLI

### 1.3 Row-Level Security
- [x] Enable RLS on all tables
- [x] Policies for read/write per role

### 1.4 Storage
- [x] Create `avatars` bucket (public)
- [x] Create `item-images` bucket (public)

### 1.5 Edge Functions
- [x] `checkout.ts` — validate purchase, insert `orders` row
- [x] `admin-metrics.ts` — aggregate basic stats for dashboards

### 1.6 Realtime Channels
- [x] Enable realtime on `items` (availability)
- [x] Enable realtime on `orders` (user order status)

---

## 2. Frontend Foundation
- [x] Integrate `@supabase/auth-helpers-nextjs`
- [x] Create `SupabaseProvider` context
- [x] Global layout with `Header`, `Footer`
- [x] Theme & component library (`shadcn/ui` + Tailwind)

---

## 3. Public Pages
- [ ] `/` Home — hero, category chips, featured items
- [ ] `/marketplace` — item grid, search, filter, pagination
- [ ] `/item/[id]` — item details, purchase CTA

---

## 4. Auth & Roles
- [ ] Sign-in / Sign-up page using Supabase Auth UI
- [ ] Hook to fetch extended profile with role
- [ ] Route middleware: `user`, `creator`, `admin`

---

## 5. User Dashboard (`/dashboard`)
- [ ] Profile edit (name, avatar → `avatars` bucket)
- [ ] Orders list (realtime updates)
- [ ] Saved items list

---

## 6. Creator Dashboard (`/creator`)
- [ ] CRUD items (title, price, image → `item-images` bucket)
- [ ] Item status: draft / published
- [ ] Sales list (orders where creator owns item)

---

## 7. Admin Console (`/admin`)
- [ ] User table (change roles, ban)
- [ ] Item moderation (archive / publish)
- [ ] Basic metrics (edge function)

---

## 8. Purchase Flow
- [ ] Client call to `checkout` edge function
- [ ] Insert `orders` row & return status
- [ ] Order confirmation screen

---

## 9. Quality & Delivery
- [ ] Error boundaries + toast notifications
- [ ] Lazy load heavy components
- [ ] Image optimization via `<Image>` component
- [ ] Unit tests for auth guard & checkout flow
- [ ] Vercel deployment with preview env

---

## 10. Post-MVP (Backlog)
- Advanced search & filters
- Real-time chat between buyer/creator
- Payment gateway integration
- Mobile optimisations
- Detailed analytics dashboards 