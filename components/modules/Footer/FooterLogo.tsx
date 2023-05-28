import styles from '@/styles/footer/index.module.scss'
import Link from "next/link"

const FooterLogo = () => {
  return (
    <div className={styles.footer__top__item}>
      <Link href="/dashboard" passHref legacyBehavior>
        <a className={styles.footer__top__item__logo}>
          <img src="/img/logo.svg" alt="logo" width={40}/>
          <span className={styles.footer__top__item__logo__text}>Вязанные игрушки от Настюшки</span>
        </a>
      </Link>
    </div>
  )
}

export default FooterLogo
