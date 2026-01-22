"use client";

export default function ViewSubmissionModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: {
    assignmentTitle: string;
    assignmentDescription: string;
    mentorName: string;
    content: string;
    status: string;
    updatedAt: string;
  };
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl w-full max-w-lg shadow-xl">
        <h2 className="font-semibold text-lg mb-4">View Submission</h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Assignment</p>
            <p className="font-medium">{data.assignmentTitle}</p>
          </div>

          <div>
            <p className="text-gray-500">Description</p>
            <p>{data.assignmentDescription}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Mentor</p>
              <p>{data.mentorName}</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="capitalize">{data.status}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Your Submission</p>
            <div className="mt-1 p-3 rounded-lg border bg-gray-50 text-sm whitespace-pre-wrap">
              {data.content}
            </div>
          </div>

          
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border  border-gray-200 hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
