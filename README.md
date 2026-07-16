# CampusFix — Grievance & Maintenance Tracker (Starter)

A working React prototype for Track 3 (Campus Problem Solver) — Grievance
Redressal & Maintenance Tracker. Everything runs in-memory right now
(no backend yet), pre-loaded with sample tickets so it's demoable immediately.

**Visual identity:** "maintenance work-order" aesthetic — blueprint-navy
background with a drafting grid, tickets styled as physical work-order tags
(punch hole + torn edge), and a rubber-stamp overlay for resolved/overdue
tickets. Fonts: Bebas Neue (headers), Inter (body), JetBrains Mono (ticket
IDs & timers).

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. Use the **Student / Admin** toggle in the header
to switch views.

- **Student view:** file a new work order (left) and see your own tickets
  with an expandable status timeline (click a ticket to expand).
- **Admin view:** stat cards, a category breakdown bar, a category filter,
  and a 4-column kanban board (Submitted -> Assigned -> In Progress ->
  Resolved). Click "Advance" on any ticket to move it to the next status.

## Project structure

```
src/
  data/seed.js          category -> team/SLA mapping, sample tickets
  lib/utils.js           SLA countdown, relative time helpers
  components/
    Header.jsx            logo + role toggle
    SubmitComplaint.jsx    the "file a work order" form
    StudentView.jsx        student layout (form + my tickets + timeline)
    AdminView.jsx           admin layout (stats + filter + kanban)
    TicketTag.jsx           the signature work-order tag card
    StatusPipeline.jsx      blueprint-schematic status tracker
  App.jsx                 top-level state: tickets array, role
```

All ticket state currently lives in `App.jsx` via `useState`. That's the
one file to touch when you wire up a real backend.

## Next steps: connecting Firebase

1. Create a Firebase project -> enable Firestore and Authentication
   (student ID / email login).
2. `npm install firebase`, then add `src/lib/firebase.js` with your config
   and `initializeApp(...)`.
3. Replace the `useState(seedTickets)` in `App.jsx` with a Firestore
   `onSnapshot` listener on a `tickets` collection, so `tickets` updates
   live for every connected user.
4. Replace `addTicket` / `advanceTicket` with `addDoc` / `updateDoc` calls
   instead of local state updates -- the UI components don't need to change,
   they just receive data through the same props.
5. For photo uploads, swap the current `photoName`-only file input for
   Firebase Storage: upload the file, store the resulting URL on the ticket
   document, and render it as an `<img>` in `TicketTag`.
6. For real SLA escalation (not just a colored label), add a scheduled
   Cloud Function that checks overdue tickets periodically and flags or
   notifies the assigned team.

## Known simplifications (intentional, for a hackathon Round 1 build)

- No auth yet -- "my tickets" is hardcoded to one demo student.
- Photo upload only stores the file name, not the actual image.
- SLA hours per category are hardcoded in `data/seed.js` -- tune freely.
