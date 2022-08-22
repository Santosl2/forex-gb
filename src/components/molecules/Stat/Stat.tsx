import { StatProps } from "./Stat.types";

export function Stat({
  title,
  value,
  color = "success",
  isLoading = false,
  description,
  icon,
}: StatProps) {
  return (
    <div className={`stat statBox text-${color}`}>
      <div className="stat-figure text-white bg-red">{icon}</div>
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
