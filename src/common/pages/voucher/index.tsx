import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import get from 'lodash/get'
import { useLocalStorage } from 'common/hooks'
import { fetchBusiness } from 'common/api'
import { Button, Link } from 'common/ui-kit'
import { VoucherTemplateType } from 'common/types'
import {
  getBusinessError,
  getBusiness,
  isBusinessFetching
} from 'common/store/business'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import HowItWorks from 'common/components/how-it-works'
import BusinessContacts from 'common/components/business-contacts'
import VoucherCarousel from 'common/components/voucher-carousel'
import RecipientForm from 'common/components/recipient-form'
import IconArrayLeft from 'common/icons/arrow-left.svg'
import style from './style.module.scss'

export const VoucherPage = (): JSX.Element => {
  const business = useSelector(getBusiness)
  const isFetching = useSelector(isBusinessFetching)
  const error = useSelector(getBusinessError)
  const { slug, voucherId } = useParams()
  const [persistedValues, setPersistedValues] = useLocalStorage(
    'magaziner.receiver.contacts',
    {}
  )
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: '',
      phone: ''
    }
  })

  const history = useHistory()
  const dispatch = useDispatch()

  const voucher =
    (business.vouchers || []).find((v) => v.id === voucherId, 10) ||
    ({} as VoucherTemplateType)

  useEffect(() => {
    dispatch(fetchBusiness(slug))
  }, [dispatch, slug])

  const bar = (
    <Link to={`/business/${slug}`} className={style.backButton}>
      <i>
        <IconArrayLeft />
      </i>
      Сторінка бізнесу {business.name}
    </Link>
  )

  const heading = `Ваучер${voucher.value ? ` ₴${voucher.value}` : ''}`

  const handleVoucherChange = (v: VoucherTemplateType) =>
    history.push(`/business/${slug}/voucher/${v.id}`)

  const submit = useCallback(() => {
    const purchaseValues = {
      recipient: formState.values,
      business,
      voucher,
      skinIndex: business.vouchers.indexOf(voucher)
    }
    setPersistedValues(purchaseValues)
    history.push('/purchase/confirm')
  }, [formState, business, voucher, history, setPersistedValues])

  return (
    <PageLayout
      heading={heading}
      subheading={business.name}
      activeNavItem="index"
    >
      <ContentLayout bar={bar} error={error} isFetching={isFetching}>
        <div className={style.voucherCarouselWrap}>
          <VoucherCarousel
            business={business}
            voucher={voucher}
            onChange={handleVoucherChange}
          />
        </div>
        <div className={style.formWrapper}>
          <RecipientForm
            onChange={setFormState}
            defaultValues={get(persistedValues, 'recipient')}
          />
        </div>
        <div className={style.howItWorksWrapper}>
          <HowItWorks />
        </div>
        <BusinessContacts business={business} />
      </ContentLayout>
      <div className={style.stickyCTA}>
        <div className={style.stickyCTAInner}>
          <Button disabled={!formState.isValid} onClick={submit}>
            Придбати ваучер
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
