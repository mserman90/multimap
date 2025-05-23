import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const style = searchParams.get("style") || "main"
  const apiKey = process.env.TOMTOM_API_KEY || process.env.NEXT_PUBLIC_TOMTOM_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "TomTom API key is not configured" }, { status: 500 })
  }

  // Return the configuration for the TomTom map
  return NextResponse.json({
    key: apiKey,
    styleUrl: `https://api.tomtom.com/map/1/style/${style}?key=${apiKey}`,
  })
}
