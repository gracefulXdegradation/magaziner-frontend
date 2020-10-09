import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSearchResults, isSearchFetching } from 'common/store/search'
import { fetchBusinesses } from 'common/api'
import { Button, Link, Loader } from 'common/ui-kit'
import BusinessTile from 'common/components/business-tile'
import style from './style.module.scss'

export const RelatedBusinesses: React.FC = () => {
  const businesses = useSelector(getSearchResults)
  const isSearching = useSelector(isSearchFetching)
  const dispatch = useDispatch()

  // TODO temp solution. Instead, fetch related businesses, e.g. by category
  useEffect(() => {
    const thunk = fetchBusinesses()
    dispatch(thunk)
  }, [dispatch])

  return (
    <div className={style.root}>
      <div className={style.copy}>
        <h3>Підтримка інших бізнесів</h3>
        <p>Перегяньте пропозиції ваучерів від інших бізнесів.</p>
      </div>
      <div className={style.grid}>
        {isSearching ? (
          <Loader />
        ) : (
          <>
            {businesses.slice(0, 4).map((item) => (
              <BusinessTile item={item} key={item.id} />
            ))}
          </>
        )}
      </div>
      <div className={style.buttonWrapper}>
        <Link to="/">
          <Button type="secondary-inverted">Дивитись усі</Button>
        </Link>
      </div>
    </div>
  )
}
