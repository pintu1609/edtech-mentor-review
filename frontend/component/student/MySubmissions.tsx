"use client";
import { useStudentSubmission } from "@/frontend/hooks/student";

export default function MySubmissions() {
  const { data } = useStudentSubmission();
  console.log("🚀 ~ MySubmissions ~ data:", data)

  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
      <h3 className="font-semibold mb-3">My Submissions</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left">S.no</th>
            <th>Assignment</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((sub: any,index:number) => (
            <tr key={sub._id} className="border-t h-12 text-center">
              <td className="text-left">{index+1}</td>
              <td>{sub.assignmentId.title}</td>
              <td>{sub.status}</td>
              <td>{sub.score ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
