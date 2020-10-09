import React from 'react'
import { Button, Link } from 'common/ui-kit'
// import { ResendForm } from 'common/components/resend-form'
import VoucherCard from 'common/components/voucher-card'
// import IconPDF from 'common/icons/pdf.svg'
import IconCustomer from 'common/icons/customer.svg'
import { BusinessType, VoucherTemplateType } from 'common/types'
import style from './style.module.scss'
// import qr from './img/qr.png'

interface VoucherPurchasedProps {
  business: BusinessType
  voucher: VoucherTemplateType
  skinIndex: number
}

export function VoucherPurchased({
  business,
  voucher,
  skinIndex
}: VoucherPurchasedProps): JSX.Element {
  return (
    <div className={style.root}>
      <div className={style.purchaseGrid}>
        <div className={style.slotCard}>
          <VoucherCard
            business={business}
            voucher={voucher}
            skinIndex={skinIndex}
            isLarge
          />
        </div>
        <div className={style.slotQr}>
          {/* <img src={qr} alt="qr code" /> */}
        </div>
        <div className={style.slotCode}>{/* <h3>Код: CV7986</h3> */}</div>
      </div>
      <div className={style.successNote}>
        <h5>
          Ваучер відправлено на вказаний імейл та до кабінету
          “Мої&nbsp;ваучери”.
        </h5>
        <p>
          Дякуємо, що придбали ваучер. Ви допомагаєте малому бізнесу пережити
          важкі часи, ваша підтримка дуже важлива.
        </p>
      </div>
      <div className={style.buttons}>
        <Link to="/profile/user/vouchers">
          <Button type="secondary-inverted">
            <i>
              <IconCustomer />
            </i>
            Мої ваучери
          </Button>
        </Link>
        {/* <Button type="secondary-inverted" className={style.pdfButton}>
          <i>
            <IconPDF />
          </i>
          Завантажити у PDF
        </Button> */}
      </div>
      {/* <div className={style.resendForm}>
        <ResendForm />
      </div> */}
    </div>
  )
}
