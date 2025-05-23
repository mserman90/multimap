import { NextResponse } from "next/server"

export async function GET() {
  // Sample events data
  const events = [
    {
      id: 1,
      lat: 48.9226,
      lng: 36.2803,
      type: "conflict",
      title: "Military Conflict",
      description: "Artillery exchanges reported near Kharkiv region, Ukraine. Multiple civilian casualties reported.",
      priority: "high",
      time: "2h ago",
    },
    {
      id: 2,
      lat: 33.8938,
      lng: 35.5018,
      type: "protest",
      title: "Political Protest",
      description: "Large demonstration in central Beirut against economic policies. Estimated 5,000 participants.",
      priority: "medium",
      time: "5h ago",
    },
    {
      id: 3,
      lat: 24.8949,
      lng: 91.8687,
      type: "disaster",
      title: "Natural Disaster",
      description:
        "Flooding in Bangladesh's Sylhet region. Over 200,000 people displaced, emergency services deployed.",
      priority: "high",
      time: "12h ago",
    },
  ]

  return NextResponse.json(events)
}
