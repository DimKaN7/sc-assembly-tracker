export const findMaterials = (phrase: string): Promise<TitleValueWithData<string, string>[]> =>
  performRequest<TitleValueWithData<string, string>[]>(`/materials`, {
    query: {
      phrase,
    },
  })
