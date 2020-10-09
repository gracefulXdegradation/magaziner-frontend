import React from 'react'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import { UnderConstruction } from 'common/components/under-construction'

export const UserProfilePage = (): JSX.Element => (
  <PageLayout heading="Мої ваучери" activeNavItem="user-profile">
    <ContentLayout>
      <UnderConstruction
        heading="Кабінет ваучерів на доопрацюванні"
        copy={
          <>
            <span>
              Зараз ми працюємо над кабінетом з ваучерами. Усі&nbsp;ваучери ви
              зможете знайти на тій електронній скринці, яку ви вказували при
              купівлі ваучера.
            </span>
            <br />
            <br />
            <span>
              Також, ви можете переглянути наступні сторінки, які вже доступні
              на нашому ресурсі.
            </span>
          </>
        }
      />
    </ContentLayout>
  </PageLayout>
)
