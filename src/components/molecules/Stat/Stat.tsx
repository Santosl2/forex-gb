import { StatProps } from "./Stat.types";

export function Stat({
  title,
  value,
  color = "success",
  isLoading = false,
}: StatProps) {
  return (
    <div className="stat bg-base-200 place-items-center w-80">
      <div className="stat-title">{title}</div>
      {isLoading ? (
        <div className="animate-pulse w-32 h-6 bg-zinc-700 rounded" />
      ) : (
        <div className={`stat-value text-${color}`}>{value}</div>
      )}
    </div>
  );
}
