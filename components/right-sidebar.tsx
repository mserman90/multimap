"use client"

import { useState, useEffect } from "react"
import { useMap } from "./map-provider"
import { X, RefreshCw, Bell, Share, Download, Plane, Ship } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function RightSidebar() {
  const { selectedItem, setSelectedItem } = useMap()
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (selectedItem) {
      fetchNews()
    }
  }, [selectedItem])

  const fetchNews = async () => {
    if (!selectedItem) return

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock news data
      const mockNews = [
        {
          id: 1,
          title: "Artillery exchanges intensify in Eastern Ukraine",
          description:
            "Heavy fighting reported as artillery exchanges continue in the Kharkiv region of Eastern Ukraine.",
          source: "Reuters",
          time: "2h ago",
          url: "#",
        },
        {
          id: 2,
          title: "Civilian evacuations underway in conflict zone",
          description:
            "Local authorities have begun evacuating civilians from areas affected by recent military activities.",
          source: "Associated Press",
          time: "4h ago",
          url: "#",
        },
        {
          id: 3,
          title: "International response to escalating conflict",
          description: "World leaders call for immediate ceasefire as situation deteriorates in Eastern Ukraine.",
          source: "BBC",
          time: "6h ago",
          url: "#",
        },
      ]

      setNews(mockNews)
    } catch (error) {
      console.error("Failed to fetch news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (collapsed) {
    return (
      <div className="w-10 border-l bg-card flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)}>
          <Share className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  if (!selectedItem) {
    return (
      <aside className="w-80 border-l bg-card flex flex-col overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-sm font-medium">DETAILS</h3>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground p-4 text-center">
          <p>Select an item on the map to view details</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-80 border-l bg-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">
            {selectedItem.type === "event"
              ? "EVENT DETAILS"
              : selectedItem.type === "aircraft"
                ? "AIRCRAFT DETAILS"
                : selectedItem.type === "vessel"
                  ? "VESSEL DETAILS"
                  : "WEATHER DETAILS"}
          </h3>
          <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Item Card */}
        <Card className="p-3 mb-4">
          {selectedItem.type === "event" && (
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full 
                ${
                  selectedItem.type === "conflict"
                    ? "bg-red-500/20 text-red-500"
                    : selectedItem.type === "protest"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-blue-500/20 text-blue-500"
                }`}
              >
                <selectedItem.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{selectedItem.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded
                    ${
                      selectedItem.priority === "high"
                        ? "bg-red-900/50 text-red-100"
                        : selectedItem.priority === "medium"
                          ? "bg-yellow-900/50 text-yellow-100"
                          : "bg-blue-900/50 text-blue-100"
                    }`}
                  >
                    {selectedItem.priority.charAt(0).toUpperCase() + selectedItem.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedItem.type === "aircraft" && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-500">
                <Plane className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{selectedItem.callsign}</h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.type}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-900/50 text-blue-100 px-1.5 py-0.5 rounded">
                    {selectedItem.route}
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedItem.type === "vessel" && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500/20 rounded-full text-green-500">
                <Ship className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{selectedItem.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.type}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-green-900/50 text-green-100 px-1.5 py-0.5 rounded">
                    {selectedItem.flag}
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedItem.type === "weather" && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500/20 rounded-full text-yellow-500">
                <selectedItem.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{selectedItem.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.location}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded
                    ${selectedItem.severity === "Alert" ? "bg-red-900/50 text-red-100" : "bg-yellow-900/50 text-yellow-100"}`}
                  >
                    {selectedItem.severity}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">LOCATION</label>
            <p className="text-sm">
              {selectedItem.type === "event"
                ? "Kharkiv Oblast, Ukraine"
                : selectedItem.type === "aircraft"
                  ? "Over Atlantic Ocean"
                  : selectedItem.type === "vessel"
                    ? "Suez Canal, Egypt"
                    : selectedItem.location}
            </p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">COORDINATES</label>
            <p className="text-sm">
              {selectedItem.lat.toFixed(4)}° N, {selectedItem.lng.toFixed(4)}° E
            </p>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">REPORTED</label>
            <p className="text-sm">May 23, 2025 - 15:42 UTC</p>
          </div>
          {selectedItem.type === "event" && (
            <div>
              <label className="text-xs text-muted-foreground block mb-1">SOURCE</label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Reuters</span>
                <span className="text-xs bg-green-900/50 text-green-100 px-1.5 py-0.5 rounded">Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related News */}
      <div className="p-4 border-b flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-muted-foreground">RELATED NEWS</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={fetchNews}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Loading news...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <Card key={item.id} className="p-3">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {item.source} • {item.time}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Read More
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t">
        <div className="flex flex-col gap-2">
          <Button className="w-full flex items-center justify-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Set Alert for This Area</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
