# CampusFix
### Grievance & Maintenance Tracker — Summer of CodeFest 2.0

**Team GramaDharini** | Track 3: Campus Problem Solver

---

## The Problem

Campus complaints get lost. A broken tube light, a leaking tap, a hostel
maintenance request — these get reported to someone, somewhere, and then
disappear. There's no way to know who's responsible, whether anyone is
actually working on it, or when it'll get fixed. Students re-report the
same issue or simply give up. Urgent problems sit in the same informal
queue as minor ones, with no way to flag them as urgent.

## Our Solution

CampusFix is a role-based web app that gives every maintenance complaint
a visible owner, a deadline, and a status anyone can check — turning
"I told someone about it" into an actual tracked work order.

Every complaint becomes a **work order**: filed by a student, automatically
routed to the right team, tracked against a deadline, and closed out with
proof it was actually fixed.

## How It Works

1. **Report** — A student files a work order: category, exact location
   (block + room), a description, and an optional photo. Takes under a
   minute.
2. **Route** — The system automatically assigns it to the right team
   (Electrical, Plumbing, Carpentry, Housekeeping, General Facilities)
   based on category.
3. **Track** — A deadline starts counting based on how urgent the category
   is (e.g. electrical issues get a 6-hour window, furniture gets 48 hours).
   Tickets that blow past their deadline are visibly flagged as overdue.
4. **Resolve** — The assigned team closes the ticket once it's fixed. The
   student can see the full history of what happened and when.

## Who Uses It

- **Students** file complaints and track their own open tickets.
- **Wardens / maintenance staff / campus admin** see everything on a
  live dashboard: what's open, what's overdue, and which categories keep
  coming up — so recurring problems (not just one-off complaints) get
  noticed.

## Key Features

- **Work-order style tickets** — every complaint is a physical-feeling
  "ticket," not just a row in a table, so status is easy to scan at a
  glance.
- **Automatic deadlines (SLA) per category** — urgent categories get
  shorter windows automatically; nothing relies on someone remembering
  to prioritize.
- **Visible escalation** — overdue tickets are impossible to miss, both
  for the student who filed them and the team responsible.
- **Role-based views** — students and admins see different, purpose-built
  screens instead of one generic table.
- **Category analytics** — the admin view surfaces which categories and
  locations generate the most complaints, so facilities teams can act on
  patterns, not just individual tickets.

## Tech Stack

- **Frontend:** React + Tailwind CSS
- **Planned backend:** Firebase (Firestore for live data, Storage for
  photo uploads) — the current build runs on in-memory state as a
  working, fully interactive prototype; see "Next Steps" below.

## Project Structure

```
src/
  data/seed.js            category -> team/SLA mapping, sample tickets
  lib/utils.js              SLA countdown & time-formatting helpers
  components/
    Header.jsx               logo + Student/Admin role toggle
    SubmitComplaint.jsx       the "file a work order" form
    StudentView.jsx           student layout: form + my tickets + timeline
    AdminView.jsx             admin layout: stats + filter + kanban board
    TicketTag.jsx             the signature work-order ticket card
    StatusPipeline.jsx        visual status tracker (Submitted -> Resolved)
  App.jsx                   top-level state: tickets array, active role
```

## Running It Locally

```bash
npm install
npm run dev
```

Open the local URL it prints. Use the **Student / Admin** toggle at the
top to switch between the two views. Sample tickets are pre-loaded so it's
demoable immediately.

## Why This Matters

- **For students:** confidence that reporting an issue leads to an actual
  fix, and visibility into when.
- **For staff and admin:** one dashboard instead of scattered calls,
  emails, and messages about maintenance.
- **For the institution:** data on recurring problems, not just a pile of
  individual complaints — the same system that fixes today's tickets also
  reveals which rooms or equipment need long-term attention.

## Next Steps

This prototype currently keeps all data in memory (it resets on refresh).
The next milestone is connecting **Firebase Firestore** so tickets persist
and sync live across every user, plus **Firebase Storage** for real photo
uploads, and basic student-ID login so "my tickets" reflects the actual
logged-in student rather than a fixed demo user.
