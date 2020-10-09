import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDictionaries } from 'common/api'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from './pages/not-found'
import { HomePage } from './pages/home'
import { AboutPage } from './pages/about'
import { BusinessPage } from './pages/business'
import { VoucherPage } from './pages/voucher'
import { ConfirmPage } from './pages/purchase/confirm'
import { PurchaseSuccessPage } from './pages/purchase/success'
import { PurchaseCancelledPage } from './pages/purchase/cancelled'
import { PurchaseCallback } from './pages/purchase/callback'
import { UserProfilePage } from './pages/user-profile'
import { BusinessProfilePage } from './pages/business-profile'
import { ErrorBoundary } from './components/error-boundary'
import './scss/base.scss'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDictionaries())
  }, [dispatch])

  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/purchase/confirm" exact component={ConfirmPage} />
        <Route path="/purchase/callback" exact component={PurchaseCallback} />
        <Route
          path="/purchase/cancelled"
          exact
          component={PurchaseCancelledPage}
        />
        <Route path="/purchase/success" exact component={PurchaseSuccessPage} />
        <Route path="/profile/business" exact component={BusinessProfilePage} />
        <Route
          path="/profile/user/vouchers"
          exact
          component={UserProfilePage}
        />
        <Route
          path="/business/:slug/voucher/:voucherId"
          exact
          component={VoucherPage}
        />
        <Route path="/business/:slug" exact component={BusinessPage} />
        <Route path="/about/project" exact component={AboutPage} />
        <Route path="/about/user-agreement" exact component={AboutPage} />
        <Route path="/about/faq" exact component={AboutPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </ErrorBoundary>
  )
}

export default App
