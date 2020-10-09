import { createSelector } from '@reduxjs/toolkit'
import { AppState, AppDictionaryType } from 'common/types'

const getDictionary = (state: AppState): AppDictionaryType =>
  state.dictionary.dictionary

export const getBusinessTypes = createSelector(
  getDictionary,
  (dictionary) => dictionary.businessTypes || []
)
// export const getBusinessTypeById = (id: number) =>
//   createSelector(getBusinessTypes, (businessTypes) =>
//     businessTypes.find((b) => b.id === id)
//   )

export const getCities = createSelector(
  getDictionary,
  (dictionary) => dictionary.cities || []
)

// export const getCityById = (id: number) =>
//   createSelector(getCities, (cities) =>
//     cities.find((c) => c.id === id)
//   )

export const isDictionaryFetching = (state: AppState): boolean =>
  state.dictionary.isFetching
