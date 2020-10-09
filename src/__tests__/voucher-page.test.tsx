import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { RootState } from 'common/store/reducer'
import configureStore from 'common/store/configureStore'
import App from 'common/app'
import { mocks } from '../client/mocks'

describe('<VoucherPage />', () => {
  const server = setupServer(...mocks)
  let utils: RenderResult

  const getEmailInput = () =>
    utils.container.querySelector('[name="email"]') as HTMLInputElement

  const getPhoneInput = () =>
    utils.container.querySelector('[name="phone"]') as HTMLInputElement

  const getUserAgreementCheckbox = () =>
    utils.container.querySelector('[for="is-agree"]') as HTMLInputElement

  const getSubmitButton = () =>
    utils.getByText('Придбати ваучер') as HTMLButtonElement

  const setupApp = () => {
    const history = createMemoryHistory()
    history.push(
      '/business/kapkan-shop/voucher/2f5b8dc2-9064-11ea-9f26-e9f589081b76'
    )
    return (
      <Provider store={configureStore({} as RootState)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    )
  }

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  beforeEach(() => localStorage.clear())
  beforeEach(() => {
    utils = render(setupApp())
  })

  test('should enable submit button when email and phone are entered correctly', async () => {
    const submitButton = getSubmitButton()
    expect(submitButton.className).toMatch('disabled')

    await utils.findByTestId('recipientForm')

    fireEvent.change(getEmailInput(), { target: { value: 'login@domain.com' } })
    fireEvent.click(getUserAgreementCheckbox())
    expect(submitButton.className).not.toMatch('disabled')

    fireEvent.change(getPhoneInput(), { target: { value: '66 666 66 66' } })
    expect(submitButton.className).not.toMatch('disabled')
  })

  test('should disable submit button when phone is entered incorrectly', async () => {
    const submitButton = getSubmitButton()
    expect(submitButton.className).toMatch('disabled')

    await utils.findByTestId('recipientForm')

    fireEvent.change(getEmailInput(), { target: { value: 'login@domain.com' } })
    fireEvent.click(getUserAgreementCheckbox())
    expect(submitButton.className).not.toMatch('disabled')

    fireEvent.change(getPhoneInput(), { target: { value: '66 666 66' } })
    expect(submitButton.className).toMatch('disabled')
  })

  test('should persist phone and email values correctly', async () => {
    const submitButton = getSubmitButton()
    expect(submitButton.className).toMatch('disabled')

    await utils.findByTestId('recipientForm')

    fireEvent.change(getEmailInput(), { target: { value: 'login@domain.com' } })
    fireEvent.click(getUserAgreementCheckbox())
    expect(submitButton.className).not.toMatch('disabled')

    fireEvent.change(getPhoneInput(), { target: { value: '66 666 66 66' } })
    expect(submitButton.className).not.toMatch('disabled')

    fireEvent.click(submitButton)

    const json = localStorage.getItem('magaziner.receiver.contacts')
    expect(json).not.toBeNull()
    const storedValues = JSON.parse(json as string)
    expect(storedValues.recipient).toStrictEqual({
      email: 'login@domain.com',
      phone: '66 666 66 66'
    })
    await utils.findByAltText('LiqPay')
  })

  test('should prepopulate form fields from localStorage correctly', async () => {
    localStorage.setItem(
      'magaziner.receiver.contacts',
      JSON.stringify({
        recipient: {
          email: 'login@domain.com',
          phone: '66 666 66 65'
        }
      })
    )
    utils = render(setupApp())
    const emailInput = (await utils.findByDisplayValue(
      'login@domain.com'
    )) as HTMLInputElement
    expect(emailInput.name).toBe('email')
    expect(getPhoneInput().value).toBe('66 666 66 65')
  })
})
