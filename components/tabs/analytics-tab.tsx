"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export function AnalyticsTab() {
  const eventTypeChartRef = useRef<HTMLDivElement>(null)
  const eventsTimelineChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let eventTypeChart: any = null
    let eventsTimelineChart: any = null

    const initCharts = async () => {
      try {
        const echarts = await import("echarts")

        // Event Type Chart
        if (eventTypeChartRef.current) {
          eventTypeChart = echarts.init(eventTypeChartRef.current)

          const eventTypeOption = {
            animation: false,
            tooltip: {
              trigger: "item",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              textStyle: {
                color: "#1f2937",
              },
            },
            legend: {
              orient: "vertical",
              right: 10,
              top: "center",
              textStyle: {
                color: "#f3f4f6",
              },
            },
            series: [
              {
                name: "Event Type",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 8,
                },
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
                data: [
                  { value: 42, name: "Military Conflict", itemStyle: { color: "rgba(87, 181, 231, 1)" } },
                  { value: 28, name: "Civil Unrest", itemStyle: { color: "rgba(141, 211, 199, 1)" } },
                  { value: 18, name: "Natural Disaster", itemStyle: { color: "rgba(251, 191, 114, 1)" } },
                  { value: 12, name: "Terrorism", itemStyle: { color: "rgba(252, 141, 98, 1)" } },
                ],
              },
            ],
          }

          eventTypeChart.setOption(eventTypeOption)
        }

        // Events Timeline Chart
        if (eventsTimelineChartRef.current) {
          eventsTimelineChart = echarts.init(eventsTimelineChartRef.current)

          const eventsTimelineOption = {
            animation: false,
            tooltip: {
              trigger: "axis",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              textStyle: {
                color: "#1f2937",
              },
            },
            grid: {
              top: 10,
              right: 10,
              bottom: 20,
              left: 40,
            },
            xAxis: {
              type: "category",
              data: ["May 17", "May 18", "May 19", "May 20", "May 21", "May 22", "May 23"],
              axisLine: {
                lineStyle: {
                  color: "#4b5563",
                },
              },
              axisLabel: {
                color: "#9ca3af",
              },
            },
            yAxis: {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#4b5563",
                },
              },
              axisLabel: {
                color: "#9ca3af",
              },
              splitLine: {
                lineStyle: {
                  color: "#374151",
                },
              },
            },
            series: [
              {
                name: "Events",
                type: "line",
                smooth: true,
                symbol: "none",
                lineStyle: {
                  width: 3,
                  color: "rgba(87, 181, 231, 1)",
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(87, 181, 231, 0.2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(87, 181, 231, 0.05)",
                    },
                  ]),
                },
                data: [12, 15, 8, 10, 18, 24, 21],
              },
            ],
          }

          eventsTimelineChart.setOption(eventsTimelineOption)
        }

        // Resize charts when window is resized
        const handleResize = () => {
          eventTypeChart?.resize()
          eventsTimelineChart?.resize()
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          eventTypeChart?.dispose()
          eventsTimelineChart?.dispose()
        }
      } catch (error) {
        console.error("Failed to initialize charts:", error)
      }
    }

    initCharts()

    return () => {
      if (eventTypeChart) {
        eventTypeChart.dispose()
      }
      if (eventsTimelineChart) {
        eventsTimelineChart.dispose()
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-3">
        <h4 className="text-sm font-medium mb-2">Event Distribution by Type</h4>
        <div ref={eventTypeChartRef} className="h-32"></div>
      </Card>
      <Card className="p-3">
        <h4 className="text-sm font-medium mb-2">Events Timeline (Last 7 Days)</h4>
        <div ref={eventsTimelineChartRef} className="h-32"></div>
      </Card>
    </div>
  )
}
