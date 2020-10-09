import React from 'react'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'
import { Link } from 'common/ui-kit'
import PageLayout from 'common/components/page-layout'
import ContentLayout from 'common/components/content-layout'
import { AboutProject } from './project'
import { UserAgreement } from './user-agreement'
import { FAQ } from './faq'
import style from './style.module.scss'

const subNavItems = [
  {
    to: '/about/project',
    caption: 'Про проект',
    content: <AboutProject />
  },
  {
    to: '/about/faq',
    caption: 'Питання',
    content: <FAQ />
  },
  {
    to: '/about/user-agreement',
    caption: 'Угода користувача',
    content: (
      <>
        <div className={style.cover} />
        <div className={style.copy}>
          <UserAgreement />
        </div>
      </>
    )
  }
]

export function AboutPage(): JSX.Element {
  const { pathname } = useLocation()
  const { caption, content } = subNavItems.find(
    ({ to }) => to === pathname
  ) || { caption: '', content: '' }

  const subNav = (
    <div className={style.subNav}>
      {subNavItems.map((item) => (
        <Link
          to={item.to}
          key={item.to}
          className={cn(
            style.subNavItem,
            item.to.startsWith(pathname) && style.subNavActiveItem
          )}
        >
          {item.caption}
        </Link>
      ))}
    </div>
  )

  return (
    <PageLayout heading={caption} activeNavItem="about">
      <ContentLayout bar={subNav}>{content}</ContentLayout>
    </PageLayout>
  )
}
