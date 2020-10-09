import React from 'react'
import get from 'lodash/get'
import { useLocalStorage } from 'common/hooks'
import { OrderDataType } from 'common/types'
import PageLayout from 'common/components/page-layout'

export const PurchaseCancelledPage = (): JSX.Element => {
  const [persistedValues] = useLocalStorage(
    'magaziner.receiver.contacts',
    {} as OrderDataType
  )
  const { voucher, business } = persistedValues

  return (
    <PageLayout heading="Платіж відхилено">
      <h3>
        {get(business, 'name')} | {get(voucher, 'name')}
      </h3>
    </PageLayout>
  )
}
