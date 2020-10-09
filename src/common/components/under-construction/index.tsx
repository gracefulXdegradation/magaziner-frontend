import React from 'react'
import { Button, Link } from 'common/ui-kit'
import IconVoucher from 'common/icons/voucher.svg'
import IconAbout from 'common/icons/about.svg'
import style from './style.module.scss'

const defaultHeading = 'Сторінка на доопрацюванні'
const defaultCopy =
  'Зараз ми працюємо над цією сторінкою, і ви побачите її вже незабаром. Перегляньте наступні сторінки, які вже доступні на нашому ресурсі.'

export function UnderConstruction({
  heading = defaultHeading,
  copy = defaultCopy
}: {
  heading?: string
  copy?: string | JSX.Element
}): JSX.Element {
  return (
    <div className={style.content}>
      <div className={style.image} />
      <h3>{heading}</h3>
      <p>{copy}</p>
      <div className={style.buttons}>
        <Link to="/">
          <Button type="secondary-inverted">
            <i>
              <IconVoucher />
            </i>
            Придбання ваучерів
          </Button>
        </Link>
        <Link to="/about/project">
          <Button type="secondary-inverted">
            <i>
              <IconAbout />
            </i>
            Про проект
          </Button>
        </Link>
      </div>
    </div>
  )
}
