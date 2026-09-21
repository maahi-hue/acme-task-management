const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-lg mx-4">
        {children}
      </div>
    </div>
  );
};

const AlertDialogHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const AlertDialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold text-slate-900 ${className}`}>{children}</h2>
);

const AlertDialogDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-slate-600 ${className}`}>{children}</p>
);

const AlertDialogFooter = ({ children, className = "" }) => (
  <div className={`mt-6 flex justify-end gap-3 ${className}`}>{children}</div>
);

const AlertDialogAction = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`rounded-lg bg-red-600 cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-red-700 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const AlertDialogCancel = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`rounded-lg border cursor-pointer border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
