export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-5 shadow-lg border border-white/40">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
      <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
    </div>
  );
}
