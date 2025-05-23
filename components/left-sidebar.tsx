"use client"

import { useState } from "react"
import { useMap } from "./map-provider"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export function LeftSidebar() {
  const { layers, toggleLayer, style, setStyle } = useMap()
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <div className="w-10 border-r bg-card flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)} className="mb-4">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <aside className="w-64 border-r bg-card flex flex-col overflow-hidden">
      <div className="flex justify-end p-2">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Data Sources */}
      <div className="p-4 border-b">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">DATA SOURCES</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="conflicts"
                checked={layers.includes("conflicts")}
                onCheckedChange={() => toggleLayer("conflicts")}
              />
              <Label htmlFor="conflicts">Conflicts & Events</Label>
            </div>
            <div className="text-green-500">●</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="aircraft"
                checked={layers.includes("aircraft")}
                onCheckedChange={() => toggleLayer("aircraft")}
              />
              <Label htmlFor="aircraft">Aircraft Tracking</Label>
            </div>
            <div className="text-green-500">●</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vessels"
                checked={layers.includes("vessels")}
                onCheckedChange={() => toggleLayer("vessels")}
              />
              <Label htmlFor="vessels">Maritime Vessels</Label>
            </div>
            <div className="text-green-500">●</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="weather"
                checked={layers.includes("weather")}
                onCheckedChange={() => toggleLayer("weather")}
              />
              <Label htmlFor="weather">Weather Conditions</Label>
            </div>
            <div className="text-yellow-500">●</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="traffic"
                checked={layers.includes("traffic")}
                onCheckedChange={() => toggleLayer("traffic")}
              />
              <Label htmlFor="traffic">Traffic Data</Label>
            </div>
            <div className="text-red-500">●</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">FILTERS</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-xs mb-1.5 block">Event Type</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="military">Military Conflict</SelectItem>
                <SelectItem value="civil">Civil Unrest</SelectItem>
                <SelectItem value="terrorism">Terrorism</SelectItem>
                <SelectItem value="natural">Natural Disaster</SelectItem>
                <SelectItem value="political">Political Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs mb-1.5 block">Time Range</Label>
            <Select defaultValue="24h">
              <SelectTrigger>
                <SelectValue placeholder="Last 24 Hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs mb-1.5 block">Region</Label>
            <Select defaultValue="global">
              <SelectTrigger>
                <SelectValue placeholder="Global" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="middle-east">Middle East</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs mb-1.5 block">Source Reliability</Label>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Low</span>
              <Slider defaultValue={[3]} max={5} step={1} className="w-[60%] mx-2" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Layers */}
      <div className="p-4 border-b">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">MAP LAYERS</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="satellite">Satellite View</Label>
            <Switch
              id="satellite"
              checked={style === "satellite"}
              onCheckedChange={(checked) => setStyle(checked ? "satellite" : "dark")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={style === "dark" || style === "satellite"}
              onCheckedChange={(checked) => setStyle(checked ? "dark" : "light")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="traffic-layer">Traffic Layer</Label>
            <Switch
              id="traffic-layer"
              checked={layers.includes("traffic")}
              onCheckedChange={() => toggleLayer("traffic")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weather-layer">Weather Layer</Label>
            <Switch
              id="weather-layer"
              checked={layers.includes("weather")}
              onCheckedChange={() => toggleLayer("weather")}
            />
          </div>

          <div>
            <Label className="text-xs mb-1.5 block">Layer Opacity</Label>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">0%</span>
              <Slider defaultValue={[70]} max={100} step={1} className="w-[60%] mx-2" />
              <span className="text-xs text-muted-foreground">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="p-4 mt-auto border-t">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">API STATUS</h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">MapBox</span>
              <span className="text-xs text-green-400">Online</span>
            </div>
            <Progress value={25} className="h-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">ADS-B Exchange</span>
              <span className="text-xs text-green-400">Online</span>
            </div>
            <Progress value={42} className="h-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">VesselFinder</span>
              <span className="text-xs text-green-400">Online</span>
            </div>
            <Progress value={18} className="h-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">NewsAPI</span>
              <span className="text-xs text-yellow-400">Limited</span>
            </div>
            <Progress value={78} className="h-1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">TomTom Traffic</span>
              <span className="text-xs text-red-400">Offline</span>
            </div>
            <Progress value={0} className="h-1" />
          </div>
        </div>
      </div>
    </aside>
  )
}
