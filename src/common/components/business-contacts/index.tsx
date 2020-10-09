import React from 'react'
import { BusinessType } from 'common/types'
import IconLocation from 'common/icons/location.svg'
import IconPhone from 'common/icons/phone.svg'
import IconEmail from 'common/icons/email.svg'
import IconTelegram from 'common/icons/telegram.svg'
import IconFacebook from 'common/icons/facebook.svg'
import IconInstagram from 'common/icons/instagram.svg'
import IconWeb from 'common/icons/web.svg'
import style from './style.module.scss'

const formatUrl = (url: string) =>
  url.replace(/^http(s)?:\/\/(www.)?/, '').replace(/\/$/, '')

const formatSocialLink = (url: string) =>
  formatUrl(url).replace(/^(instagram.com\/|facebook.com\/)/, '')

function BusinessContacts({
  business
}: {
  business: BusinessType
}): JSX.Element {
  const {
    contacts: {
      address,
      telegram,
      facebook,
      email,
      phone,
      instagram,
      site
    } = {}
  } = business

  return (
    <div className={style.contactsRoot}>
      <div>
        <h3>Зв’язок з {business.name}</h3>
        <p>Зв’яжіться з {business.name} будь-яким зручним для вас способом.</p>
      </div>
      <div className={style.contactsBlock}>
        {address && (
          <div className={style.map}>
            <iframe
              title={`${business.name} map`}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20326.25175840834!2d30.551957!3d50.445171!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5106812c5d%3A0x221af60403878fa9!2sMaidan%20Nezalezhnosti!5e0!3m2!1sen!2sua!4v1587680703540!5m2!1sen!2sua"
              frameBorder="0"
              allowFullScreen={false}
              aria-hidden="false"
            />
          </div>
        )}
        <div className={style.contacts}>
          {address && (
            <div>
              <i>
                <IconLocation />
              </i>
              {address}
            </div>
          )}
          {phone && (
            <a href={`tel:${phone}`}>
              <i>
                <IconPhone />
              </i>
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <i>
                <IconEmail />
              </i>
              {email}
            </a>
          )}
          {telegram && (
            <a href={telegram}>
              <i>
                <IconTelegram />
              </i>
              Телеграм
            </a>
          )}
          {facebook && (
            <a href={facebook}>
              <i>
                <IconFacebook />
              </i>
              {formatSocialLink(facebook)}
            </a>
          )}
          {instagram && (
            <a href={instagram}>
              <i>
                <IconWeb />
              </i>
              {formatSocialLink(instagram)}
            </a>
          )}
          {site && (
            <a href={site}>
              <i>
                <IconInstagram />
              </i>
              {formatUrl(site)}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessContacts
