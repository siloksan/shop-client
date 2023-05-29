import Slider from "react-slick"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Link from "next/link"
import { formatPrice } from "@/utils/common"
import { useEffect } from "react"
import skeletonStyles from "@/styles/skeleton/index.module.scss"
import styles from "@/styles/dashboardPage/index.module.scss"
import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

const DashboardSlider = ({ items, spinner, goToProductPage }) => {
  const isMedia560 = useMediaQuery(560)
  const isMedia768 = useMediaQuery(768)
  const isMedia800 = useMediaQuery(800)
  const isMedia1030 = useMediaQuery(1030)
  const isMedia1366 = useMediaQuery(1366)

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia560 ? '276px' : '390px'
      list.style.padding = '0 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: isMedia768 ? 1 : 2
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
  }

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((_, i) => (
          <div className={skeletonStyles.skeleton__item}
               key={i}
               style={width}
          >
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <div className={styles.dashboard__slide}
               key={item}
               style={width}
          >
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={styles.dashboard__slide__inner}>
              <Link
                href={goToProductPage ? `/catalog/${item.id}` : "/catalog"}
                legacyBehavior
                passHref>
                <a href="">
                  <h3 className={styles.dashboard__slide__title}>
                    {item.name}
                  </h3>
                </a>
              </Link>
              <span className={styles.dashboard__slide__price}>
                {formatPrice(item.price)} P
              </span>
            </div>
          </div>
        ))
      ) : (<span>Список товаров пуст</span>)}
    </Slider>
  )
}

export default DashboardSlider
