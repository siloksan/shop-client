import Link from "next/link"
import CityButton from "@/components/elements/CityButton/CityButton"
import ProfileDropdown from "@/components/modules/Header/ProfileDropdown"
import styles from "@/styles/header/index.module.scss"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { usePopup } from "@/hooks/usePopup"

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const { toggleOpen, open, closePopup } = usePopup()

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button className={`${styles.burger_menu} ${
            open ? styles.open : ""
          }`} onClick={toggleOpen}>
            <span />
            <span />
            <span />
          </button>
        )}
        <nav className={`${styles.header__nav} ${
          open ? styles.open : ""
        }`}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/description-shop" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link} onClick={closePopup}>
                  О магазине
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/shopping-payment" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link} onClick={closePopup}>
                  Оплата и доставка
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link} onClick={closePopup}>
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a className={styles.header__nav__list__item__link} onClick={closePopup}>
                  Каталог
                </a>
              </Link>
            </li>
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
