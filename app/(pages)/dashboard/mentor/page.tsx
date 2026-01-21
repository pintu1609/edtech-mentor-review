"use client";

import StatCard from "@/frontend/component/statcard/StatCard";
import AssignedSubmissions from "@/frontend/component/mentor/AssignedSubmissions";
import { useMentorStats } from "@/frontend/hooks/mentor";

export default function MentorDashboard() {
  const { data } = useMentorStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Assigned" value={data?.data?.total ?? 0} icon="📘" />
        <StatCard title="Reviewed" value={data?.data?.reviewed ?? 0} icon="✅" />
        <StatCard title="Pending" value={data?.data?.pending ?? 0} icon="⏳" />
      </div>

      {/* Assigned Submissions */}
      <AssignedSubmissions />
    </div>
  );
}
