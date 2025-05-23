"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "../map-provider"
import { AlertCircle } from "lucide-react"

export function MapTilerMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const { center, zoom, style } = useMap()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setLoading(true)

        // Fetch configuration from our secure API route
        const response = await fetch(`/api/maptiler-proxy?style=${style}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load MapTiler map configuration")
        }

        const config = await response.json()

        // Import maplibre-gl dynamically to avoid SSR issues
        const maplibregl = await import("maplibre-gl")
        await import("maplibre-gl/dist/maplibre-gl.css")

        if (!mapContainer.current) return

        // Initialize the map
        if (map.current) {
          map.current.remove()
        }

        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: config.styleUrl,
          center: center,
          zoom: zoom,
        })

        // Add event listeners
        map.current.on("load", () => {
          setLoading(false)
          setError(null)
        })

        map.current.on("error", (e: any) => {
          console.error("MapTiler error:", e)

          // Check if the error is related to authentication
          if (e.error && (e.error.status === 401 || e.error.status === 403)) {
            setError("Invalid MapTiler API key. Please check your MAPTILER_API_KEY environment variable.")
          } else {
            setError("Failed to load MapTiler map. Please check your API key and internet connection.")
          }

          setLoading(false)
        })
      } catch (err) {
        console.error("Error initializing MapTiler map:", err)
        setError(err instanceof Error ? err.message : "Failed to initialize MapTiler map")
        setLoading(false)
      }
    }

    initializeMap()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [center, zoom, style])

  // Update map style when style changes
  useEffect(() => {
    if (!map.current || error) return

    const updateStyle = async () => {
      try {
        // Fetch updated style from our secure API route
        const response = await fetch(`/api/maptiler-proxy?style=${style}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load MapTiler map configuration")
        }

        const config = await response.json()
        map.current.setStyle(config.styleUrl)
      } catch (err) {
        console.error("Error updating MapTiler style:", err)
      }
    }

    updateStyle()
  }, [style, error])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">MapTiler Configuration Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="text-xs text-muted-foreground">
            <p>To fix this issue:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Get a MapTiler API key from maptiler.com</li>
              <li>Add it as MAPTILER_API_KEY environment variable</li>
              <li>Make sure you're using a MapTiler key, not a Mapbox key</li>
              <li>Refresh the page or try a different map provider</li>
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
          <p className="text-sm text-muted-foreground">Loading MapTiler map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full" />
}
