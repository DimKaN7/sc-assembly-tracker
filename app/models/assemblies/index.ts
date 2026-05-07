export interface Assembly {
  id: string
  name: string
  description: string
  progress: number
  contributorsCount: number
}

export interface ContributionResponse {
  id: string
  username: string
  assemblyName: string
  amount: number
  material: string
  measure: string
  contributedAt: number
}
