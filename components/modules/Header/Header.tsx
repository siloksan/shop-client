import HeaderTop from "@/components/modules/Header/HeaderTop"
import HeaderBottom from "@/components/modules/Header/HeaderBottom"
import styles from "@/styles/header/index.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTop />
      <HeaderBottom />
    </header>
  )
}

export default Header
