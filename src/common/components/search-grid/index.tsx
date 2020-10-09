import React from 'react'
import BusinessTile from 'common/components/business-tile'
import { BusinessBasicType } from 'common/types'
import style from './style.module.scss'

function SearchGrid({
  items = []
}: {
  items: BusinessBasicType[]
}): JSX.Element {
  return (
    <div className={style.searchGrid}>
      {items.map((item) => (
        <BusinessTile item={item} key={item.id} />
      ))}
    </div>
  )
}
export default SearchGrid
