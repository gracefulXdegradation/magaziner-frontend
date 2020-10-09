import React from 'react'
import cn from 'classnames'
import { BusinessBasicType } from 'common/types'
import style from './style.module.scss'

function TextMessage({
  business: { logo, image, name }
}: {
  business: BusinessBasicType
}): JSX.Element {
  return (
    <div className={style.textMessageRoot}>
      <div>
        <h3>Вітаємо!</h3>
        <p>
          Ця платформа допоможе нам зустрітися після того, як обмеження буде
          послаблено.
          <br />
          Кожен ваучер наближає нас до цієї мети. Ми щиро вдячні вам і будемо
          раді бачити настільки швидко, наскільки це буде можливим.
        </p>
      </div>
      <div className={cn(style.image, logo && image && style.imageDual)}>
        {logo && <img src={logo} alt={`${name} logo`} />}
        {image && <img src={image} alt={`${name}`} />}
      </div>
    </div>
  )
}

export default TextMessage
