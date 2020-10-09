import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { BusinessBasicType } from 'common/types'
// import { getCityById } from 'common/store/dictionary'
import style from './style.module.scss'

function BusinessTile({ item }: { item: BusinessBasicType }): JSX.Element {
  const { name, slug, image, logo } = item
  // const city = useSelector(getCityById(locations[0]))
  return (
    <div className={style.businessTile}>
      <h5>{name}</h5>
      {/* <div className={style.businessTileAddress}>{city}</div> */}
      <Link
        className={cn(
          style.businessTileImage,
          logo && image && style.businessTileImageDual
        )}
        to={`/business/${slug}`}
      >
        {logo && <img src={logo} alt={`${name} logo`} />}
        {image && <img src={image} alt={name} />}
      </Link>
    </div>
  )
}

export default BusinessTile
