"use client"

import { Card } from "@/components/ui/card"
import { useMap } from "../map-provider"
import { CloudRain, Wind, Flame, Activity } from "lucide-react"

export function WeatherTab() {
  const { setCenter, setZoom, setSelectedItem } = useMap()

  const weatherEvents = [
    {
      id: 1,
      type: "rain",
      title: "Heavy Rainfall",
      location: "Mumbai, India",
      status: "Ongoing",
      severity: "Warning",
      details: "120mm in 24h",
      lat: 19.076,
      lng: 72.8777,
      icon: CloudRain,
    },
    {
      id: 2,
      type: "hurricane",
      title: "Hurricane Emily",
      location: "Atlantic Ocean",
      status: "Category 3",
      severity: "Alert",
      details: "185 km/h winds",
      lat: 25.7617,
      lng: -70.1918,
      icon: Wind,
    },
    {
      id: 3,
      type: "fire",
      title: "Wildfire",
      location: "California, USA",
      status: "Spreading",
      severity: "Alert",
      details: "8,500 acres affected",
      lat: 34.0522,
      lng: -118.2437,
      icon: Flame,
    },
    {
      id: 4,
      type: "earthquake",
      title: "Earthquake",
      location: "Tokyo, Japan",
      status: "2h ago",
      severity: "Warning",
      details: "Magnitude 5.8",
      lat: 35.6762,
      lng: 139.6503,
      icon: Activity,
    },
  ]

  const handleWeatherClick = (weather: any) => {
    setCenter([weather.lng, weather.lat])
    setZoom(8)
    setSelectedItem({ type: "weather", ...weather })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {weatherEvents.map((weather) => (
        <Card
          key={weather.id}
          className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => handleWeatherClick(weather)}
        >
          <div className="flex items-start gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${
                weather.type === "rain"
                  ? "bg-blue-500/20 text-blue-500"
                  : weather.type === "hurricane"
                    ? "bg-red-500/20 text-red-500"
                    : weather.type === "fire"
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-purple-500/20 text-purple-500"
              }`}
            >
              <weather.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{weather.title}</h4>
              <p className="text-xs text-muted-foreground">{weather.location}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs">{weather.status}</span>
                <span className={`text-xs ${weather.severity === "Alert" ? "text-red-400" : "text-yellow-400"}`}>
                  {weather.severity}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <span>{weather.details}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
