import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const apiKey = process.env.YANDEX_MAPS_API_KEY || process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Yandex Maps API key is not configured" }, { status: 500 })
  }

  // Return the configuration for the Yandex map
  return NextResponse.json({
    apiKey: apiKey,
  })
}
