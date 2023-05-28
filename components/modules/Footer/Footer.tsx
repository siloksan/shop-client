import FooterLogo from "@/components/modules/Footer/FooterLogo"
import styles from "@/styles/footer/index.module.scss"
import OnlineStoreContent from "@/components/modules/Footer/OnlineStoreContent"
import MarkerSvg from "@/components/elements/svg/MarkerSvg/MarkerSvg"
import Link from "next/link"
import PhoneSvg from "@/components/elements/svg/PhoneSvg/PhoneSvg"
import MailSvg from "@/components/elements/svg/MailSvg/MailSvg"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import Accordion from "@/components/elements/Accordion/Accordion"

const Footer = () => {

  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__item}>
            {!isMedia500 &&
              <>
                <h3 className={styles.footer__top__item__title}>
                  Интернет-магазин
                </h3>
                <OnlineStoreContent />
              </>
            }
            {isMedia500 &&
              <Accordion
                title="Интернет-магазин"
                titleClass={`${styles.footer__top__item__title} ${styles.arrow}`}
                arrowOpenClass={styles.open}>
                <OnlineStoreContent />
                <div style={{ height: 16 }}></div>
              </Accordion>
            }
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>
              Контакты
            </h3>
            <ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Ярославль</span>
                    <span><MarkerSvg /></span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href="tel:+79705829874" className={styles.footer__top__item__list__item__link}>
                  <span>Наш контактный телефон:</span>
                  <span>+7-970-582-98-74</span>
                  <span><PhoneSvg /></span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href="mailto:tutel@mail.ru" className={styles.footer__top__item__list__item__link}>
                  <span>E-mail:</span>
                  <span>tutel@mail.ru</span>
                  <span><MailSvg /></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>Способы оплаты:</h3>
              <ul className={styles.footer__bottom__block__pay_systems}>
                <li className={styles.footer__bottom__block__pay_systems__item}>
                  <img src="/img/icon-paysystem-mastercard.svg" alt="pay system mastercard" />
                </li>
                <li className={styles.footer__bottom__block__pay_systems__item}>
                  <img src="/img/icon-paysystem-visa.svg" alt="pay system visa" />
                </li>
                <li className={styles.footer__bottom__block__pay_systems__item}>
                  <img src="/img/icon-paysystem-world.svg" alt="pay system world" />
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>Мы в соцсетях:</h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <a href="#" className={styles.footer__bottom__block__social__item_vk} />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a href="#" className={styles.footer__bottom__block__social__item_fb} />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a href="#" className={styles.footer__bottom__block__social__item_inst} />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              © «Магазин игрушек от Настюшки» 2023.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
