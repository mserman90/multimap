import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, this would call the OpenWeatherMap API
  // const apiKey = process.env.OPENWEATHERMAP_API_KEY

  // Sample weather data
  const weatherEvents = [
    {
      id: 1,
      type: "rain",
      title: "Heavy Rainfall",
      location: "Mumbai, India",
      status: "Ongoing",
      severity: "Warning",
      details: "120mm in 24h",
      lat: 19.076,
      lng: 72.8777,
    },
    {
      id: 2,
      type: "hurricane",
      title: "Hurricane Emily",
      location: "Atlantic Ocean",
      status: "Category 3",
      severity: "Alert",
      details: "185 km/h winds",
      lat: 25.7617,
      lng: -70.1918,
    },
    {
      id: 3,
      type: "fire",
      title: "Wildfire",
      location: "California, USA",
      status: "Spreading",
      severity: "Alert",
      details: "8,500 acres affected",
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      id: 4,
      type: "earthquake",
      title: "Earthquake",
      location: "Tokyo, Japan",
      status: "2h ago",
      severity: "Warning",
      details: "Magnitude 5.8",
      lat: 35.6762,
      lng: 139.6503,
    },
  ]

  return NextResponse.json(weatherEvents)
}
