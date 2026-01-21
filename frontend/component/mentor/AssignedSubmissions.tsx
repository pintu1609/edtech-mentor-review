"use client";
import { useState } from "react";
import ReviewSubmissionModal from "./ReviewSubmissionModal";
import { useMentorAllAssignments } from "@/frontend/hooks/mentor";

export default function AssignedSubmissions() {
  const { data } = useMentorAllAssignments();
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState<any>(null);

  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
        <h3 className="font-semibold mb-3">Assigned Submissions</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th>Student</th>
              <th>Assignment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((s: any) => (
              <tr key={s._id} className="border-t h-12 text-center">
                <td>{s.studentId.name}</td>
                <td>{s.assignmentId.title}</td>
                <td>{s.status}</td>
                <td>
                  {s.status === "submitted" && (
                    <button
                      onClick={() => {
                        setSubmission(s);
                        setOpen(true);
                      }}
                      className="px-3 py-1 text-xs rounded bg-indigo-600 text-white"
                    >
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReviewSubmissionModal
        open={open}
        submission={submission}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
