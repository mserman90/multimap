"use client"

import { useState } from "react"
import { AlertTriangle, Plane, Ship, Cloud, BarChart, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { EventsTab } from "./tabs/events-tab"
import { AircraftTab } from "./tabs/aircraft-tab"
import { VesselsTab } from "./tabs/vessels-tab"
import { WeatherTab } from "./tabs/weather-tab"
import { AnalyticsTab } from "./tabs/analytics-tab"

export function BottomPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("events")

  if (isCollapsed) {
    return (
      <div className="h-10 bg-card border-t flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(false)} className="flex items-center gap-1">
          <ChevronUp className="h-4 w-4" />
          <span>Show Panel</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="h-64 bg-card border-t flex flex-col">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="events" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="aircraft" className="flex items-center gap-1">
              <Plane className="h-4 w-4" />
              <span>Aircraft</span>
            </TabsTrigger>
            <TabsTrigger value="vessels" className="flex items-center gap-1">
              <Ship className="h-4 w-4" />
              <span>Vessels</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center gap-1">
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="events" className="m-0 h-full">
              <EventsTab />
            </TabsContent>
            <TabsContent value="aircraft" className="m-0 h-full">
              <AircraftTab />
            </TabsContent>
            <TabsContent value="vessels" className="m-0 h-full">
              <VesselsTab />
            </TabsContent>
            <TabsContent value="weather" className="m-0 h-full">
              <WeatherTab />
            </TabsContent>
            <TabsContent value="analytics" className="m-0 h-full">
              <AnalyticsTab />
            </TabsContent>
          </div>
        </Tabs>
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(true)} className="ml-2">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
