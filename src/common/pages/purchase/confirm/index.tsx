import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'common/hooks'
import { createVoucher } from 'common/api'
import { Link } from 'common/ui-kit'
import { OrderDataType } from 'common/types'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import { PaymentButton } from 'common/components/payment-button'
import { NoiseBand } from 'common/components/noise-band'
import IconArrayLeft from 'common/icons/arrow-left.svg'
import ImageVisa from './img/visa.svg'
import ImageMastercard from './img/mastercard.svg'
import style from './style.module.scss'

export const ConfirmPage = (): JSX.Element => {
  const [persistedValues] = useLocalStorage(
    'magaziner.receiver.contacts',
    {} as OrderDataType
  )
  const [paymentData, setPaymentData] = useState({ data: '', signature: '' })
  const { recipient, business, voucher } = persistedValues
  const { email, phone } = recipient || {}
  const { name, slug, logo } = business || {}
  const { id: voucherId, value } = voucher || {}

  useEffect(() => {
    async function fetchPaymentData(paymentData: {
      voucherId: string
      email: string
    }) {
      const { data, signature } = await createVoucher({
        email: paymentData.email,
        templateId: paymentData.voucherId
      })
      setPaymentData({ data, signature })
    }

    if (voucherId && email) {
      fetchPaymentData({
        voucherId,
        email
      })
    }
  }, [voucherId, email])

  const bar = (
    <Link
      to={`/business/${slug}/voucher/${voucherId}`}
      className={style.backButton}
    >
      <i>
        <IconArrayLeft />
      </i>
      Ваучери {name}
    </Link>
  )

  const subheading = `Ваучер${value !== undefined ? ` ₴${value}` : ''}`

  return (
    <PageLayout
      heading="Перевірка"
      subheading={subheading}
      activeNavItem="index"
    >
      <ContentLayout bar={bar}>
        <div className={style.wrapper}>
          <NoiseBand className={style.purchase}>
            <div className={style.businessLogo}>
              {logo && <img src={logo} alt={`${name} logo`} />}
            </div>
            <div className={style.purchaseDetails}>
              <div className={style.line}>
                <span>Заклад:</span>
                {name}
              </div>
              <div className={style.line}>
                <span>Продукт:</span>
                Ваучер
              </div>
              <div className={style.line}>
                <span>Ціна:</span>₴{value}
              </div>
              <div className={style.line}>
                <span>Імейл:</span>
                {email}
              </div>
              {phone && (
                <div className={style.line}>
                  <span>Телефон:</span>
                  {phone}
                </div>
              )}
            </div>
          </NoiseBand>
          <PaymentButton paymentData={paymentData} />
          <div className={style.paymentSystems}>
            <img src={ImageVisa} alt="visa" height="32" />
            <img src={ImageMastercard} alt="mastercard" height="32" />
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  )
}
