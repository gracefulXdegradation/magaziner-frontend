import React from 'react'
import { NavLink, Button } from 'common/ui-kit'
import IconVoucher from 'common/icons/voucher.svg'
import IconCustomer from 'common/icons/customer.svg'
import IconAbout from 'common/icons/about.svg'
import IconBusiness from 'common/icons/business.svg'
// import IconEmail from 'common/icons/email.svg';
import IconTelegram from 'common/icons/telegram.svg'
// import IconFacebook from 'common/icons/facebook.svg';
import IconClose from 'common/icons/close.svg'
import style from './style.module.scss'

const navItems = [
  {
    id: 'index',
    text: 'Придбання ваучерів',
    url: '/',
    icon: IconVoucher
  },
  {
    id: 'user-profile',
    text: 'Мої ваучери',
    url: '/profile/user/vouchers',
    icon: IconCustomer
  },
  {
    id: 'about',
    text: 'Про проект',
    url: '/about/user-agreement',
    icon: IconAbout
  },
  {
    id: 'business-profile',
    text: 'Кабінет бізнесу',
    url: '/profile/business',
    icon: IconBusiness
  }
]

const socialLinks = [
  {
    //   text: 'Імейл',
    //   url: 'mailto:someone@yoursite.com',
    //   icon: IconEmail
    // },{
    text: 'Телеграм',
    url: 'https://google.com',
    icon: IconTelegram
    // },
    // {
    //   text: 'Фейсбук',
    //   url: 'https://facebook.com',
    //   icon: IconFacebook
  }
]

interface NavProps {
  closePopup: () => void
  isShowClose: boolean
  activeNavItem: string
}

function Nav({
  closePopup,
  isShowClose,
  activeNavItem
}: NavProps): JSX.Element {
  const year = new Date().getFullYear()

  return (
    <nav className={style.navRoot}>
      {isShowClose && (
        <div>
          <IconClose className={style.closeButton} onClick={closePopup} />
        </div>
      )}
      <div className={style.navContent}>
        <div className={style.navSection}>
          <div className={style.navCol}>
            {navItems.slice(0, 3).map(({ url, text, icon: Icon, id }) => (
              <NavLink
                key={id}
                onClick={closePopup}
                to={url}
                icon={<Icon />}
                className={style.navLink}
                active={activeNavItem === id}
              >
                {text}
              </NavLink>
            ))}
            <div className={style.divider} />
          </div>
          <div className={style.navCol}>
            {navItems.slice(3).map(({ url, text, icon: Icon, id }) => (
              <NavLink
                key={id}
                onClick={closePopup}
                to={url}
                icon={<Icon />}
                className={style.navLink}
                active={activeNavItem === id}
              >
                {text}
              </NavLink>
            ))}
            <p>
              Бажаєте з’явитись
              <br />
              на даній платформі?
            </p>
            <div>
              <a
                href="https://forms.gle/694hZGKVKZeE6fdK6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="secondary">Створити ваучер</Button>
              </a>
            </div>
          </div>
        </div>
        <div className={style.section}>
          <h5>Зв’язок з авторами</h5>
          <div className={style.social}>
            {socialLinks.map(({ url, text, icon: Icon }) => (
              <NavLink
                key={text}
                onClick={closePopup}
                to={url}
                icon={<Icon />}
                className={style.navLink}
                external
              >
                {text}
              </NavLink>
            ))}
          </div>
          <p className={style.copy}>&copy;{year} Усі права збережено</p>
        </div>
      </div>
    </nav>
  )
}

export default Nav
