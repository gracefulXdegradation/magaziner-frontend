import React from 'react'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import { UnderConstruction } from 'common/components/under-construction'

export const BusinessProfilePage = (): JSX.Element => (
  <PageLayout heading="Кабінет бізнесу" activeNavItem="business-profile">
    <ContentLayout>
      <UnderConstruction />
    </ContentLayout>
  </PageLayout>
)
