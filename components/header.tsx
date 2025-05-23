"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, Settings, LogIn } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">GlobalTracker</h1>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">BETA</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search locations, events..." className="w-64 pl-8 bg-background/50" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button size="sm">
              <LogIn className="h-4 w-4 mr-2 md:hidden" />
              <span className="hidden md:inline">Sign In</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
