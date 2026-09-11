export const createAssembly = (
  name: string,
  description: string,
  isPublic: boolean,
  users: string[],
  materials: {
    id: string
    amount: number
  }[],
) =>
  performRequest<string>('/assemblies', {
    method: 'POST',
    body: {
      name,
      description,
      isPublic,
      users,
      materials,
    },
  })
