import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import noop from 'lodash/noop'
import { DictionaryEntry } from 'common/types'
import IconArrowDown from 'common/icons/arrow-down.svg'
import style from './style.module.scss'

export function Select(props: {
  defaultValue: string
  name: string
  value?: DictionaryEntry
  options: DictionaryEntry[]
  disabled?: boolean
  onChange: (name: { [name: string]: DictionaryEntry }) => void
}): JSX.Element {
  const {
    defaultValue,
    name,
    value: selectedItem,
    options: _options = [],
    disabled,
    onChange = noop
  } = props

  const defaultOption = {
    id: undefined,
    value: defaultValue
  }
  const options = [defaultOption, ..._options]
  const { value, id } = selectedItem || defaultOption
  const displayValue = value || defaultValue
  const [isOpen, setIsOpen] = useState(false)
  const rootEl = useRef<HTMLDivElement>(null)

  const toggleOpen = () => !disabled && setIsOpen(!isOpen)
  const handleClickOption = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const optionId = parseInt(target.getAttribute('data-value') || '', 10)
    const newValue = options.find((o) => o.id === optionId)
    toggleOpen()
    onChange({
      [name]: newValue
    })
  }

  const handleClick = (ev: MouseEvent) => {
    if (rootEl.current && !rootEl.current.contains(ev.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick, false)
    return function cleanup() {
      window.removeEventListener('click', handleClick)
    }
  })

  return (
    <span
      data-name={name}
      className={cn(
        style.select,
        isOpen && style.selectOpen,
        disabled && style.selectDisabled
      )}
      ref={rootEl}
    >
      <span className={style.selectValue} onClick={toggleOpen}>
        <b>{displayValue}</b>
        <IconArrowDown className={style.selectIcon} />
      </span>
      <span className={style.selectOptionList}>
        {options.map((o) => (
          <span
            data-value={o.id}
            className={cn(
              style.selectOption,
              o.id === id && style.selectOptionActive
            )}
            onClick={o.id === id ? noop : handleClickOption}
            key={`option-${o.id || 'default'}`}
          >
            {o.value}
          </span>
        ))}
      </span>
    </span>
  )
}
