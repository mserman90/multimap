import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || "global"

  // In a real application, this would call one of the news APIs
  // const apiKey = process.env.NEWSAPI_KEY

  // Sample news data
  const news = [
    {
      id: 1,
      title: "Artillery exchanges intensify in Eastern Ukraine",
      description: "Heavy fighting reported as artillery exchanges continue in the Kharkiv region of Eastern Ukraine.",
      source: "Reuters",
      time: "2h ago",
      url: "#",
    },
    {
      id: 2,
      title: "Civilian evacuations underway in conflict zone",
      description:
        "Local authorities have begun evacuating civilians from areas affected by recent military activities.",
      source: "Associated Press",
      time: "4h ago",
      url: "#",
    },
    {
      id: 3,
      title: "International response to escalating conflict",
      description: "World leaders call for immediate ceasefire as situation deteriorates in Eastern Ukraine.",
      source: "BBC",
      time: "6h ago",
      url: "#",
    },
  ]

  return NextResponse.json(news)
}
