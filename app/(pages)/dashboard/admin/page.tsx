"use client";
import AssignmentsTable from "@/frontend/component/assignmenttable/AssignmentTable";
import CreateAssignmentModal from "@/frontend/component/createassignment/CreateAssignment";
import MentorOverview from "@/frontend/component/mentoroverview/MentorOverview";
import RecentSubmissions from "@/frontend/component/recentsubmission/RecentSubmissions";
import StatCard from "@/frontend/component/statcard/StatCard";
import { useAdminStats, useAdminAllAssignments, useMentorOverview } from "@/frontend/hooks/admin";
import { useState } from "react";



export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const { data } = useAdminStats();
  const { data: assignments, isPending, refetch } = useAdminAllAssignments();
  const { data: mentorData, refetch: mentorRefetch, isPending: mentorIsPending } = useMentorOverview();
  console.log("🚀 ~ AdminDashboard ~ mentorIsPending:", mentorIsPending)
  console.log("🚀 ~ AdminDashboard ~ mentorData:", mentorData)

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* <Sidebar /> */}

      <div className="flex-1 space-y-6 p-4">
        <h2 className="text-center text-2xl text-gray-600 text-bold"> Admin Dashboard</h2>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Assignments" value={data?.data?.assignments ?? 0} icon="📘" />
          <StatCard title="Submissions" value={data?.data.submissions ?? 0} icon="🎓" />
          <StatCard title="Pending Reviews" value={data?.data.pendingReviews ?? 0} icon="📄" />
          <StatCard title="Mentors" value={data?.data.mentors ?? 0} icon="👨‍🏫" />
        </div>

        {/* Middle */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AssignmentsTable open={open} setOpen={setOpen} assignments={assignments} isPending={isPending} refetch={refetch} />
          </div>
          <RecentSubmissions />
        </div>

        {/* Bottom */}
        {mentorData && <MentorOverview mentorData={mentorData} mentorIsPending={mentorIsPending} />}   
           </div>
      {open &&
        <CreateAssignmentModal open={open} onClose={() => setOpen(false)} refetch={refetch} mentorRefetch={mentorRefetch} />
      }

    </div>
  );
}
