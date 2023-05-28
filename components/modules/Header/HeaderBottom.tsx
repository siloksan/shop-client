import styles from "@/styles/header/index.module.scss"
import Link from "next/link"
import SearchSvg from "@/components/elements/svg/SearchSvg/SearchSvg"
import SearchInput from "@/components/elements/Header/SearchInput"
import CartPopup from "@/components/modules/Header/CartPopup/CartPopup"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" style={{ width: 40 }} />
              <span className={styles.header__logo__link__text}>Вязанные игрушки от Настюшки</span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button className={styles.header__search__btn}>
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
          </button>
        </div>
        <div className={styles.header__shopping_cart}>
          <CartPopup />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
