import {
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  LineChart as Chart,
} from "recharts";

import { CustomTooltip } from "./CustomTooltip";

export function LineChart({ data }: any) {
  return (
    <Chart
      width={980}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Line
        connectNulls
        type="monotone"
        dataKey="amount"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </Chart>
  );
}
