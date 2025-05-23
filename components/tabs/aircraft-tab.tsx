"use client"

import { Card } from "@/components/ui/card"
import { useMap } from "../map-provider"
import { Plane, ArrowUp, Gauge } from "lucide-react"

export function AircraftTab() {
  const { setCenter, setZoom, setSelectedItem } = useMap()

  const aircraft = [
    {
      id: 1,
      callsign: "BA294",
      type: "Boeing 777-300ER",
      route: "LHR → ORD",
      status: "In Flight",
      speed: 520,
      altitude: 38000,
      lat: 51.47,
      lng: -0.4543,
    },
    {
      id: 2,
      callsign: "EK203",
      type: "Airbus A380-800",
      route: "DXB → JFK",
      status: "In Flight",
      speed: 495,
      altitude: 41000,
      lat: 25.2532,
      lng: 55.3657,
    },
    {
      id: 3,
      callsign: "SQ321",
      type: "Boeing 787-10",
      route: "SIN → LHR",
      status: "In Flight",
      speed: 510,
      altitude: 39000,
      lat: 1.3644,
      lng: 103.9915,
    },
    {
      id: 4,
      callsign: "AF123",
      type: "Airbus A350-900",
      route: "CDG → LAX",
      status: "Scheduled",
      departure: "45m",
      lat: 49.0097,
      lng: 2.5479,
    },
  ]

  const handleAircraftClick = (aircraft: any) => {
    setCenter([aircraft.lng, aircraft.lat])
    setZoom(8)
    setSelectedItem({ type: "aircraft", ...aircraft })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {aircraft.map((aircraft) => (
        <Card
          key={aircraft.id}
          className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => handleAircraftClick(aircraft)}
        >
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-500">
              <Plane className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{aircraft.callsign}</h4>
              <p className="text-xs text-muted-foreground">{aircraft.type}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs">{aircraft.route}</span>
                <span
                  className={`text-xs ${aircraft.status === "In Flight" ? "text-green-400" : "text-muted-foreground"}`}
                >
                  {aircraft.status}
                </span>
              </div>
              {aircraft.status === "In Flight" ? (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Gauge className="h-3 w-3" />
                  <span>{aircraft.speed} kts</span>
                  <ArrowUp className="h-3 w-3 ml-2" />
                  <span>{aircraft.altitude} ft</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <span>Departure in {aircraft.departure}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
