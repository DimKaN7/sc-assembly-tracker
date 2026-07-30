export interface AssembliesResponse {
  assemblies: AssemblyResponse[]
  contributions: HasNextPageResponse<ContributionResponse>
}

export interface AssemblyResponse {
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

export interface ExtendedAssemblyResponse extends Omit<AssemblyResponse, 'contributorsCount'> {
  materials: MaterialResponse[]
  contributions: HasNextPageResponse<ContributionResponse>
}

export interface MaterialResponse {
  id: string
  name: string
  measure: string
  requiredCount: number
  actualCount: number
  progress: number
}

export interface NewContributionResponse {
  assemblyId: string
  materialId: string
  newAmount: number
  assemblyProgress: number
  materialProgress: number
  contributorsCount: number
}
