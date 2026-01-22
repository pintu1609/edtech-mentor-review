"use client";
import { useState } from "react";
import SubmitAssignmentModal from "./assignmentModal/SubmitAssignmentModal";
import { useStudentAllAssignments } from "@/frontend/hooks/student";
import { ClipLoader } from "react-spinners";

export default function AssignmentsTable({refetchSubmission,refetchStats}:{
  refetchSubmission:()=>void,
  refetchStats:()=>void
}) {
  const { data , isPending, refetch  } = useStudentAllAssignments();
  const [open, setOpen] = useState(false);
  const [assignmentId, setAssignmentId] = useState<string | null>(null);

  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
        <h3 className="font-semibold text-lg mb-3">Available Assignments</h3>

        {isPending ? (
          <div className="flex justify-center">
            <ClipLoader size={50} />
          </div>
        ): (data?.length >0 ? (
          
        

        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left">S.no</th>
              <th className="text-center">Title</th>
              <th className="text-center">Due Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((ass:any, index) => (
              <tr key={ass._id} className="border-t h-12">
                <td>
                  {index+1}
                </td>
                <td className="text-center">{ass.title}</td>
                <td className="text-center">
                  {new Date(ass.dueDate).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {(ass.assignmentsStatus === "open") ? (
                  <button
                    onClick={() => {
                      setAssignmentId(ass._id);
                      setOpen(true);
                    }}
                    className="px-3 py-1 text-xs rounded bg-indigo-600 text-white"
                  >
                    Submit
                  </button>) : (
                    <button className="px-3 py-1 text-xs rounded bg-gray-600 text-white">
                      Closed
                    </button>
                  )}
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
        ):(
          <div className="flex justify-center">
            <h1>No assignments available</h1>
          </div>
        ))}
        
      </div>

{assignmentId && open && <div>
      <SubmitAssignmentModal
        open={open}
        assignmentId={assignmentId}
        onClose={() => setOpen(false)}
        refetch={refetch}
        refetchSubmission={refetchSubmission}
        refetchStats={refetchStats}
      />
      </div>}
    </>
  );
}
