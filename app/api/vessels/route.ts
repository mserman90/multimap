import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, this would call the VesselFinder API
  // const apiKey = process.env.VESSEL_API_KEY

  // Sample vessel data
  const vessels = [
    {
      id: 1,
      name: "EVER GIVEN",
      type: "Container Ship",
      flag: "Panama",
      status: "Underway",
      speed: 18.5,
      heading: 125,
      lat: 29.9511,
      lng: 32.5503,
    },
    {
      id: 2,
      name: "MAERSK SELETAR",
      type: "Container Ship",
      flag: "Singapore",
      status: "Underway",
      speed: 16.2,
      heading: 278,
      lat: 51.9225,
      lng: 4.4792,
    },
    {
      id: 3,
      name: "SYMPHONY OF THE SEAS",
      type: "Passenger Ship",
      flag: "Bahamas",
      status: "Underway",
      speed: 21.4,
      heading: 185,
      lat: 25.7617,
      lng: -80.1918,
    },
    {
      id: 4,
      name: "PIONEER SPIRIT",
      type: "Oil Tanker",
      flag: "Liberia",
      status: "Anchored",
      location: "Port of Rotterdam",
      lat: 51.9496,
      lng: 4.1453,
    },
  ]

  return NextResponse.json(vessels)
}
