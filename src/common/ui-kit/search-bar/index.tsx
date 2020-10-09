import React from 'react'
import noop from 'lodash/noop'
import IconSearch from 'common/icons/search.svg'
import style from './style.module.scss'

export function SearchBar(props: {
  placeholder?: string
  value?: string
  onChange?: (newValue: string) => void
  onSubmit?: () => void
}): JSX.Element {
  const { placeholder, value = '', onChange = noop, onSubmit = noop } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <input
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        name="q"
        size={value.length || 1}
        maxLength={32}
        value={value}
        className={style.searchInput}
        onChange={handleChange}
      />
      <button className={style.searchSubmitButton} type="submit">
        <IconSearch />
      </button>
    </form>
  )
}
