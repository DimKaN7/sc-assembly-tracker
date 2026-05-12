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

  const loadContributions = async (assemblyId: string | undefined, time: number): Promise<void> => {
    if (contributions.value?.hasNextPage) {
      const response = await performRequest<HasNextPageResponse<ContributionResponse>>(
        `/assemblies/contributions?time=${time}${assemblyId ? `&assemblyId=${assemblyId}` : ''}`,
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

  const addMaterial = async (materialId: string, amount: number): Promise<void> => {
    if (assembly.value) {
      await performSimpleRequest(`/assemblies/${assembly.value.id}`, {
        method: 'PATCH',
        body: {
          materialId,
          amount,
        },
      })
    }
  }

  const onContributionMessage = (
    message: DataWithContriution<NewContributionResponse> | undefined,
  ) => {
    if (message) {
      if (message.data) {
        if (assembly.value) {
          if (assembly.value.id === message.data.assemblyId) {
            const material = assembly.value.materials.find((m) => m.id === message.data!.materialId)
            if (material) {
              material.actualCount = message.data.newCount
              material.progress = message.data.materialProgress
            }
            assembly.value.progress = message.data.assemblyProgress
            if (contributions.value) {
              contributions.value.data = [message.contribution, ...contributions.value.data]
            }
          }
        } else {
          const a = assemblies.value.find((a) => a.id === message.data?.assemblyId)
          if (a) {
            a.progress = message.data.assemblyProgress
            a.contributorsCount = message.data.contributorsCount
          }
          if (contributions.value) {
            contributions.value.data = [message.contribution, ...contributions.value.data]
          }
        }
      }
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
    onContributionMessage,
    clear,
  }
})
