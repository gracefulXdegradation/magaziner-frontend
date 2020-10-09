import React from 'react'
import { Button, Link } from 'common/ui-kit'
import IconVoucher from 'common/icons/voucher.svg'
import IconAbout from 'common/icons/about.svg'
import PageLayout from 'common/components/page-layout'
import { RelatedBusinesses } from 'common/components/related-businesses'
import ContentLayout from 'common/components/content-layout'
import style from './style.module.scss'

export const NotFound: React.FC = () => (
  <PageLayout>
    <ContentLayout>
      <div className={style.content}>
        <div className={style.image} />
        <h3>Такої сторінки не існує</h3>
        <p>
          Але на Magaziner ще багато цікавого – будь ласка, перегляньте
          пропозиції нижче.{' '}
        </p>
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
        <div className={style.divider} />
        <RelatedBusinesses />
      </div>
    </ContentLayout>
  </PageLayout>
)
