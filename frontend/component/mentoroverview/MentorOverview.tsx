import { ClipLoader } from "react-spinners";

interface MentorOverviewProps {
  id: string;
  name: string;
  totalAssignments: number;
  totalSubmissions: number;
  totalStudents: number;
  reviewed: number;
  pending: number;
}

interface MentorDataProp {
  data: MentorOverviewProps[];
  length: number;
  status?: number | undefined;
  message?: string | undefined;
}

export default function MentorOverview({
  mentorData,
  mentorIsPending,
}: {
  mentorData: MentorDataProp;
  mentorIsPending: boolean;
}) {
  if (mentorIsPending) {
    return (
      <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
        <p className="text-center text-gray-500">Loading mentors…</p>
      </div>
    );
  }


  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
      <h3 className="font-semibold mb-4">Mentor Overview</h3>
 {mentorIsPending ?(
          <div className="flex justify-center">
            <ClipLoader size={50}/>
          </div>
        ):(
        
        mentorData?.length > 0 ? (
         
        

      <div className="space-y-5">
        {mentorData?.data?.map((m) => {
          const progress =
            m.totalSubmissions > 0
              ? Math.round((m.reviewed / m.totalSubmissions) * 100)
              : 0;

          return (
            <div key={m.id}>
              {/* Header */}
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-gray-500">
                    Assignments: {m.totalAssignments}
                  </p>
                </div>

                <span className="text-sm font-semibold text-gray-700">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
        ):(
          <p className="text-center text-gray-500">No mentors found</p>
        ))}
    </div>
  );
}
