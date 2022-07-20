import { formatCurrency } from "@/shared/utils/common";

export function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className="bg-base-300 p-5 rounded">
        <p>{`${label}`}</p>
        <p className="text-green-200">
          Income value of this day: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
}
