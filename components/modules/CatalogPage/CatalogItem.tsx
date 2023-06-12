import { useState } from "react"
import styles from "@/styles/catalog/index.module.scss"
import { IProduct } from "@/types/products"
import Link from "next/link"
import { formatPrice } from "@/utils/common"
import { $shoppingCart } from "@/context/shopping-carts"
import { useStore } from "effector-react"
import CartHoverSvg from "@/components/elements/svg/CartSvg/CartHoverSvg"
import CartHoverCheckedSvg from "@/components/elements/svg/CartSvg/CartHoverCheckedSvg"
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatalogItem = ({ item }: { item: IProduct }) => {
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => item.id === cartItem.productId)

  return (
    <li className={styles.catalog__list__item}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} legacyBehavior passHref>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__price}>
            {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart}
        ${isInCart ? styles.added : ''}`}
        disabled={spinner}
      >
        {spinner ?
          <div className={spinnerStyles.spinner} style={{top: 6, left: 6}} />
          :
          <span>{isInCart ? <CartHoverCheckedSvg /> :  <CartHoverSvg />}</span>}
      </button>
    </li>
  )
}

export default CatalogItem
