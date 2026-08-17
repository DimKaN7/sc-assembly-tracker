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
  contributions: MaterialContributionResponse[]
}

export interface NewContributionResponse extends Omit<DeletedContributionResponse, 'Id'> {
  contributorId: string
  addedAmount: number
  contributorUsername: string
  station?: TitleValue<string>
}

export interface DeletedContributionResponse {
  id: string
  assemblyId: string
  materialId: string
  newAmount: number
  assemblyProgress: number
  materialProgress: number
  contributorsCount: number
}

export interface UpdatedContributionResponse extends DeletedContributionResponse {
  station?: TitleValue<string>
  newMaterialAmount: number
}

export interface MaterialContributionResponse {
  id: string
  userId: string
  username: string
  amount: number
  station?: TitleValue<string>
  addedAt: number
}
