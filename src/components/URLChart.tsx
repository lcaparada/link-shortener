"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { URL } from "@/types/url.types";

type URLChartProps = {
  data: Pick<URL, "accessCount" | "shortUrl">[];
};

const chartConfig = {
  accessCount: {
    label: "Acessos",
  },
  shortUrl: {
    label: "URL Encurtada",
  },
} satisfies ChartConfig;
export function URLChart({ data }: URLChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey="shortUrl"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={210}
        />
        <XAxis dataKey="accessCount" type="number" hide={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="accessCount" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
