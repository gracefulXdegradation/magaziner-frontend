import React from 'react'
import { Link } from 'common/ui-kit'
import style from './style.module.scss'

const HowItWorks = (): JSX.Element => (
  <div className={style.howItWorks}>
    <div className={style.topDivider}>Як це працює?</div>
    <div className={style.howItWorksContent}>
      <div>
        <p>
          Наразі, через карантинні обмеження, багато бізнесів мають труднощі в
          роботі. Платформа Magaziner покликана організувати взаємодію бізнесів
          з їхніми клієнтами.
        </p>
        <p>
          Механізм простий – ви придбаєте ваучер зараз, і зможете використати
          його пізніше. Таким чином, ви отримаєте товар чи послугу у
          майбутньому, але підтримаєте улюблений бізнес вже зараз.
        </p>
      </div>
      <div>
        <p>
          На жаль, ніхто не може гарантувати того, що обраний вами бізнес
          продовжить роботу після карантину. Проте, це саме те, чого ми дуже
          прагнемо. Платформа Magaziner діє на благодійній основі – ми не
          збираємо жодних додаткових відсотків та не маємо на меті комерційного
          зиску.
        </p>
        <p>
          <Link
            to="/about/user-agreement"
            target="_blank"
            className={style.link}
          >
            Ознайомитись з угодою користувача можна тут.
          </Link>
        </p>
      </div>
    </div>
    <div className={style.bottomDivider} />
  </div>
)

export default HowItWorks
