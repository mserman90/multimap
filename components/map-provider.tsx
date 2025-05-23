"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type MapProvider = "mapbox" | "maptiler" | "tomtom" | "google" | "yandex"
type MapStyle = "streets" | "satellite" | "dark" | "light"
type DataLayer = "conflicts" | "aircraft" | "vessels" | "weather" | "traffic" | "news"

interface MapContextType {
  provider: MapProvider
  setProvider: (provider: MapProvider) => void
  style: MapStyle
  setStyle: (style: MapStyle) => void
  layers: DataLayer[]
  toggleLayer: (layer: DataLayer) => void
  center: [number, number]
  setCenter: (center: [number, number]) => void
  zoom: number
  setZoom: (zoom: number) => void
  selectedItem: any | null
  setSelectedItem: (item: any | null) => void
}

const MapContext = createContext<MapContextType | undefined>(undefined)

export function MapProvider({ children }: { children: React.ReactNode }) {
  // Default to mapbox if available, otherwise try other providers
  const getDefaultProvider = (): MapProvider => {
    if (typeof window !== "undefined") {
      // Client-side only code
      if (process.env.NEXT_PUBLIC_MAPBOX_API_KEY) return "mapbox"
      if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return "google"
    }

    // These providers use server-side API keys
    return "tomtom"
  }

  const [provider, setProvider] = useState<MapProvider>(getDefaultProvider())
  const [style, setStyle] = useState<MapStyle>("dark")
  const [layers, setLayers] = useState<DataLayer[]>(["conflicts", "aircraft", "vessels"])
  const [center, setCenter] = useState<[number, number]>([0, 30])
  const [zoom, setZoom] = useState(2)
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  const toggleLayer = (layer: DataLayer) => {
    setLayers((prev) => (prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]))
  }

  return (
    <MapContext.Provider
      value={{
        provider,
        setProvider,
        style,
        setStyle,
        layers,
        toggleLayer,
        center,
        setCenter,
        zoom,
        setZoom,
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export function useMap() {
  const context = useContext(MapContext)
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider")
  }
  return context
}
