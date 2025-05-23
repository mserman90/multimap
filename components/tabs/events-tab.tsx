"use client"

import { Card } from "@/components/ui/card"
import { useMap } from "../map-provider"
import { AlertTriangle, FlagIcon as Government, CloudRain } from "lucide-react"

export function EventsTab() {
  const { setCenter, setZoom, setSelectedItem } = useMap()

  const events = [
    {
      id: 1,
      type: "conflict",
      title: "Military Conflict",
      time: "2h ago",
      description: "Artillery exchanges reported near Kharkiv region, Ukraine. Multiple civilian casualties reported.",
      priority: "high",
      lat: 48.9226,
      lng: 36.2803,
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: "protest",
      title: "Political Protest",
      time: "5h ago",
      description: "Large demonstration in central Beirut against economic policies. Estimated 5,000 participants.",
      priority: "medium",
      lat: 33.8938,
      lng: 35.5018,
      icon: Government,
    },
    {
      id: 3,
      type: "disaster",
      title: "Natural Disaster",
      time: "12h ago",
      description:
        "Flooding in Bangladesh's Sylhet region. Over 200,000 people displaced, emergency services deployed.",
      priority: "high",
      lat: 24.8949,
      lng: 91.8687,
      icon: CloudRain,
    },
  ]

  const handleEventClick = (event: any) => {
    setCenter([event.lng, event.lat])
    setZoom(8)
    setSelectedItem({ type: "event", ...event })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <Card
          key={event.id}
          className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => handleEventClick(event)}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full 
              ${
                event.type === "conflict"
                  ? "bg-red-500/20 text-red-500"
                  : event.type === "protest"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-blue-500/20 text-blue-500"
              }`}
            >
              <event.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs px-1.5 py-0.5 rounded
                  ${
                    event.priority === "high"
                      ? "bg-red-900/50 text-red-100"
                      : event.priority === "medium"
                        ? "bg-yellow-900/50 text-yellow-100"
                        : "bg-blue-900/50 text-blue-100"
                  }`}
                >
                  {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
                </span>
                <span className="text-xs text-muted-foreground">
                  {event.lat.toFixed(4)}° N, {event.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
