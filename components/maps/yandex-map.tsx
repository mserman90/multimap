"use client"

import { useState, useEffect, useRef } from "react"
import { useMap } from "../map-provider"
import Script from "next/script"
import { AlertCircle } from "lucide-react"

export function YandexMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const { center, zoom, style } = useMap()
  const mapRef = useRef<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch API key from server
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/yandex-proxy")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load Yandex Maps configuration")
        }

        const data = await response.json()
        setApiKey(data.apiKey)
        setError(null)
      } catch (err) {
        console.error("Error fetching Yandex Maps API key:", err)
        setError(err instanceof Error ? err.message : "Failed to load Yandex Maps API key")
        setLoading(false)
      }
    }

    fetchApiKey()
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !window.ymaps || !mapContainer.current || !apiKey) return

    const initMap = () => {
      try {
        window.ymaps.ready(() => {
          if (mapRef.current) {
            mapRef.current.destroy()
          }

          mapRef.current = new window.ymaps.Map(mapContainer.current, {
            center: [center[1], center[0]],
            zoom: zoom,
            type: style === "satellite" ? "yandex#satellite" : "yandex#map",
          })

          setLoading(false)
          setError(null)
        })
      } catch (err) {
        console.error("Error initializing Yandex map:", err)
        setError("Failed to initialize Yandex map")
        setLoading(false)
      }
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
    }
  }, [center, zoom, style, scriptLoaded, apiKey])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Yandex Maps Error</h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <div className="text-xs text-muted-foreground">
            <p>To fix this issue:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Make sure the YANDEX_MAPS_API_KEY environment variable is set on the server</li>
              <li>Check your internet connection</li>
              <li>Try refreshing the page or selecting a different map provider</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (loading && !apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading Yandex Maps configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {apiKey && (
        <Script
          src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=en_US`}
          onLoad={() => setScriptLoaded(true)}
          onError={() => {
            setError("Failed to load Yandex Maps script")
            setLoading(false)
          }}
        />
      )}
      <div ref={mapContainer} className="w-full h-full">
        {loading && scriptLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Initializing Yandex map...</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
