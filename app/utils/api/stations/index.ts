export const findStations = (phrase: string): Promise<TitleValue<string>[]> =>
  performRequest<TitleValue<string>[]>(`/stations`, {
    query: {
      phrase,
    },
  })
