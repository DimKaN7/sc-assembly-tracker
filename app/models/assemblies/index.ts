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

export interface ExtendedAssemblyResponse extends Omit<Assembly, 'contributorsCount'> {
  materials: MaterialResponse[]
  contributions: ContributionResponse[]
}

export interface MaterialResponse {
  id: string
  name: string
  measure: string
  requiredCount: number
  actualCount: number
  progress: number
}
