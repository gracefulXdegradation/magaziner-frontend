import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import Logo from 'common/components/logo'
import Nav from 'common/components/nav'
import IconMenu from 'common/icons/menu.svg'
import style from './style.module.scss'

interface PageLayoutProps {
  heading?: string | Element
  subheading?: string | Element
  activeNavItem?: string
}

function PageLayout({
  children,
  heading,
  subheading,
  activeNavItem = ''
}: React.PropsWithChildren<PageLayoutProps>): JSX.Element {
  const [isShowMobileNav, setShowMobileNav] = useState(false)
  const nbsp = '\u00A0'

  const showNavPopup = () => setShowMobileNav(true)
  const hideNavPopup = () => setShowMobileNav(false)

  return (
    <div className={style.layout}>
      <div className={style.logoArea}>
        <div className={style.logoWrapper}>
          <Link to="/" className={style.logo}>
            <Logo />
          </Link>
        </div>
      </div>
      <div className={style.heading}>
        <div className={style.headingInner}>
          <h1>{heading}</h1>
          <p>{subheading || nbsp}</p>
        </div>
      </div>
      <div className={style.navigation}>
        <div className={style.navMenuTrigger} onClick={showNavPopup}>
          <i>
            <IconMenu />
          </i>{' '}
          Menu
        </div>
        <div
          className={cn(style.navWrapper, isShowMobileNav && style.showOverlay)}
        >
          <Nav
            closePopup={hideNavPopup}
            isShowClose={isShowMobileNav}
            activeNavItem={activeNavItem}
          />
        </div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default PageLayout
