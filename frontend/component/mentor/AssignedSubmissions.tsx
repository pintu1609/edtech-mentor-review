"use client";
import { useState } from "react";
import ReviewSubmissionModal from "./ReviewSubmissionModal";
import ViewSubmissionModal from "./ViewSubmissionModal";
import { useMentorAllAssignments } from "@/frontend/hooks/mentor";
import { ClipLoader } from "react-spinners";

export default function AssignedSubmissions({
  mentorStatRefetch,
}: {
  mentorStatRefetch: () => void;
}) {
  const { data, isPending, refetch: mentorRefetch } = useMentorAllAssignments();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [submission, setSubmission] = useState<any>(null);

  if (isPending) {
    return (
      <div className="flex justify-center p-6">
        <ClipLoader size={40} />
      </div>
    );
  }

  if (!data?.data?.length) {
    return <p className="text-center text-sm text-gray-500">No Submissions</p>;
  }

  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
        <h3 className="font-semibold mb-4">Assigned Submissions</h3>

        {/* ✅ MOBILE VIEW */}
        <div className="space-y-3 md:hidden">
          {data.data.map((s: any, index: number) => (
            <div
              key={s._id}
              className="rounded-xl border p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{s.studentId.name}</span>
                <span className="capitalize">{s.status}</span>
              </div>

              <p className="text-xs text-gray-600 mt-1">
                {s.assignmentId.title}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Due:{" "}
                {new Date(s.assignmentId.dueDate).toLocaleDateString("en-IN")}
              </p>

              <div className="mt-3 flex justify-end">
                {s.status === "submitted" ? (
                  <button
                    onClick={() => {
                      setSubmission(s);
                      setOpen(true);
                    }}
                    className="px-3 py-1 text-xs rounded bg-indigo-600 text-white"
                  >
                    Review
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSubmission(s);
                      setOpenView(true);
                    }}
                    className="px-3 py-1 text-xs rounded bg-gray-400 text-white"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP VIEW */}
        <table className="hidden md:table w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th>S.no</th>
              <th>Student</th>
              <th>Assignment</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((s: any, index: number) => (
              <tr key={s._id} className="border-t h-12 text-center">
                <td>{index + 1}</td>
                <td>{s.studentId.name}</td>
                <td>{s.assignmentId.title}</td>
                <td>
                  {new Date(s.assignmentId.dueDate).toLocaleDateString("en-IN")}
                </td>
                <td>{s.status}</td>
                <td>
                  {s.status === "submitted" ? (
                    <button
                      onClick={() => {
                        setSubmission(s);
                        setOpen(true);
                      }}
                      className="px-3 py-1 text-xs rounded bg-indigo-600 text-white"
                    >
                      Review
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSubmission(s);
                        setOpenView(true);
                      }}
                      className="px-3 py-1 text-xs rounded bg-gray-400 text-white"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && submission && (
        <ReviewSubmissionModal
          open={open}
          submission={submission}
          onClose={() => setOpen(false)}
          mentorRefetch={mentorRefetch}
          mentorStatRefetch={mentorStatRefetch}
        />
      )}

      {openView && submission && (
        <ViewSubmissionModal
          open={openView}
          submission={submission}
          onClose={() => setOpenView(false)}
        />
      )}
    </>
  );
}
