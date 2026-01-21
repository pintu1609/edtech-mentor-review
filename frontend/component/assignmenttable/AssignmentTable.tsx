"use client";


// const assignments = [
//   { id: "A1", title: "React Basics", mentor: "Rahul", students: 18, status: "Active" },
//   { id: "A2", title: "Node API Design", mentor: "Priya", students: 27, status: "Closed" },
// ];

export default function AssignmentsTable({ open, setOpen, assignments }: any) {

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
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${assignment.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200"
                      }`}
                  >
                    {assignment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}
