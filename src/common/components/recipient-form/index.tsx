import React, { useState, useEffect } from 'react'
import noop from 'lodash/noop'
import pick from 'lodash/pick'
import { Checkbox, Input } from 'common/ui-kit'
import IconEmail from 'common/icons/email.svg'
import IconPhone from 'common/icons/phone.svg'
import style from './style.module.scss'

const cbLabel = (
  <>
    Здійснюючи цю покупку, я погоджуюсь з угодою користувача. Платформа
    Magaziner некомерційна і не бере відсоток за послуги. Ваучер дійсний
    протягом одного календарного року з дати придбання. Купівля ваучера є
    відносинами між бізнесом, який надає ваучер, та споживачем, який його купує.
    Платформа не розповсюджує контактні дані третім особам.
  </>
)

const validateEmail = (email = ''): string | undefined => {
  if (!email) {
    return 'Потрібно ввести імейл'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Неправильний формат імейлу'
  }
  return undefined
}

const validatePhone = (phone = ''): string | undefined => {
  if (!phone) {
    return undefined
  }
  if (!/^\d{9}$/.test(phone.replace(/[\s-]/g, ''))) {
    return 'Неправильний формат телефону'
  }
  return undefined
}

interface FieldState<T> {
  value: T
  error?: string | boolean
  validate: (value: T) => string | boolean | undefined
}

interface FormValues {
  email: string
  phone: string
}

interface FormValuesExteneded extends FormValues {
  isAgree: boolean
}

type FormState = {
  [KeyType in keyof FormValuesExteneded]: FieldState<
    FormValuesExteneded[KeyType]
  >
}

interface RecipientFormProps {
  onChange?: (args: { isValid: boolean; values: FormValues }) => void
  defaultValues?: FormValues
}

const initialState: FormState = {
  email: {
    value: '',
    error: undefined,
    validate: validateEmail
  },
  phone: {
    value: '',
    error: undefined,
    validate: validatePhone
  },
  isAgree: {
    value: false,
    error: true,
    validate: (value) => (value ? undefined : true)
  }
}

const validateForm = (formState: FormState): FormState =>
  Object.entries(formState).reduce(
    (newFormState: FormState, [field, { validate, value }]) => {
      const error = (validate as FieldState<typeof value>['validate'])(value)

      return {
        ...newFormState,
        [field]: {
          validate,
          value,
          error
        }
      }
    },
    {} as FormState
  )

const isFormValid = (formData: FormState): boolean =>
  Object.values(formData).reduce(
    (isValid: boolean, fieldData) => isValid && !fieldData.error,
    true
  )

function RecipientForm({
  onChange = noop,
  defaultValues
}: RecipientFormProps): JSX.Element {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    const newValues: FormValuesExteneded = {
      email: '',
      phone: '',
      isAgree: false,
      ...defaultValues
    }

    setFormData(
      (oldFormData: FormState): FormState =>
        (Object.keys(newValues) as (keyof FormValuesExteneded)[]).reduce(
          (acc, key) => {
            const newFieldState = {
              ...oldFormData[key],
              value: newValues[key]
            }

            return {
              ...acc,
              [key]: newFieldState
            }
          },
          {} as FormState
        )
    )
  }, [defaultValues])

  const handleChange = (
    key: keyof FormState,
    value: string | boolean
  ): void => {
    const newFormState = validateForm({
      ...formData,
      [key]: {
        ...formData[key],
        value
      }
    })
    setFormData(newFormState)
  }
  const handleEmailChange = (value: string) => handleChange('email', value)
  const handlePhoneChange = (value: string) => handleChange('phone', value)
  const handleAgreedChange = (value: boolean) => handleChange('isAgree', value)

  useEffect(() => {
    const values = Object.entries(formData).reduce((acc, [key, fieldData]) => {
      return {
        ...acc,
        [key]: fieldData.value
      }
    }, {})
    onChange({
      isValid: isFormValid(formData),
      values: pick(values, ['email', 'phone']) as FormValues
    })
  }, [formData, onChange])

  return (
    <div className={style.recipientForm} data-testid="recipientForm">
      <h3>Дані отримувача</h3>
      <Input
        type="email"
        name="email"
        value={formData.email.value as string}
        placeholder="Імейл отримувача"
        onChange={handleEmailChange}
        icon={<IconEmail />}
        maxLength={254}
        required
        error={formData.email.error}
      />
      <Input
        type="tel"
        name="phone"
        value={formData.phone.value as string}
        placeholder="Мобільний отримувача"
        onChange={handlePhoneChange}
        icon={<IconPhone />}
        required={false}
        prefix="(+380)"
        error={formData.phone.error}
      />
      <div className={style.agreement}>
        <Checkbox
          checked={formData.isAgree.value as boolean}
          onChange={handleAgreedChange}
          label={cbLabel}
          name="is-agree"
        />
      </div>
    </div>
  )
}

export default RecipientForm
