import { useState } from "react";
import Header from "./components/Header";
import StudentView from "./components/StudentView";
import AdminView from "./components/AdminView";
import { seedTickets, STATUSES } from "./data/seed";

function App() {
  const [role, setRole] = useState("Student");
  const [tickets, setTickets] = useState(seedTickets);

  function addTicket(ticket) {
    setTickets((prev) => [ticket, ...prev]);
  }

  function advanceTicket(id) {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUSES.indexOf(t.status);
        const next = STATUSES[Math.min(idx + 1, STATUSES.length - 1)];
        return {
          ...t,
          status: next,
          resolvedAt: next === "Resolved" ? new Date().toISOString() : t.resolvedAt,
        };
      })
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Header role={role} setRole={setRole} />
      {role === "Student" ? (
        <StudentView tickets={tickets} addTicket={addTicket} />
      ) : (
        <AdminView tickets={tickets} advanceTicket={advanceTicket} />
      )}
    </div>
  );
}

export default App;
