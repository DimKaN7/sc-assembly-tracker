export const useAssembliesStore = defineStore('assemblies', () => {
  const assemblies = ref<AssemblyResponse[]>([])
  const assembly = ref<ExtendedAssemblyResponse>()
  const contributions = ref<HasNextPageResponse<ContributionResponse>>()

  const materials = computed<MaterialResponse[]>(() => assembly.value?.materials ?? [])

  const getAssemblies = async (): Promise<void> => {
    const response = await performRequest<AssembliesResponse>('/assemblies')
    if (response) {
      assemblies.value = response.assemblies
      contributions.value = response.contributions
    }
  }

  const loadContributions = async (assemblyId: string | undefined, id: string): Promise<void> => {
    if (contributions.value?.hasNextPage) {
      const response = await performRequest<HasNextPageResponse<ContributionResponse>>(
        `/assemblies/contributions?id=${id}${assemblyId ? `&assemblyId=${assemblyId}` : ''}`,
      )
      if (response) {
        contributions.value = {
          data: [...contributions.value.data, ...response.data],
          hasNextPage: response.hasNextPage,
        }
      }
    }
  }

  const getAssembly = async (id: string): Promise<void> => {
    const response = await performRequest<ExtendedAssemblyResponse>(`/assemblies/${id}`)
    if (response) {
      assembly.value = response
      contributions.value = response.contributions
    }
  }

  const addMaterial = async (
    materialId: string,
    amount: number,
    stationId: string | undefined,
  ): Promise<void> => {
    if (assembly.value) {
      await performSimpleRequest(`/assemblies/${assembly.value.id}`, {
        method: 'PATCH',
        body: {
          materialId,
          amount,
          stationId,
        },
      })
    }
  }

  const deleteContribution = async (contributionId: string): Promise<void> => {
    if (assembly.value) {
      await performSimpleRequest(`/assemblies/${assembly.value.id}/${contributionId}`, {
        method: 'DELETE',
      })
    }
  }

  const editContribution = async (
    contributionId: string,
    amount: number,
    stationId: string | undefined,
  ): Promise<void> => {
    if (assembly.value) {
      await performSimpleRequest(`/assemblies/${assembly.value.id}/${contributionId}`, {
        method: 'PATCH',
        body: {
          amount,
          stationId,
        },
      })
    }
  }

  const clear = (): void => {
    assemblies.value = []
    assembly.value = undefined
    contributions.value = undefined
  }

  return {
    assemblies,
    assembly,
    contributions,
    materials,
    getAssemblies,
    loadContributions,
    getAssembly,
    addMaterial,
    deleteContribution,
    editContribution,
    clear,
  }
})
