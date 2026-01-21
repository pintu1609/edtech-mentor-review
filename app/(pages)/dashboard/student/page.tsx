"use client";

import StatCard from "@/frontend/component/statcard/StatCard";
import AssignmentsTable from "@/frontend/component/student/AssignmentsTable";
import MySubmissions from "@/frontend/component/student/MySubmissions";
import { useStudentStats } from "@/frontend/hooks/student";

export default function StudentDashboard() {
  const { data } = useStudentStats();
  console.log("🚀 ~ StudentDashboard ~ data:", data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 space-y-6">
        <h2 className="text-center text-3xl text-bold">Student Dashboard</h2>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Assignments" value={ data?.data?.totalAssignments ?? 0} icon="📘" />
        
        <StatCard title="Total Submissions" value={data?.data?.totalSubmissions ?? 0} icon="📄" />
        <StatCard title="Reviewed" value={data?.data?.reviewed ?? 0} icon="✅" />
        <StatCard title="Pending" value={data?.data?.pending ?? 0} icon="⏳" />
      </div>

      {/* Assignments */}
      <AssignmentsTable />

      {/* My Submissions */}
      <MySubmissions />
    </div>
  );
}
