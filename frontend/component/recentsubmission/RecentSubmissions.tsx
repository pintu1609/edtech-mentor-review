const submissions = [
  { name: "Amit", status: "Pending" },
  { name: "Neha", status: "Reviewed" },
  { name: "Ravi", status: "Pending" },
];

import { useRecentSubmission } from "@/frontend/hooks/admin";
import { ClipLoader } from "react-spinners";
import { is } from "zod/locales";
export default function RecentSubmissions() {
  const {data , isPending} = useRecentSubmission();
  return (

    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
      <h3 className="font-semibold mb-4">Recent Submissions</h3>
      { isPending ? (
        <div className="flex justify-center">
          <ClipLoader size={50}/>
        </div>
      ):(
        data?.length > 0 ? (
          
       

      <div className="space-y-3">
        {data?.data?.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <p className="font-medium">{s?.studentId?.name}</p>
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
       ):(
        <p className="text-center text-gray-500">No recent submissions</p>
       )
      )}

    </div>
  );
}
