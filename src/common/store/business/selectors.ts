import { createSelector } from '@reduxjs/toolkit'
import { getBusinessTypes } from 'common/store/dictionary'
import { AppState, BusinessType } from 'common/types'

export const getBusiness = (state: AppState): BusinessType =>
  state.business.item || ({} as BusinessType)

export const getBusinessError = (state: AppState): string | undefined =>
  state.business.error

export const isBusinessFetching = (state: AppState): boolean =>
  state.business.isFetching

export const getBusinessType = createSelector(
  getBusiness,
  getBusinessTypes,
  (business, businessTypes) => {
    if (!business || !businessTypes) {
      return null
    }
    return businessTypes.find((b) => b.id === business.businessType)
  }
)
