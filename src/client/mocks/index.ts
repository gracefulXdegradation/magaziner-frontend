/* eslint-disable */
import { rest, setupWorker } from 'msw'
import { API_URL } from 'common/api/config'
import { businesses } from './businesses'
import { dictionary } from './dictionary'
import { order } from './order'

export const mocks = [
  rest.get(`${API_URL}/business/:slug`, (req, res, ctx) => {
    const business = businesses.find((b) => b.slug === req.params.slug)
    return business
      ? res(ctx.json(business))
      : res(ctx.status(404), ctx.json({ error: 'Not found' }))
  }),
  rest.get(`${API_URL}/business/`, (req, res, ctx) => {
    const q = req.url.searchParams.get('q') || ''
    const location = req.url.searchParams.get('location')
    const business_type = req.url.searchParams.get('business_type')
    let items: typeof businesses
    if (business_type || location) {
      items = businesses.filter(
        (b) =>
          (!location ||
            b.business_location_ids.includes(parseInt(location as string, 10))) &&
          (!business_type || b.business_type_id === parseInt(business_type as string, 10))
      )
    } else {
      items = businesses.filter((b) =>
        b.business_name.toLowerCase().includes((q as string).toLowerCase())
      )
    }

    return res(ctx.json({ items }))
  }),
  rest.get(`${API_URL}/dictionary`, (req, res, ctx) => {
    return res(ctx.json(dictionary))
  }),
  rest.post(`${API_URL}/voucher/create`, (req, res, ctx) => {
    return res(ctx.json(order))
  })
]

const worker = setupWorker(...mocks)

export default worker
