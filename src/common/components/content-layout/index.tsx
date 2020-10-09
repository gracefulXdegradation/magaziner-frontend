import React from 'react'
import cn from 'classnames'
import { Loader } from 'common/ui-kit'
import FilterGroup from 'common/components/filter-group'
import style from './style.module.scss'

interface ContentLayoutProps {
  bar?: JSX.Element
  isFetching?: boolean
  error?: string
}

function ContentLayout({
  children,
  bar,
  isFetching,
  error
}: React.PropsWithChildren<ContentLayoutProps>): JSX.Element {
  return (
    <div className={cn(style.contentLayout, bar && style.withBar)}>
      {bar && (
        <div className={style.filterBar}>
          <FilterGroup>{bar}</FilterGroup>
        </div>
      )}

      <div className={style.content}>
        {isFetching && <Loader />}
        {!isFetching &&
          (error ? (
            <div>
              Oops:
              {error}
            </div>
          ) : (
            <div className={style.contentWrapper}>{children}</div>
          ))}
      </div>
    </div>
  )
}

export default ContentLayout
