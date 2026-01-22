"use client";

import { Trash } from "lucide-react";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useDeleteAssignment } from "@/frontend/hooks/admin";

export default function AssignmentsTable({ open, setOpen, assignments, isPending, refetch }: any) {
  const { mutateAsync: deleteAssignment, isPending: isDeleting } = useDeleteAssignment();
  const handleAssignmentDelete = async (id: string) => {
    try {
      const ok = window.confirm(
        "Are you sure you want to delete this assignment? This action cannot be undone."
      );

      if (!ok) return;
      await deleteAssignment(id);
      refetch()
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  return (
    <>
      <div className="relative backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Assignments</h3>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg bg-indigo-500 px-4 py-2
                       text-sm font-semibold text-white
                       shadow-md hover:bg-indigo-700 transition"
            style={{
              // background: "indigo",
              color: "white",
              padding: "10px",
              zIndex: 9999,
              position: "relative",
            }}
          >
            + Create Assignment
          </button>
        </div>
        {isPending ? (
          <div className="flex justify-center">
            <ClipLoader size={50} />
          </div>
        ) : (

          assignments?.data.length > 0 ? (



            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left">S.no</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Mentor</th>
                  <th className="text-center">DueDate</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {assignments?.data.map((assignment: any, index: number) => (
                  <tr key={assignment._id} className="border-t h-12 hover:bg-white/40">
                    <td>{index + 1}</td>
                    <td className="text-center">{assignment.title}</td>
                    <td className="text-center">{assignment?.mentor?.name ?? "-"}</td>
                    <td className="text-center">{new Date(assignment.dueDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}</td>

                    <td className="text-center">
                      {assignment.isDeleted ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Deleted
                        </span>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
          ${assignment.assignmentsStatus === "open"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {assignment.assignmentsStatus}
                          </span>

                          <button
                            onClick={() => {
                              handleAssignmentDelete(assignment._id)
                            }}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete Assignment"
                          >
                            {isDeleting ? (
                              <BeatLoader size={14} />
                            ) : (
                              <Trash size={18} />
                            )}
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-2xl text-center text-gray-500">No assignments found</p>
          ))}
      </div>

    </>
  );
}
