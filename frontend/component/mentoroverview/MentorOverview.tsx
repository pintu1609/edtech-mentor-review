// app/dashboard/admin/components/MentorOverview.tsx
const mentors = [
  { name: "Rahul Sharma", progress: 70 },
  { name: "Priya Verma", progress: 40 },
];

import {useMentorOverview} from "@/frontend/hooks/admin"
export default function MentorOverview() {
  const {data} = useMentorOverview();
  console.log("🚀 ~ MentorOverview ~ data:", data)
  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
      <h3 className="font-semibold mb-4">Mentor Overview</h3>

      <div className="space-y-4">
        {data?.data?.map((m) => (
          <div key={m.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{m.name}</span>
              {/* <span>{m.progress}%</span> */}
              <span>60%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                // style={{ width: `${m.progress}%` }}
                 style={{ width: `{60}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
