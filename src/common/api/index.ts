/* eslint camelcase: 0 */

import axios from 'axios'
import {
  fetchBusinessPending,
  fetchBusinessSuccess,
  fetchBusinessError
} from 'common/store/business'
import {
  fetchBusinessesPending,
  fetchBusinessesSuccess,
  fetchBusinessesError
} from 'common/store/search'
import {
  fetchDictPending,
  fetchDictSuccess,
  fetchDictError
} from 'common/store/dictionary'
import {
  normalizeSearchUnit,
  normalizeBusiness,
  normalizeDictionary,
  normalizeOrderData
} from './normalizers'
import { AppDispatch } from 'common/store/reducer'
import { API_URL } from './config'
import { PaymentDataType } from 'common/types'

const api = axios.create({
  baseURL: API_URL,
  timeout: 2000,
  responseType: 'json'
})

interface SearchParamsType {
  businessType?: number
  location?: number
  q?: string
}

export function fetchBusinesses(params: SearchParamsType = {}) {
  return (dispatch: AppDispatch): void => {
    dispatch(fetchBusinessesPending())
    api
      .get('/business/', {
        params: {
          business_type: params.businessType,
          location: params.location,
          q: params.q
        }
      })
      .then((res) => {
        dispatch(
          fetchBusinessesSuccess(res.data.items.map(normalizeSearchUnit))
        )
      })
      .catch((error) => {
        dispatch(fetchBusinessesError(error))
      })
  }
}

export function fetchBusiness(slug: string) {
  return (dispatch: AppDispatch): void => {
    dispatch(fetchBusinessPending())
    api
      .get(`/business/${slug}`)
      .then((res) => {
        dispatch(fetchBusinessSuccess(normalizeBusiness(res.data)))
      })
      .catch((error) => {
        dispatch(fetchBusinessError(error))
      })
  }
}

export function fetchDictionaries() {
  return (dispatch: AppDispatch): void => {
    dispatch(fetchDictPending())
    api
      .get('/dictionary')
      .then((res) => {
        dispatch(fetchDictSuccess(normalizeDictionary(res.data)))
      })
      .catch((error) => {
        dispatch(fetchDictError(error))
      })
  }
}

export function createVoucher({
  email,
  templateId
}: {
  email: string
  templateId: string
}): Promise<PaymentDataType> {
  return api
    .post('/voucher/create', {
      buyer_email: email,
      voucher_template_uuid: templateId
    })
    .then((res) => normalizeOrderData(res.data))
}

type PaymentStatus = 'ready' | 'waiting_for_payment'
interface PaymentStatusResponse {
  status: PaymentStatus
}

export function checkPaymentStatus({
  orderId
}: {
  orderId: string
}): Promise<PaymentStatusResponse> {
  return api
    .get('/voucher/status', {
      params: {
        order_id: orderId
      }
    })
    .then((res) => res.data)
}
