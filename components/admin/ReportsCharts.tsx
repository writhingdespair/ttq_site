'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatPrice } from '@/lib/utils'

interface DailyPoint {
  date: string
  revenue: number
}

interface HourPoint {
  hour: number
  count: number
}

interface DOWPoint {
  day: string
  count: number
}

interface CancellationPoint {
  date: string
  rate: number | null
}

interface ChartData {
  dailyRevenue: DailyPoint[]
  ordersByHour: HourPoint[]
  ordersByDay: DOWPoint[]
  cancellationRate: CancellationPoint[]
}

const CHART_STYLE = {
  axisTick: {
    fill: 'rgba(255,255,255,0.45)',
    fontSize: 12,
    fontFamily: 'var(--font-sans)',
  },
  grid: { stroke: 'rgba(255,255,255,0.06)' },
  tooltipCursor: { stroke: 'rgba(255,255,255,0.15)' },
  line: {
    stroke: 'rgba(255,255,255,0.8)',
    strokeWidth: 1.5,
  },
  bar: { fill: 'rgba(255,255,255,0.8)', radius: [2, 2, 0, 0] as [number, number, number, number] },
  barHover: { fill: '#e9b48a' },
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number | string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-md border border-white/[0.06] rounded-lg px-3 py-2">
      <p className="text-body-xs text-tertiary">{label}</p>
      <p className="text-label-sm text-white tabular-nums">{payload[0].value}</p>
    </div>
  )
}

function formatHour(h: number): string {
  if (h === 0) return '12am'
  if (h < 12) return `${h}am`
  if (h === 12) return '12pm'
  return `${h - 12}pm`
}

const formattedHours = Array.from({ length: 24 }, (_, i) => formatHour(i))

interface Props {
  data: ChartData
}

export default function ReportsCharts({ data }: Props) {
  return (
    <div className="space-y-4 mt-4xl">
      {/* Revenue */}
      <div className="card p-5 animate-fade-in">
        <h3 className="font-display text-body-lg text-white mb-3">Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.dailyRevenue}>
            <CartesianGrid stroke={CHART_STYLE.grid.stroke} />
            <XAxis
              dataKey="date"
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => formatPrice(v)}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} cursor={CHART_STYLE.tooltipCursor} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={CHART_STYLE.line.stroke}
              strokeWidth={CHART_STYLE.line.strokeWidth}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders by Day */}
      <div className="card p-5 animate-fade-in">
        <h3 className="font-display text-body-lg text-white mb-3">Orders by Day</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.ordersByDay}>
            <CartesianGrid stroke={CHART_STYLE.grid.stroke} />
            <XAxis
              dataKey="day"
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={CHART_STYLE.tooltipCursor} />
            <Bar
              dataKey="count"
              fill={CHART_STYLE.bar.fill}
              radius={CHART_STYLE.bar.radius}
              activeBar={CHART_STYLE.barHover}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders by Hour */}
      <div className="card p-5 animate-fade-in">
        <h3 className="font-display text-body-lg text-white mb-3">Orders by Hour</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.ordersByHour}>
            <CartesianGrid stroke={CHART_STYLE.grid.stroke} />
            <XAxis
              dataKey="hour"
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
              tickFormatter={(h: number) => formattedHours[h]}
            />
            <YAxis
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              width={30}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={CHART_STYLE.tooltipCursor}
              labelFormatter={(label) => formattedHours[label as unknown as number]}
            />
            <Bar
              dataKey="count"
              fill={CHART_STYLE.bar.fill}
              radius={CHART_STYLE.bar.radius}
              activeBar={CHART_STYLE.barHover}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cancellation Trend */}
      <div className="card p-5 animate-fade-in">
        <h3 className="font-display text-body-lg text-white mb-3">Cancellation Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.cancellationRate}>
            <CartesianGrid stroke={CHART_STYLE.grid.stroke} />
            <XAxis
              dataKey="date"
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={CHART_STYLE.axisTick}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}%`}
              width={45}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={CHART_STYLE.tooltipCursor} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={CHART_STYLE.line.stroke}
              strokeWidth={CHART_STYLE.line.strokeWidth}
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
