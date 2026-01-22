"use client";

export default function ViewSubmissionModal({
  open,
  submission,
  onClose,
}: {
  open: boolean;
  submission: any;
  onClose: () => void;
}) {
  if (!open || !submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-white/90 backdrop-blur-xl p-6 shadow-xl border">
        <h2 className="text-lg font-semibold mb-4">
          View Submission
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Student</p>
            <p className="font-medium">{submission.studentId.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Assignment Title</p>
            <p className="font-medium">{submission.assignmentId.title}</p>
          </div>
            <div>
            <p className="text-gray-500">Assignment Description</p>
            <p className="font-medium">{submission.assignmentId.description}</p>
          </div>

          <div>
            <p className="text-gray-500">Due Date</p>
            <p>
              {new Date(submission.assignmentId.dueDate).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="capitalize">{submission.status}</p>
          </div>

          <div>
            <p className="text-gray-500">Submission Content</p>
            <div className="mt-1 rounded-lg border bg-gray-50 p-3 whitespace-pre-wrap">
              {submission.content}
            </div>
          </div>

          {submission.status === "reviewed" && (
            <>
              <div>
                <p className="text-gray-500">Score</p>
                <p>{submission.score ?? "-"}</p>
              </div>

              <div>
                <p className="text-gray-500">Feedback</p>
                <div className="mt-1 rounded-lg border bg-gray-50 p-3">
                  {submission.feedback ?? "-"}
                </div>
              </div>
            </>
          )}

          <div className="text-xs text-gray-400">
            Last updated:{" "}
            {new Date(submission.updatedAt).toLocaleString("en-IN")}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
