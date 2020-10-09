import React from 'react'
import noop from 'lodash/noop'
import cn from 'classnames'
import IconCheck from 'common/icons/check.svg'
import style from './style.module.scss'

export function Checkbox(props: {
  checked?: boolean
  name?: string
  label?: string | JSX.Element
  onChange?: (value: boolean) => void
}): JSX.Element {
  const { checked = false, label, onChange = noop, name } = props
  return (
    <div className={style.checkboxRoot}>
      <label
        htmlFor={name}
        className={cn(style.checkbox, checked && style.checked)}
        onClick={() => onChange(!checked)}
      >
        <i>
          <IconCheck />
        </i>
        <input type="checkbox" name={name} checked={checked} readOnly />
      </label>
      <p onClick={() => onChange(!checked)}>{label}</p>
    </div>
  )
}
