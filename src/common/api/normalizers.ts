import { IMAGE_API_URL } from './config'
import {
  AppDictionaryType,
  BusinessContactsType,
  BusinessBasicType,
  BusinessType,
  PaymentDataType,
  VoucherTemplateType
} from 'common/types'

const resolveImage = (imgPath: string): string =>
  process.env.NODE_ENV === 'development'
    ? imgPath
    : `${IMAGE_API_URL}${imgPath}`

const normalizeVoucher = ({
  uuid,
  value
}: Record<string, string>): VoucherTemplateType => ({
  id: uuid,
  value: parseFloat(value),
  name: `Ваучер ₴${parseFloat(value)}`
})

const normalizeContacts = ({
  physical_address: address,
  site_link: site,
  telegram_link: telegram,
  contact_mail: email,
  contact_phone: phone,
  facebook_link: facebook,
  instagram_link: instagram
}: Record<string, string>): BusinessContactsType => ({
  address,
  site,
  telegram,
  email,
  phone,
  facebook,
  instagram
})

export const normalizeSearchUnit = ({
  uuid,
  business_name: businessName,
  business_type_id: businessType,
  business_location_ids: businessLocations,
  slug,
  logo_filename
}: Record<string, unknown> = {}): BusinessBasicType => ({
  id: uuid as string,
  name: businessName as string,
  businessType: businessType as number,
  locations: businessLocations as number[],
  slug: slug as string,
  logo: resolveImage(logo_filename as string)
})

export const normalizeBusiness = ({
  uuid,
  business_name: businessName,
  business_type_id: businessType,
  business_location_ids: businessLocations,
  contacts = {},
  logo_filename: logo,
  slug,
  voucher_templates: vouchers = []
}: Record<string, unknown> = {}): BusinessType => ({
  id: uuid as string,
  name: businessName as string,
  businessType: businessType as number,
  locations: businessLocations as number[],
  slug: slug as string,
  logo: resolveImage(logo as string),
  vouchers: (vouchers as Record<string, string>[]).map(normalizeVoucher),
  contacts: normalizeContacts(contacts as Record<string, string>)
})

export const normalizeDictionary = ({
  business_types: businessTypes = [],
  locations = []
}): AppDictionaryType => ({
  cities: locations.map(({ id, city_name: cityName }) => ({
    id,
    value: cityName
  })),
  businessTypes: businessTypes.map(({ id, business_type: businessType }) => ({
    id,
    value: businessType
  }))
})

export const normalizeOrderData = ({
  data,
  signature,
  order_id: orderId
}: Record<string, string>): PaymentDataType => ({
  data,
  signature,
  orderId
})
