import { StatProps } from "./Stat.types";

export function Stat({
  title,
  value,
  color = "success",
  isLoading = false,
  description,
}: StatProps) {
  return (
    <div className={`stat bg-base-200 place-items-center w-80 text-${color}`}>
      <div className="stat-title text-white">{title}</div>
      {isLoading ? (
        <div className="animate-pulse w-32 h-6 bg-zinc-700 rounded" />
      ) : (
        <div className="stat-value">{value}</div>
      )}
      {!!description && <div className="stat-desc">{description}</div>}
    </div>
  );
}
