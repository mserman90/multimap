import { Header } from "@/components/header"
import { LeftSidebar } from "@/components/left-sidebar"
import { MapContainer } from "@/components/map-container"
import { BottomPanel } from "@/components/bottom-panel"
import { RightSidebar } from "@/components/right-sidebar"
import { MapProvider } from "@/components/map-provider"

export default function Home() {
  return (
    <MapProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MapContainer />
            <BottomPanel />
          </div>
          <RightSidebar />
        </div>
      </div>
    </MapProvider>
  )
}
