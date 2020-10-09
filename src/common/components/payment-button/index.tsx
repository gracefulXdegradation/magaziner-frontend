import React from 'react'
import style from './style.module.scss'

interface PaymentButtonProps {
  paymentData: {
    data: string
    signature: string
  }
}

export function PaymentButton({
  paymentData: { data, signature }
}: PaymentButtonProps): JSX.Element | null {
  return (
    <form
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      acceptCharset="utf-8"
      className={style.liqpayButton}
    >
      {data && signature && (
        <>
          <input type="hidden" name="data" value={data} />
          <input type="hidden" name="signature" value={signature} />
          <input
            type="image"
            src="//static.liqpay.ua/buttons/p1ru.radius.png"
            alt="LiqPay"
          />
        </>
      )}
    </form>
  )
}
