export interface VoucherTemplateType {
  id: string
  value: number
  name: string
}

export interface BusinessContactsType {
  address?: string
  site?: string
  telegram?: string
  email?: string
  phone?: string
  facebook?: string
  instagram?: string
}

export interface BusinessBasicType {
  id: string
  name: string
  businessType: number
  locations: number[]
  slug: string
  logo: string
  image?: string
}

export interface BusinessType extends BusinessBasicType {
  vouchers: VoucherTemplateType[]
  contacts: BusinessContactsType
}

export interface DictionaryEntry {
  id: number
  value: string
}

export interface AppDictionaryType {
  cities: DictionaryEntry[]
  businessTypes: DictionaryEntry[]
}

export interface PaymentDataType {
  data: string
  orderId: string
  signature: string
}

export type APIError = string

export interface BasicReducerType {
  isFetching: boolean
  error?: APIError
}

export interface BusinessState extends BasicReducerType {
  item?: BusinessType
}

export interface DictionaryState extends BasicReducerType {
  dictionary: AppDictionaryType
}

export interface SearchState extends BasicReducerType {
  items: BusinessBasicType[]
}

export interface AppState {
  business: BusinessState
  dictionary: DictionaryState
  search: SearchState
}

export interface OrderDataType {
  business: BusinessType
  voucher: VoucherTemplateType
  skinIndex: number
  recipient: {
    email: string
    phone: string
  }
}
