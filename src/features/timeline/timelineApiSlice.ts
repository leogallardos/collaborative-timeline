import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GitAuthor {
  name: string
  email: string
  avatarUrl: string
}

interface Message {
  funFact: string
  favoriteEmoji: string
}

interface TimelineEntry {
  id: string
  commitHash: string
  timestamp: number
  author: GitAuthor
  gitCommitMessage: string
  message: Message
  rawMessage: string
}

interface TimelineData {
  entries: TimelineEntry[]
}

export const timelineApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://collaborative-timeline-data.web.app" }),
  reducerPath: "timelineApi",
  tagTypes: ["Timeline"],
  endpoints: build => ({
    getTimeline: build.query<TimelineData, void>({
      query: () => "/timeline.json",
    }),
  }),
})

export const { useGetTimelineQuery } = timelineApiSlice
