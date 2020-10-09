import React, { useState } from 'react'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'
import cn from 'classnames'
import IconClose from 'common/icons/close-small.svg'
import style from './style.module.scss'

const ESC_KEY_CODE = 27

interface InputProps {
  type: string
  name: string
  value: string
  placeholder: string
  icon: React.ReactNode
  required?: boolean
  error?: string | boolean
  prefix?: string
  maxLength?: number
  onChange: (value: string) => void
}

export function Input({
  type,
  name,
  value,
  placeholder,
  onChange = noop,
  icon,
  required,
  error,
  prefix,
  maxLength
}: InputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false)

  const isShowPlaceholder = !value && !isFocused
  const isShowErrorMessage = !isNil(error) && typeof error === 'string'

  const clear = () => onChange('')
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>
    ESC_KEY_CODE === e.keyCode && clear()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value)

  return (
    <div className={cn(style.inputRoot)}>
      <div
        className={cn(
          style.input,
          isFocused && style.focus,
          !value && style.blank,
          error && required && style.error
        )}
      >
        <i>{icon}</i>
        <div className={style.inputInner}>
          {!isShowPlaceholder && (
            <div className={style.inputShadow}>
              <div className={style.inputShadowInner}>
                {prefix && <span className={style.prefix}>{prefix}</span>}
                {value}
              </div>
              <IconClose className={style.clear} onClick={clear} />
            </div>
          )}
          {prefix && !isShowPlaceholder && (
            <span className={style.prefix}>{prefix}</span>
          )}
          <input
            type={type}
            name={name}
            value={value}
            maxLength={maxLength}
            autoComplete="off"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {isShowPlaceholder && (
            <div className={style.placeholder}>{placeholder}</div>
          )}
        </div>
      </div>
      <div className={style.message}>
        {required && !isShowErrorMessage && (
          <div className={style.required}>
            <span>*</span>
            Обов’язкове поле
          </div>
        )}
        {required === false && !isShowErrorMessage && <div>Необов’язково</div>}
        {isShowErrorMessage && <div className={style.error}>{error}</div>}
      </div>
    </div>
  )
}
