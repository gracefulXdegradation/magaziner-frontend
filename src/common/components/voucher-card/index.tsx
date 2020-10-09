import React from 'react'
import cn from 'classnames'
import { BusinessBasicType, VoucherTemplateType } from 'common/types'
import { Button } from 'common/ui-kit'
import style from './style.module.scss'

const skins = ['m', 'g', 'z', 'n', 'r']

interface VoucherCardProps {
  business: BusinessBasicType
  voucher: VoucherTemplateType
  skinIndex: number
  isHoverable?: boolean
  isLarge?: boolean
}

function VoucherCard({
  business,
  voucher,
  skinIndex,
  isHoverable,
  isLarge
}: VoucherCardProps): JSX.Element {
  const skin = skins[skinIndex % skins.length]
  const cardClassName = cn({
    [style.voucherCard]: true,
    [style.large]: isLarge,
    [style.hoverable]: isHoverable,
    [style[skin]]: skin
  })

  return (
    <div className={cardClassName}>
      <div className={style.businessInfo}>
        <div>
          <h5 className={style.businessName}>{voucher.name}</h5>
          <span className={style.businessType}>{business.name}</span>
        </div>
        {isLarge && (
          <img
            className={style.businessLogo}
            src={business.logo}
            alt={`${business.name} logo`}
          />
        )}
      </div>
      <div className={style.voucherCardFooter}>
        <span className={style.voucherPrice}>₴{voucher.value}</span> Ваучер
      </div>
      {isHoverable && (
        <div className={style.voucherCardOnHover}>
          <Button>Обрати</Button>
        </div>
      )}
    </div>
  )
}

export default VoucherCard
