export const useAssembliesStore = defineStore('assemblies', () => {
  const assemblies = ref<Assembly[]>([])
  const assembly = ref<ExtendedAssemblyResponse>()
  const contributions = ref<ContributionResponse[]>([])

  const materials = computed<MaterialResponse[]>(() => assembly.value?.materials ?? [])

  const getAssemblies = async (): Promise<void> => {
    const response = await performRequest<Assembly[]>('/assemblies')
    if (response) {
      assemblies.value = response
    }
  }

  const getContributions = async (
    assemblyId?: string,
    type: 'get' | 'load' = 'get',
  ): Promise<void> => {
    const response = await performRequest<ContributionResponse[]>(
      `/assemblies/contributions${assemblyId ? `?id=${assemblyId}` : ''}`,
    )
    if (response) {
      contributions.value = type === 'get' ? response : [...contributions.value, ...response]
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

  return {
    assemblies,
    assembly,
    contributions,
    materials,
    getAssemblies,
    getContributions,
    getAssembly,
    addMaterial,
  }
})
