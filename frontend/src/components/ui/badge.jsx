import { forwardRef } from "react";

const badgeVariants = {
  default: "bg-slate-100 text-slate-900",
  pending: "bg-yellow-100 text-yellow-800",
  inProgress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  high: "bg-red-100 text-red-800",
  medium: "bg-orange-100 text-orange-800",
  low: "bg-slate-100 text-slate-800",
};

const Badge = forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeVariants[variant]} ${className}`}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge };
