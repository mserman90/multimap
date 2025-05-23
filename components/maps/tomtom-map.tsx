"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "../map-provider"
import "@tomtom-international/web-sdk-maps/dist/maps.css"
import { AlertCircle } from "lucide-react"

export function TomTomMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const { center, zoom, style } = useMap()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let map: any = null

    const loadTomTom = async () => {
      try {
        setLoading(true)

        // Fetch configuration from our secure API route
        const response = await fetch(
          `/api/tomtom-proxy?style=${style === "satellite" ? "satellite" : style === "dark" ? "night" : "main"}`,
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load TomTom map configuration")
        }

        const config = await response.json()

        // Load TomTom SDK
        const tt = await import("@tomtom-international/web-sdk-maps")

        if (!mapContainer.current) return

        // Initialize map with the configuration from our API
        map = tt.map({
          key: config.key,
          container: mapContainer.current,
          center: center,
          zoom: zoom,
          style: config.styleUrl,
        })

        map.on("load", () => {
          setLoading(false)
          setError(null)
        })

        map.on("error", (e: any) => {
          console.error("TomTom map error:", e)
          setError("Failed to load TomTom map. Please check your API key and internet connection.")
          setLoading(false)
        })
      } catch (err) {
        console.error("Error initializing TomTom map:", err)
        setError(err instanceof Error ? err.message : "Failed to initialize TomTom map")
        setLoading(false)
      }
    }

    loadTomTom()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [center, zoom, style])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">TomTom Map Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="text-xs text-muted-foreground">
            <p>To fix this issue:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Make sure the TOMTOM_API_KEY environment variable is set on the server</li>
              <li>Check your internet connection</li>
              <li>Try refreshing the page or selecting a different map provider</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading TomTom map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full" />
}
