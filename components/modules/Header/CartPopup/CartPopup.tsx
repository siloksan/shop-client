import { forwardRef } from "react"
import { IWrappedComponentProps } from "@/types/common"
import { withClickOutside } from "@/utils/withClickOutside"
import ShoppingCartSvg from "@/components/elements/svg/CartSvg/ShoppingCart"
import { AnimatePresence, motion } from "framer-motion"
import { useStore } from "effector-react"
import { $shoppingCart } from "@/context/shopping-carts"
import Link from "next/link"
import styles from "@/styles/cartPopup/index.module.scss"

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const shoppingCart = useStore($shoppingCart)
    const toggleCartPopup = () => setOpen(!open)

    return (
      <div className={styles.cart} ref={ref}>
        <button className={styles.cart__btn} onClick={toggleCartPopup}>
          {!!shoppingCart.length &&
          <span className={styles.cart__btn__count}>
            {shoppingCart.length}
          </span>}
        <span className={styles.cart__svg}>
          <ShoppingCartSvg />
        </span>
          <span className={styles.cart__text}>Корзина</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.cart__popup}
              style={{ transformOrigin: "right top" }}
            >
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {shoppingCart.length ?
                  shoppingCart.map((item) => <li key={item.id} />)
                  : (<li><span>Корзина пуста</span></li>)}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span className={styles.cart__popup__footer__text}>
                    Общая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>0</span>
                </div>
                <Link href="/order" passHref legacyBehavior>
                  <button className={styles.cart__popup__footer__btn}
                          disabled={!shoppingCart.length}
                  >
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  })

CartPopup.displayName = "CartPopup"
export default withClickOutside(CartPopup)
