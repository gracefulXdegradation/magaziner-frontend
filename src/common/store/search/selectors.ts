import { AppState, BusinessBasicType } from 'common/types'

export const getSearchResults = (state: AppState): BusinessBasicType[] =>
  state.search.items
export const isSearchFetching = (state: AppState): boolean =>
  state.search.isFetching
