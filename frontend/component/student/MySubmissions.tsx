"use client";
import { Edit, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import EditAssignment from "./assignmentModal/EditAssignment";
import ViewSubmissionModal from "./assignmentModal/ViewSubmissionModal";
import { ClipLoader } from "react-spinners";

type EditData = {
  id: string;
  assignmentId: string;
  content: string;
};
type ViewData = {
  assignmentTitle: string;
  assignmentDescription: string;
  mentorName: string;
  content: string;
  status: string;
  score?: number;
  feedback?: string;
  updatedAt: string;
};

export default function MySubmissions({
  submissionsData,
  refetchSubmission,
  isPending,
}: {
  submissionsData: any;
  refetchSubmission: () => void;
  isPending: boolean;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<EditData | null>(null);


  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState<ViewData | null>(null);

  const handleEdit = (id: string, assignmentId: string, content: string) => {
    setOpenEdit(true);
    setEditData({
      id,
      assignmentId,
      content
    });

  };

  const handleView = (sub: any) => {
    setViewData({
      assignmentTitle: sub.assignment?.title,
      assignmentDescription: sub.assignment?.description,
      mentorName: sub.mentor?.name,
      content: sub.content,
      status: sub.status,
      score: sub.score,
      feedback: sub.feedback,
      updatedAt: sub.updatedAt,
    });
    setOpenView(true);
  };

  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
        <h3 className="font-semibold mb-3">My Submissions</h3>

        {isPending ? (
          <div className="flex justify-center">
            <ClipLoader size={50} />
          </div>
        ) : (
          (submissionsData?.length > 0) ? (

            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left">S.no</th>
                  <th>Assignment</th>
                  <th>Mentor</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {submissionsData?.data?.map((sub: any, index: number) => {
                  const canEdit =
                    sub.assignment?.assignmentsStatus === "open" &&
                    sub.status === "submitted";

                  return (
                    <tr key={sub._id} className="border-t h-12 text-center">
                      <td className="text-left">{index + 1}</td>
                      <td>{sub.assignment?.title ?? "-"}</td>
                      <td>{sub.mentor?.name ?? "-"}</td>
                      <td className="capitalize">{sub.status}</td>
                      <td>{sub.score ?? "-"}</td>

                      <td>

                        <div className="flex justify-center gap-3">
                          <button
                            title="View Submission"
                            className="text-indigo-600 hover:text-indigo-800"
                            onClick={() => handleView(sub)}
                          >
                            <Eye size={16} />
                          </button>
                          {canEdit && (
                            <button
                              title="Edit Submission"
                              className="text-green-600 hover:text-green-800"
                              onClick={() => handleEdit(sub._id, sub.assignmentId, sub.content)}
                            >
                              <Pencil size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center">
              <p className="text-gray-500">No submissions found</p>
            </div>
          )
        )}

      </div>
      {openEdit && editData && (
        <EditAssignment
          open={openEdit}
          editData={editData}
          onClose={() => setOpenEdit(false)}
          refetchSubmission={refetchSubmission}
        />
      )}

      {openView && viewData && (
        <ViewSubmissionModal
          open={openView}
          data={viewData}
          onClose={() => setOpenView(false)}
        />
      )}
    </>
  );
}
