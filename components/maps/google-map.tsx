"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "../map-provider"
import { AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Declare global google types
declare global {
  interface Window {
    google: any
    gm_authFailure: () => void
  }
}

export function GoogleMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markers = useRef<any[]>([])
  const { center, zoom, style, layers, setSelectedItem } = useMap()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiConfig, setApiConfig] = useState<any>(null)

  // Fetch API configuration from server
  useEffect(() => {
    const fetchApiConfig = async () => {
      try {
        const response = await fetch("/api/google-maps-proxy")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load Google Maps configuration")
        }

        const config = await response.json()
        setApiConfig(config)
        setError(null)
      } catch (err) {
        console.error("Error fetching Google Maps API config:", err)
        setError(err instanceof Error ? err.message : "Failed to load Google Maps API configuration")
        setLoading(false)
      }
    }

    fetchApiConfig()
  }, [])

  useEffect(() => {
    if (!apiConfig) return

    // Set up global error handler for Google Maps authentication failures
    window.gm_authFailure = () => {
      setError(
        "Google Maps authentication failed. This is likely due to API key restrictions. Please check your Google Cloud Console settings.",
      )
      setLoading(false)
    }

    const loadGoogleMaps = async () => {
      try {
        setLoading(true)

        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          initializeMap()
          return
        }

        // Load Google Maps script
        const script = document.createElement("script")
        script.src = apiConfig.scriptUrl
        script.async = true
        script.defer = true

        script.onload = () => {
          initializeMap()
        }

        script.onerror = () => {
          setError("Failed to load Google Maps script. Please check your internet connection.")
          setLoading(false)
        }

        document.head.appendChild(script)

        return () => {
          document.head.removeChild(script)
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Failed to initialize Google Maps")
        setLoading(false)
      }
    }

    const initializeMap = () => {
      if (!mapContainer.current || !window.google) return

      try {
        map.current = new window.google.maps.Map(mapContainer.current, {
          center: { lat: center[1], lng: center[0] },
          zoom: zoom,
          mapTypeId: style === "satellite" ? "satellite" : "roadmap",
          styles:
            style === "dark"
              ? [
                  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#263c3f" }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#6b9a76" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{ color: "#38414e" }],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#212a37" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9ca5b3" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#746855" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#1f2835" }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#f3d19c" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#2f3948" }],
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#d59563" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#17263c" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#515c6d" }],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#17263c" }],
                  },
                ]
              : [],
        })

        // Add sample markers
        addMarkers()

        setLoading(false)
        setError(null)
      } catch (err) {
        console.error("Error initializing Google Maps:", err)
        setError("Failed to initialize Google Maps. Please try refreshing the page.")
        setLoading(false)
      }
    }

    const addMarkers = () => {
      if (!map.current || !window.google) return

      // Clear existing markers
      markers.current.forEach((marker) => marker.setMap(null))
      markers.current = []

      // Add conflict markers
      if (layers.includes("conflicts")) {
        const marker = new window.google.maps.Marker({
          position: { lat: 48.9226, lng: 36.2803 },
          map: map.current,
          title: "Military Conflict",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#ef4444",
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 6,
          },
        })

        marker.addListener("click", () => {
          setSelectedItem({
            type: "event",
            id: 1,
            lat: 48.9226,
            lng: 36.2803,
            eventType: "conflict",
            title: "Military Conflict",
            description: "Artillery exchanges reported near Kharkiv region, Ukraine.",
          })
        })

        markers.current.push(marker)
      }

      // Add aircraft markers
      if (layers.includes("aircraft")) {
        const aircraftMarker = new window.google.maps.Marker({
          position: { lat: 51.47, lng: -0.4543 },
          map: map.current,
          title: "BA294",
          icon: {
            path: "M 0,-2 L -1.5,4 L 0,3 L 1.5,4 Z",
            fillColor: "#3b82f6",
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 3,
            rotation: 280,
          },
        })

        aircraftMarker.addListener("click", () => {
          setSelectedItem({
            type: "aircraft",
            id: 1,
            lat: 51.47,
            lng: -0.4543,
            callsign: "BA294",
            heading: 280,
            altitude: 38000,
            speed: 520,
          })
        })

        markers.current.push(aircraftMarker)
      }

      // Add vessel markers
      if (layers.includes("vessels")) {
        const vesselMarker = new window.google.maps.Marker({
          position: { lat: 29.9511, lng: 32.5503 },
          map: map.current,
          title: "EVER GIVEN",
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#10b981",
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 6,
          },
        })

        vesselMarker.addListener("click", () => {
          setSelectedItem({
            type: "vessel",
            id: 1,
            lat: 29.9511,
            lng: 32.5503,
            name: "EVER GIVEN",
            heading: 125,
            speed: 18.5,
          })
        })

        markers.current.push(vesselMarker)
      }
    }

    loadGoogleMaps()

    return () => {
      markers.current.forEach((marker) => marker.setMap(null))
      markers.current = []
    }
  }, [apiConfig, center, zoom, style, layers, setSelectedItem])

  if (error) {
    const isReferrerError = error.includes("authentication") || error.includes("RefererNotAllowedMapError")

    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Google Maps Configuration Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="text-xs text-muted-foreground">
            {isReferrerError ? (
              <div>
                <p className="mb-2">To fix this referrer restriction issue:</p>
                <ol className="list-decimal list-inside space-y-1 mb-4">
                  <li>Go to the Google Cloud Console</li>
                  <li>Navigate to APIs & Services → Credentials</li>
                  <li>Edit your Maps JavaScript API key</li>
                  <li>Add this domain to HTTP referrers: {window.location.hostname}</li>
                  <li>Or remove referrer restrictions for testing</li>
                </ol>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://console.cloud.google.com/apis/credentials", "_blank")}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open Google Cloud Console
                </Button>
              </div>
            ) : (
              <div>
                <p>To fix this issue:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Get a Google Maps API key from Google Cloud Console</li>
                  <li>Add it as GOOGLE_MAPS_API_KEY environment variable</li>
                  <li>Enable the Maps JavaScript API</li>
                  <li>Refresh the page</li>
                </ol>
              </div>
            )}
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
          <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className="w-full h-full" />
}
