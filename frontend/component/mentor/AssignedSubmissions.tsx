"use client";
import { useState } from "react";
import ReviewSubmissionModal from "./ReviewSubmissionModal";
import { useMentorAllAssignments } from "@/frontend/hooks/mentor";
import { ClipLoader } from "react-spinners";
import ViewSubmissionModal from "./ViewSubmissionModal";

export default function AssignedSubmissions({ mentorStatRefetch }: {
  mentorStatRefetch: () => void
}) {
  const { data, isPending, refetch:mentorRefetch } = useMentorAllAssignments();
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState<any>(null);
    const [openView, setOpenView] = useState(false);


  return (
    <>
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border">
        <h3 className="font-semibold mb-3">Assigned Submissions</h3>


          {isPending ? (
            <div className="flex justify-center">
              <ClipLoader size={50}/>
            </div>
          ):(
            (data?.length > 0)?(
              
           
        <table className="w-full text-sm">
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
            {data?.data?.map((s: any, index: number) => (
              <tr key={s._id} className="border-t h-12 text-center">
                <td>{index + 1} </td>
                <td>{s.studentId.name}</td>
                <td>{s.assignmentId.title}</td>
                <td>{new Date(s.assignmentId.dueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}</td>
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
                  ):(
                    <button
                      onClick={() => {
                        setSubmission(s);
                        setOpenView(true);
                      }}
                      className=" px-3 py-1 text-xs rounded
        border border-gray-300
        text-gray-700
        bg-gray-400
        hover:bg-gray-500
        transition"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         ):(
          <div className="flex justify-center">
            <h1>No Submissions</h1>
          </div>
         )
          )}
      </div>

{ open && submission && (
  

      <ReviewSubmissionModal
        open={open}
        submission={submission}
        onClose={() => setOpen(false)}
        mentorRefetch={mentorRefetch}
        mentorStatRefetch={mentorStatRefetch}
      />
      )}

      {submission && openView && (
        <ViewSubmissionModal
          open={openView}
          submission={submission}
          onClose={() => setOpenView(false)}
        />
      )}
      
    </>

    
  );
}
