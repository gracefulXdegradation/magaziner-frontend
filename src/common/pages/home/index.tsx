import React, { useEffect, useState, useCallback } from 'react'
import get from 'lodash/get'
import { useSelector, useDispatch } from 'react-redux'
import { Select } from 'common/ui-kit'
// import { SearchBar } from 'common/ui-kit'
import { DictionaryEntry } from 'common/types'
import { fetchBusinesses } from 'common/api'
import {
  getBusinessTypes,
  getCities,
  isDictionaryFetching
} from 'common/store/dictionary'
import { getSearchResults } from 'common/store/search'
// import { isSearchFetching } from 'common/store/search'
import SearchGrid from 'common/components/search-grid'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import style from './style.module.scss'

interface FiltersState {
  location?: DictionaryEntry
  businessType?: DictionaryEntry
}

export function HomePage(): JSX.Element {
  // const [query, setQuery] = useState('')
  const items = useSelector(getSearchResults)
  // const isSearching = useSelector(isSearchFetching)
  const isDictFetching = useSelector(isDictionaryFetching)
  const businessTypes = useSelector(getBusinessTypes)
  const cities = useSelector(getCities)
  const dispatch = useDispatch()

  const [filters, setFilters] = useState<FiltersState>({
    location: undefined,
    businessType: undefined
  })

  const doSearchWithFilters = useCallback(() => {
    const params = Object.entries(filters).reduce(
      (acc, [key, item]) => ({
        ...acc,
        [key]: get(item, 'id')
      }),
      {}
    )
    dispatch(fetchBusinesses(params))
  }, [filters, dispatch])
  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters((oldFilters: FiltersState) => ({ ...oldFilters, ...newFilters }))
  }
  useEffect(() => doSearchWithFilters(), [filters, doSearchWithFilters])

  // const handleSubmit = useCallback(() => {
  //   dispatch(fetchBusinesses({ q: query }))
  // }, [query, dispatch])

  const filterBar = (
    <>
      <div className={style.filters}>
        <Select
          defaultValue="Усі міста"
          name="location"
          value={filters.location}
          options={cities}
          disabled={!cities.length}
          onChange={handleFiltersChange}
        />
        <div className={style.businessTypeSelect}>
          <Select
            defaultValue="Усі індустрiї"
            name="businessType"
            value={filters.businessType}
            options={businessTypes}
            disabled={!businessTypes.length}
            onChange={handleFiltersChange}
          />
        </div>
      </div>
      {/* <SearchBar
        placeholder="Пошук"
        value={query}
        onChange={newQuery => setQuery(newQuery)}
        onSubmit={handleSubmit}
      /> */}
    </>
  )

  return (
    <PageLayout
      heading="Придбання ваучерiв"
      subheading="Магазин ваучерів від місцевих бізнесів"
      activeNavItem="index"
    >
      <ContentLayout bar={filterBar} isFetching={isDictFetching}>
        <SearchGrid items={items} />
      </ContentLayout>
    </PageLayout>
  )
}
