export default () => {
  const assembliesStore = useAssembliesStore()
  const { assemblies, assembly, contributions } = storeToRefs(assembliesStore)

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
                  station: data.station,
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

  const onDeletedContributionMessage = (message: DeletedContributionResponse | undefined) => {
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

  const onUpdatedContributionMessage = (message: UpdatedContributionResponse | undefined) => {
    if (message) {
      console.log(message)
      if (assembly.value && assembly.value.id === message.assemblyId) {
        const material = assembly.value.materials.find((m) => m.id === message.materialId)
        if (material) {
          if (message.newAmount <= 0) {
            removeContribution(material.contributions, message.id)
          } else {
            material.actualCount = message.newAmount
            material.progress = message.materialProgress

            const contribution = material.contributions.find((c) => c.id === message.id)
            if (contribution) {
              contribution.station = message.station
              contribution.amount = message.newMaterialAmount
            }
          }
        }

        assembly.value.progress = message.assemblyProgress
      } else {
        const a = assemblies.value.find((a) => a.id === message.assemblyId)
        if (a) {
          a.progress = message.assemblyProgress
          a.contributorsCount = message.contributorsCount
        }
      }

      if (contributions.value) {
        if (message.newAmount <= 0) {
          removeContribution(contributions.value.data, message.id)
        } else {
          const contribution = contributions.value.data.find((c) => c.id === message.id)
          if (contribution) {
            contribution.amount = message.newMaterialAmount
          }
        }
      }
    }
  }

  return {
    onContributionMessage,
    onDeletedContributionMessage,
    onUpdatedContributionMessage,
  }
}
