"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "../map-provider"
import { AlertCircle } from "lucide-react"

// Sample data
const sampleEvents = [
  {
    id: 1,
    lat: 48.9226,
    lng: 36.2803,
    type: "conflict",
    title: "Military Conflict",
    description: "Artillery exchanges reported near Kharkiv region, Ukraine.",
  },
  {
    id: 2,
    lat: 33.8938,
    lng: 35.5018,
    type: "protest",
    title: "Political Protest",
    description: "Large demonstration in central Beirut against economic policies.",
  },
  {
    id: 3,
    lat: 24.8949,
    lng: 91.8687,
    type: "disaster",
    title: "Natural Disaster",
    description: "Flooding in Bangladesh's Sylhet region. Over 200,000 people displaced.",
  },
]

const sampleAircraft = [
  { id: 1, lat: 51.47, lng: -0.4543, callsign: "BA294", heading: 280, altitude: 38000, speed: 520 },
  { id: 2, lat: 25.2532, lng: 55.3657, callsign: "EK203", heading: 315, altitude: 41000, speed: 495 },
  { id: 3, lat: 1.3644, lng: 103.9915, callsign: "SQ321", heading: 340, altitude: 39000, speed: 510 },
]

const sampleVessels = [
  { id: 1, lat: 29.9511, lng: 32.5503, name: "EVER GIVEN", heading: 125, speed: 18.5 },
  { id: 2, lat: 51.9225, lng: 4.4792, name: "MAERSK SELETAR", heading: 278, speed: 16.2 },
  { id: 3, lat: 25.7617, lng: -80.1918, name: "SYMPHONY OF THE SEAS", heading: 185, speed: 21.4 },
]

export function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markers = useRef<{ [key: string]: any }>({})
  const { center, setCenter, zoom, setZoom, style, layers, setSelectedItem } = useMap()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if API key is available
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

  // Initialize map
  useEffect(() => {
    if (map.current) return

    // Check if API key is available
    if (!apiKey || apiKey.trim() === "") {
      setError("Mapbox API key is not configured. Please add NEXT_PUBLIC_MAPBOX_API_KEY to your environment variables.")
      return
    }

    const initializeMap = async () => {
      try {
        // Dynamically import mapbox-gl to avoid SSR issues
        const mapboxgl = await import("mapbox-gl")
        await import("mapbox-gl/dist/mapbox-gl.css")

        mapboxgl.accessToken = apiKey

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style:
            style === "satellite"
              ? "mapbox://styles/mapbox/satellite-streets-v12"
              : style === "light"
                ? "mapbox://styles/mapbox/light-v11"
                : "mapbox://styles/mapbox/dark-v11",
          center: center,
          zoom: zoom,
        })

        map.current.on("load", () => {
          setLoaded(true)
          setError(null)
        })

        map.current.on("error", (e: any) => {
          console.error("Mapbox error:", e)
          setError("Failed to load Mapbox map. Please check your API key and internet connection.")
        })

        map.current.on("move", () => {
          if (!map.current) return
          const center = map.current.getCenter()
          setCenter([center.lng, center.lat])
          setZoom(map.current.getZoom())
        })
      } catch (err) {
        console.error("Error initializing Mapbox:", err)
        setError("Failed to initialize Mapbox. Please check your API key.")
      }
    }

    initializeMap()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [apiKey])

  // Update map style when style changes
  useEffect(() => {
    if (!map.current || !loaded || error) return

    try {
      map.current.setStyle(
        style === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : style === "light"
            ? "mapbox://styles/mapbox/light-v11"
            : "mapbox://styles/mapbox/dark-v11",
      )
    } catch (err) {
      console.error("Error updating map style:", err)
    }
  }, [style, loaded, error])

  // Update markers when layers change
  useEffect(() => {
    if (!map.current || !loaded || error) return

    const updateMarkers = async () => {
      try {
        const mapboxgl = await import("mapbox-gl")

        // Clear existing markers
        Object.values(markers.current).forEach((marker) => marker.remove())
        markers.current = {}

        // Add event markers
        if (layers.includes("conflicts")) {
          sampleEvents.forEach((event) => {
            const el = document.createElement("div")
            el.className = "w-3 h-3 rounded-full cursor-pointer"

            if (event.type === "conflict") {
              el.style.backgroundColor = "rgba(239, 68, 68, 0.8)"
            } else if (event.type === "protest") {
              el.style.backgroundColor = "rgba(245, 158, 11, 0.8)"
            } else {
              el.style.backgroundColor = "rgba(59, 130, 246, 0.8)"
            }

            el.style.border = "1px solid rgba(255, 255, 255, 0.8)"

            const marker = new mapboxgl.Marker(el).setLngLat([event.lng, event.lat]).addTo(map.current!)

            marker.getElement().addEventListener("click", () => {
              setSelectedItem({ type: "event", ...event })
            })

            markers.current[`event-${event.id}`] = marker
          })
        }

        // Add aircraft markers
        if (layers.includes("aircraft")) {
          sampleAircraft.forEach((aircraft) => {
            const el = document.createElement("div")
            el.className = "w-3 h-3 cursor-pointer"
            el.style.backgroundColor = "rgba(59, 130, 246, 0.8)"
            el.style.border = "1px solid rgba(255, 255, 255, 0.8)"
            el.style.transform = `rotate(${aircraft.heading}deg)`

            const marker = new mapboxgl.Marker(el).setLngLat([aircraft.lng, aircraft.lat]).addTo(map.current!)

            marker.getElement().addEventListener("click", () => {
              setSelectedItem({ type: "aircraft", ...aircraft })
            })

            markers.current[`aircraft-${aircraft.id}`] = marker
          })
        }

        // Add vessel markers
        if (layers.includes("vessels")) {
          sampleVessels.forEach((vessel) => {
            const el = document.createElement("div")
            el.className = "w-3 h-3 cursor-pointer"
            el.style.backgroundColor = "rgba(16, 185, 129, 0.8)"
            el.style.border = "1px solid rgba(255, 255, 255, 0.8)"

            const marker = new mapboxgl.Marker(el).setLngLat([vessel.lng, vessel.lat]).addTo(map.current!)

            marker.getElement().addEventListener("click", () => {
              setSelectedItem({ type: "vessel", ...vessel })
            })

            markers.current[`vessel-${vessel.id}`] = marker
          })
        }
      } catch (err) {
        console.error("Error updating markers:", err)
      }
    }

    updateMarkers()
  }, [layers, loaded, error, setSelectedItem])

  // Show error state if API key is missing or there's an error
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Mapbox Configuration Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="text-xs text-muted-foreground">
            <p>To fix this issue:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Get a Mapbox API key from mapbox.com</li>
              <li>Add it as NEXT_PUBLIC_MAPBOX_API_KEY environment variable</li>
              <li>Refresh the page</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full" />
}
