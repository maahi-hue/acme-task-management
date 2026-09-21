const Dialog = ({ open, onOpenChange, children }) => {
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

const DialogHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-lg font-semibold text-slate-900 ${className}`}>{children}</h2>
);

const DialogContent = ({ children, className = "" }) => (
  <div className={`text-sm text-slate-600 ${className}`}>{children}</div>
);

const DialogFooter = ({ children, className = "" }) => (
  <div className={`mt-6 flex justify-end gap-3 ${className}`}>{children}</div>
);

export { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter };
