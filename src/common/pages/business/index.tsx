import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchBusiness } from 'common/api'
import { Link } from 'common/ui-kit'
import {
  getBusinessType,
  getBusiness,
  isBusinessFetching
} from 'common/store/business'
import { NoiseBand } from 'common/components/noise-band'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import HowItWorks from 'common/components/how-it-works'
import VoucherSelect from 'common/components/voucher-select'
import BusinessContacts from 'common/components/business-contacts'
import TextMessage from 'common/components/text-message'
import IconArrayLeft from 'common/icons/arrow-left.svg'
import style from './style.module.scss'

export const BusinessPage = (): JSX.Element => {
  const item = useSelector(getBusiness)
  const businessType = useSelector(getBusinessType)
  const isFetching = useSelector(isBusinessFetching)
  const { slug } = useParams()
  const { name, logo } = item

  const subheading = businessType ? businessType.value : ''

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBusiness(slug))
  }, [dispatch, slug])

  const bar = (
    <Link className={style.backButton} to="/">
      <i>
        <IconArrayLeft />
      </i>
      Придбання ваучерів
    </Link>
  )

  return (
    <PageLayout heading={name} subheading={subheading} activeNavItem="index">
      <ContentLayout bar={bar} isFetching={isFetching}>
        <NoiseBand className={style.logoBand}>
          <img src={logo} alt={name} />
        </NoiseBand>
        <div className={style.voucherSelectWrapper}>
          <VoucherSelect business={item} />
        </div>
        <div className={style.howItWorksWrapper}>
          <HowItWorks />
        </div>
        <div className={style.messageWrapper}>
          <TextMessage business={item} />
        </div>
        <BusinessContacts business={item} />
      </ContentLayout>
    </PageLayout>
  )
}
