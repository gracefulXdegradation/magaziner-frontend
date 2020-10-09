import React from 'react'
import style from './style.module.scss'

function FilterGroup({
  children
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className={style.filterGroup}>
      <div className={style.contentWrapper}>{children}</div>
    </div>
  )
}

export default FilterGroup
