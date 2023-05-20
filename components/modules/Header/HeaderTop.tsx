import Link from "next/link"
import CityButton from "@/components/elements/CityButton/CityButton"
import ProfileDropdown from "@/components/modules/Header/ProfileDropdown"
import styles from "@/styles/header/index.module.scss"

const HeaderTop = () => {
  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        <CityButton />
        <nav className={styles.header__nav}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/description-shop" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  О магазине
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/shopping-payment" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  Оплата и доставка
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link}>
                  Каталог
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
