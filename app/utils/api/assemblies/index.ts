export const upsertAssembly = (
  id: string | undefined,
  name: string,
  description: string,
  isPublic: boolean,
  users: string[],
  materials: {
    id: string
    amount: number
  }[],
) =>
  performRequest<ExtendedAssemblyResponse>('/assemblies', {
    method: 'POST',
    body: {
      id,
      name,
      description,
      isPublic,
      users,
      materials,
    },
  })
