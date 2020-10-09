import React, { useState, useEffect } from 'react'
import get from 'lodash/get'
import { useLocalStorage } from 'common/hooks'
import { Button, Input } from 'common/ui-kit'
import IconArrowLeft from 'common/icons/arrow-left.svg'
import IconEmail from 'common/icons/email.svg'
import style from './style.module.scss'

export const ResendForm = (): JSX.Element => {
  const [value, setValue] = useState('')
  const [persistedValues] = useLocalStorage('magaziner.receiver.contacts', {})

  const handleValueChange = (newValue: string) => setValue(newValue)

  useEffect(() => {
    const { email } = get(persistedValues, 'recipient', {})
    if (email) {
      setValue(email)
    }
  }, [persistedValues])

  return (
    <div>
      <p>
        Не бачите ваучер у себе на пошті?
        <br />
        Перевірте адресу, і ми надішлемо його ще раз.
      </p>
      <div className={style.emailInput}>
        <Input
          type="email"
          name="email"
          value={value}
          placeholder="Імейл отримувача"
          onChange={handleValueChange}
          icon={IconEmail}
          maxLength={254}
        />
      </div>
      <Button>
        <i>
          <IconArrowLeft />
        </i>
        Надіслати ще раз
      </Button>
    </div>
  )
}
