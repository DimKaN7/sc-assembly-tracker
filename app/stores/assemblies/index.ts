export const useAssembliesStore = defineStore('assemblies', () => {
  const assemblies = ref<Assembly[]>([])
  const contributions = ref<ContributionResponse[]>([])

  const getAssemblies = async (): Promise<void> => {
    const response = await performRequest<Assembly[]>('/assemblies')
    if (response) {
      assemblies.value = response
    }
  }

  const getContributions = async (type: 'get' | 'load' = 'get'): Promise<void> => {
    const response = await performRequest<ContributionResponse[]>('/assemblies/contributions')
    if (response) {
      contributions.value = type === 'get' ? response : [...contributions.value, ...response]
    }
  }

  return {
    assemblies,
    contributions,
    getAssemblies,
    getContributions,
  }
})
