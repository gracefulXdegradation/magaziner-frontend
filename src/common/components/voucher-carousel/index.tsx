import React from 'react'
import noop from 'lodash/noop'
import cn from 'classnames'
import { BusinessType, VoucherTemplateType } from 'common/types'
import VoucherCard from 'common/components/voucher-card'
import IconArrowLeft from 'common/icons/arrow-left.svg'
import style from './style.module.scss'

interface VoucherCarouselProps {
  business: BusinessType
  voucher: VoucherTemplateType
  onChange?: (value: VoucherTemplateType) => void
}

function VoucherCarousel({
  business,
  voucher,
  onChange = noop
}: VoucherCarouselProps): JSX.Element {
  const vouchers = business.vouchers || []
  const selectedIndex = vouchers.indexOf(voucher)
  const isHidePrev = vouchers[selectedIndex - 1] === undefined
  const isHideNext = vouchers[selectedIndex + 1] === undefined

  const getVoucherByIndex = (index: number): VoucherTemplateType =>
    vouchers[index] || ({} as VoucherTemplateType)

  return (
    <div className={cn(style.voucherCarousel, style.large)}>
      <div
        className={cn(style.prev, isHidePrev && style.hidden)}
        onClick={() => onChange(vouchers[selectedIndex - 1])}
      >
        <i>
          <IconArrowLeft />
        </i>
        <div className={style.backdrop}>
          <VoucherCard
            business={business}
            voucher={getVoucherByIndex(selectedIndex - 1)}
            skinIndex={selectedIndex - 1}
          />
        </div>
      </div>
      <div className={style.selectedVoucher}>
        <VoucherCard
          business={business}
          voucher={getVoucherByIndex(selectedIndex)}
          skinIndex={selectedIndex}
          isLarge
        />
      </div>
      <div
        className={cn(style.next, isHideNext && style.hidden)}
        onClick={() => onChange(vouchers[selectedIndex + 1])}
      >
        <i>
          <IconArrowLeft />
        </i>
        <div className={style.backdrop}>
          <VoucherCard
            business={business}
            voucher={getVoucherByIndex(selectedIndex + 1)}
            skinIndex={selectedIndex + 1}
          />
        </div>
      </div>
    </div>
  )
}

export default VoucherCarousel
