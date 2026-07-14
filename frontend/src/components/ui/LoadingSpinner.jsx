function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">

      <div
        className="
          h-10
          w-10
          animate-spin
          rounded-full
          border-4
          border-slate-200
          border-t-slate-900
        "
      />

      <p className="mt-4 text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
}

export default LoadingSpinner;