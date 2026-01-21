// app/dashboard/admin/components/RecentSubmissions.tsx
const submissions = [
  { name: "Amit", status: "Pending" },
  { name: "Neha", status: "Reviewed" },
  { name: "Ravi", status: "Pending" },
];

export default function RecentSubmissions() {
  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
      <h3 className="font-semibold mb-4">Recent Submissions</h3>

      <div className="space-y-3">
        {submissions.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <p className="font-medium">{s.name}</p>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                s.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
