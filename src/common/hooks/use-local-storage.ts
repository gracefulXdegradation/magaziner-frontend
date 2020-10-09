import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    try {
      const json = window.localStorage.getItem(key) as string
      const item = JSON.parse(json)
      if (item) {
        setStoredValue(item)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error in useLocalStorage hook. Failed to get the persisted item',
        key,
        error
      )
    }
  }, [key])

  const persistValue = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'Error in useLocalStorage hook. Failed to persist the item',
          key,
          newValue,
          error
        )
      }
    },
    [key]
  )

  const setValue = (newValue: T) => {
    persistValue(newValue)
    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
