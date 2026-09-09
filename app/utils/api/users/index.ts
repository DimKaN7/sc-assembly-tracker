export const findUsers = (phrase: string): Promise<TitleValue<string>[]> =>
  performRequest<TitleValue<string>[]>(`/users`, {
    query: {
      phrase,
    },
  })
