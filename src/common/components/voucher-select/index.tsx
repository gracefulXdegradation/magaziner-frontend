import React from 'react'
import { BusinessType } from 'common/types'
import { Link } from 'common/ui-kit'
import VoucherCard from 'common/components/voucher-card'
import style from './style.module.scss'

function VoucherSelect({ business }: { business: BusinessType }): JSX.Element {
  return (
    <div className={style.voucherSelect}>
      <h3>Оберіть ваучер</h3>
      <div className={style.voucherGrid}>
        {(business.vouchers || []).map((voucher, i) => (
          <Link
            to={`/business/${business.slug}/voucher/${voucher.id}`}
            key={voucher.id}
          >
            <VoucherCard
              business={business}
              voucher={voucher}
              skinIndex={i}
              isHoverable
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default VoucherSelect
