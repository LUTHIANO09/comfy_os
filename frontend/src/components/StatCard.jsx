function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;