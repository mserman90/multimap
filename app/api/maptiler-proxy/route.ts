import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const styleType = searchParams.get("style") || "dark"
  const apiKey = process.env.MAPTILER_API_KEY || process.env.NEXT_PUBLIC_MAPTILER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "MapTiler API key is not configured" }, { status: 500 })
  }

  // Map style type to the correct style URL
  let styleName: string
  switch (styleType) {
    case "satellite":
      styleName = "hybrid"
      break
    case "light":
      styleName = "streets"
      break
    default:
      styleName = "darkmatter"
  }

  // Return the configuration for the MapTiler map
  return NextResponse.json({
    styleUrl: `https://api.maptiler.com/maps/${styleName}/style.json?key=${apiKey}`,
  })
}
