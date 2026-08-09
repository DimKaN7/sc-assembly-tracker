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

  const deleteContribution = async (contributionId: string): Promise<void> => {
    if (assembly.value) {
      await performSimpleRequest(`/assemblies/${assembly.value.id}/${contributionId}`, {
        method: 'DELETE',
      })
    }
  }

  const onContributionMessage = (
    message: DataWithContribution<NewContributionResponse> | undefined,
  ) => {
    if (message?.data) {
      const data = message.data
      const contribution = message.contribution
      if (assembly.value) {
        // если открыта сборка - правим все внутри нее
        if (assembly.value.id === data.assemblyId) {
          const material = assembly.value.materials.find((m) => m.id === data.materialId)
          if (material) {
            material.actualCount = data.newAmount
            material.progress = data.materialProgress
            const materialContribution = material.contributions.find(
              (c) => c.id === contribution.id,
            )
            if (materialContribution) {
              materialContribution.amount += data.addedAmount
            } else {
              material.contributions = [
                {
                  id: contribution.id,
                  amount: data.addedAmount,
                  userId: data.contributorId,
                  username: data.contributorUsername,
                  station: undefined,
                  addedAt: contribution.contributedAt,
                },
                ...material.contributions,
              ]
            }
          }
          assembly.value.progress = data.assemblyProgress
          if (contributions.value) {
            contributions.value.data = [contribution, ...contributions.value.data]
          }
        }
      } else {
        // иначе только прогресс, количество взносчиков и сами взносы
        const a = assemblies.value.find((a) => a.id === data.assemblyId)
        if (a) {
          a.progress = data.assemblyProgress
          a.contributorsCount = data.contributorsCount
        }
        if (contributions.value) {
          contributions.value.data = [contribution, ...contributions.value.data]
        }
      }
    }
  }

  const onDeleteContributionMessage = (message: DeletedContributionResponse | undefined) => {
    if (message) {
      if (assembly.value && assembly.value.id === message.assemblyId) {
        const material = assembly.value.materials.find((m) => m.id === message.materialId)
        if (material) {
          material.actualCount = message.newAmount
          material.progress = message.materialProgress

          removeContribution(material.contributions, message.id)
        }

        assembly.value.progress = message.assemblyProgress
        removeContribution(assembly.value.contributions.data, message.id)
      } else {
        const a = assemblies.value.find((a) => a.id === message.assemblyId)
        if (a) {
          a.progress = message.assemblyProgress
          a.contributorsCount = message.contributorsCount
        }
        if (contributions.value) {
          removeContribution(contributions.value.data, message.id)
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
    deleteContribution,
    onContributionMessage,
    onDeleteContributionMessage,
    clear,
  }
})
