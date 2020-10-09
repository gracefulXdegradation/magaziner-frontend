import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'common/hooks'
import { checkPaymentStatus } from 'common/api'

export const PurchaseCallback = (): null => {
  const history = useHistory()
  const query = useQuery()
  const orderId = query.get('order_id') as string

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const { status } = await checkPaymentStatus({ orderId })
      if (status === 'ready') {
        history.push('/purchase/success')
      } else {
        history.push('/purchase/cancelled')
      }
    }

    if (orderId) {
      fetchPaymentStatus()
    }
  }, [orderId, history])

  return null
}
