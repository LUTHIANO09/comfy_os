import { PackageOpen } from "lucide-react";

function EmptyState({
  icon,
  title = "No Data Found",
  message = "There is nothing to display yet.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      <div className="rounded-full bg-slate-100 p-5">
        {icon || (
          <PackageOpen
            size={40}
            className="text-slate-500"
          />
        )}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-slate-500">
        {message}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;