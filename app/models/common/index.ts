export interface Problem {
  type: string
  title: string
  status: number
  detail: string
  traceId: string
}

export interface SSEEvent<T> {
  type: string
  data: T | undefined
}

export interface DataWithContribution<T> {
  data: T | null
  contribution: ContributionResponse
}

export interface HasNextPageResponse<T> {
  data: T[]
  hasNextPage: boolean
}
