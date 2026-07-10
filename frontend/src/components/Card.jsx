function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {title && (
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}

export default Card;