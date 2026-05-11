export interface Problem {
  type: string
  title: string
  status: number
  detail: string
  traceId: string
}

export interface SignalRCallback {
  name: string
  handle: (message: unknown | undefined) => void
}

export interface DataWithContriution<T> {
  data: T | null
  contribution: ContributionResponse
}
