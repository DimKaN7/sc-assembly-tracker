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

export interface TitleValue<T> {
  title: string
  value: T
}

export type SSECallbacks = Map<string, (data: unknown | undefined) => void>

export type SidebarItem = {
  to: string
  title: string
  icon: string
  selectedRoutesNames?: string[]
  selectedRoutesPaths?: string[]
}

export type AssemblyType = 'all' | 'public' | 'private'
