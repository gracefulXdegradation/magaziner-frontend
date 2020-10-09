import React from 'react'
import variables from 'common/scss/base.scss'
import logo from './img/logo.svg'
import logoSmall from './img/logo-small.svg'
import style from './style.module.scss'

const Logo = (): JSX.Element => (
  <picture className={style.logo}>
    <source
      media={`(max-width: ${variables.mediaBreakpointDownXS})`}
      srcSet={logoSmall}
    />
    <source
      media={`(min-width: ${variables.mediaBreakpointUpS})`}
      srcSet={logo}
    />
    <img src={logo} alt="Magaziner Logo" />
  </picture>
)

export default Logo
