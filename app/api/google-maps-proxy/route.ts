import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key is not configured" }, { status: 500 })
  }

  // Return the configuration for the Google Maps
  return NextResponse.json({
    apiKey: apiKey,
    scriptUrl: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,places`,
  })
}
