'use client'

import { useState } from 'react'
import PerformanceSection from '@/components/admin/PerformanceSection'
import ReportsCharts from '@/components/admin/ReportsCharts'
import type { WindowMetrics, ChartData } from './page'

interface Props {
  windows: Record<number, WindowMetrics>
  chartData: Record<number, ChartData>
}

export default function ReportsPageClient({ windows, chartData }: Props) {
  const [windowDays, setWindowDays] = useState(7)

  return (
    <div>
      <h1 className="font-display text-display-sm text-white mb-3xl">Reports</h1>
      <PerformanceSection
        windows={windows}
        windowDays={windowDays}
        onWindowChange={setWindowDays}
      />
      <ReportsCharts data={chartData[windowDays]} />
    </div>
  )
}
