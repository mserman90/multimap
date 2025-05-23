import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, this would call the ADS-B Exchange API
  // const apiKey = process.env.ADSBEXCHANGE_API_KEY

  // Sample aircraft data
  const aircraft = [
    {
      id: 1,
      callsign: "BA294",
      type: "Boeing 777-300ER",
      route: "LHR → ORD",
      status: "In Flight",
      speed: 520,
      altitude: 38000,
      lat: 51.47,
      lng: -0.4543,
    },
    {
      id: 2,
      callsign: "EK203",
      type: "Airbus A380-800",
      route: "DXB → JFK",
      status: "In Flight",
      speed: 495,
      altitude: 41000,
      lat: 25.2532,
      lng: 55.3657,
    },
    {
      id: 3,
      callsign: "SQ321",
      type: "Boeing 787-10",
      route: "SIN → LHR",
      status: "In Flight",
      speed: 510,
      altitude: 39000,
      lat: 1.3644,
      lng: 103.9915,
    },
    {
      id: 4,
      callsign: "AF123",
      type: "Airbus A350-900",
      route: "CDG → LAX",
      status: "Scheduled",
      departure: "45m",
      lat: 49.0097,
      lng: 2.5479,
    },
  ]

  return NextResponse.json(aircraft)
}
