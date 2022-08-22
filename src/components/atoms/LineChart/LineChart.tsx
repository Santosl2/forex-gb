import { Tooltip, XAxis, YAxis, AreaChart as Chart, Area } from "recharts";

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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Area
        connectNulls
        type="natural"
        dataKey="amount"
        stroke="#8884d8"
        fill="#8884d8"
        dot
        activeDot={{ strokeWidth: 2, r: 10 }}
      />
    </Chart>
  );
}
