import { StatProps } from "./Stat.types";

export function Stat({ title, value, color = "success" }: StatProps) {
  return (
    <div className="stat bg-base-200 place-items-center w-80">
      <div className="stat-title">{title}</div>
      <div className={`stat-value text-${color}`}>{value}</div>
    </div>
  );
}
