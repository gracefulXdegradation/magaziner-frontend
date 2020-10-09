import React from 'react'
import { useLocalStorage } from 'common/hooks'
import { OrderDataType } from 'common/types'
import PageLayout from 'common/components/page-layout'
import { VoucherPurchased } from 'common/components/voucher-purchased'
import { RelatedBusinesses } from 'common/components/related-businesses'
import BusinessContacts from 'common/components/business-contacts'
import style from './style.module.scss'

export const PurchaseSuccessPage = (): JSX.Element => {
  const [persistedValues] = useLocalStorage(
    'magaziner.receiver.contacts',
    {} as OrderDataType
  )
  const { business, voucher, skinIndex } = persistedValues

  return (
    <PageLayout heading="Дякуємо за підтримку!">
      <div className={style.purchaseSuccessContent}>
        <div className={style.sectionContent}>
          <VoucherPurchased
            business={business || {}}
            voucher={voucher || {}}
            skinIndex={skinIndex}
          />
        </div>
        <div className={style.sectionContent}>
          <RelatedBusinesses />
        </div>
        <div className={style.fullWidth}>
          <div className={style.sectionContent}>
            <BusinessContacts business={business || {}} />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
