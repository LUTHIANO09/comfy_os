import { TrendingUp } from "lucide-react";

function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      {/* Background Glow */}

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          ${color}
          opacity-10
          blur-3xl
        `}
      />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">

            <TrendingUp
              size={16}
              className="text-emerald-500"
            />

            <span className="text-sm font-medium text-emerald-600">
              Live
            </span>

          </div>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white
            shadow-lg
            ${color}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;