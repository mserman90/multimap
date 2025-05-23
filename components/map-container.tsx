"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./map-provider"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Compass, Maximize } from "lucide-react"
import { MapboxMap } from "./maps/mapbox-map"
import { GoogleMap } from "./maps/google-map"
import { TomTomMap } from "./maps/tomtom-map"
import { MapTilerMap } from "./maps/maptiler-map"
import { YandexMap } from "./maps/yandex-map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MapContainer() {
  const { provider, setProvider } = useMap()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex-1">
      {/* Map Provider Selector */}
      <div className="absolute top-4 left-4 z-10 bg-card/90 p-2 rounded-md shadow-lg">
        <Select value={provider} onValueChange={(value: any) => setProvider(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Map Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mapbox">Mapbox</SelectItem>
            <SelectItem value="maptiler">MapTiler</SelectItem>
            <SelectItem value="tomtom">TomTom</SelectItem>
            <SelectItem value="google">Google Maps</SelectItem>
            <SelectItem value="yandex">Yandex Maps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 bg-card/90 p-2 rounded-md shadow-lg flex flex-col gap-2">
        <Button variant="secondary" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-full h-px bg-border my-1"></div>
        <Button variant="secondary" size="icon">
          <Compass className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={toggleFullscreen}>
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-card/90 p-3 rounded-md shadow-lg">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">LEGEND</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Conflict Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 transform rotate-45"></div>
            <span className="text-xs">Aircraft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500"></div>
            <span className="text-xs">Vessels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Weather Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Traffic Incidents</span>
          </div>
        </div>
      </div>

      {/* Map Component based on selected provider */}
      <div className="w-full h-full">
        {provider === "mapbox" && <MapboxMap />}
        {provider === "google" && <GoogleMap />}
        {provider === "tomtom" && <TomTomMap />}
        {provider === "maptiler" && <MapTilerMap />}
        {provider === "yandex" && <YandexMap />}
      </div>
    </div>
  )
}
