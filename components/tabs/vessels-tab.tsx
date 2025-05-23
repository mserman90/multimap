"use client"

import { Card } from "@/components/ui/card"
import { useMap } from "../map-provider"
import { Ship, Compass, Gauge, Anchor } from "lucide-react"

export function VesselsTab() {
  const { setCenter, setZoom, setSelectedItem } = useMap()

  const vessels = [
    {
      id: 1,
      name: "EVER GIVEN",
      type: "Container Ship",
      flag: "Panama",
      status: "Underway",
      speed: 18.5,
      heading: 125,
      lat: 29.9511,
      lng: 32.5503,
    },
    {
      id: 2,
      name: "MAERSK SELETAR",
      type: "Container Ship",
      flag: "Singapore",
      status: "Underway",
      speed: 16.2,
      heading: 278,
      lat: 51.9225,
      lng: 4.4792,
    },
    {
      id: 3,
      name: "SYMPHONY OF THE SEAS",
      type: "Passenger Ship",
      flag: "Bahamas",
      status: "Underway",
      speed: 21.4,
      heading: 185,
      lat: 25.7617,
      lng: -80.1918,
    },
    {
      id: 4,
      name: "PIONEER SPIRIT",
      type: "Oil Tanker",
      flag: "Liberia",
      status: "Anchored",
      location: "Port of Rotterdam",
      lat: 51.9496,
      lng: 4.1453,
    },
  ]

  const handleVesselClick = (vessel: any) => {
    setCenter([vessel.lng, vessel.lat])
    setZoom(8)
    setSelectedItem({ type: "vessel", ...vessel })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {vessels.map((vessel) => (
        <Card
          key={vessel.id}
          className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => handleVesselClick(vessel)}
        >
          <div className="flex items-start gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${vessel.status === "Underway" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}
            >
              <Ship className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium">{vessel.name}</h4>
              <p className="text-xs text-muted-foreground">{vessel.type}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs">{vessel.flag}</span>
                <span className={`text-xs ${vessel.status === "Underway" ? "text-green-400" : "text-yellow-400"}`}>
                  {vessel.status}
                </span>
              </div>
              {vessel.status === "Underway" ? (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Gauge className="h-3 w-3" />
                  <span>{vessel.speed} kts</span>
                  <Compass className="h-3 w-3 ml-2" />
                  <span>{vessel.heading}°</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Anchor className="h-3 w-3" />
                  <span>{vessel.location}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
