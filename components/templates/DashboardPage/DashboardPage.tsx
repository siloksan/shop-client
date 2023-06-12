import styles from "@/styles/dashboardPage/index.module.scss"
import { useEffect, useState } from "react"
import { IProducts } from "@/types/products"
import { getBestsellersOrNewProductsFx } from "@/app/api/products"
import { toast } from "react-toastify"
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider"
import { AnimatePresence, motion } from "framer-motion"
import CartAlert from "@/components/modules/DashboardPage/CartAlert"
import { $shoppingCart } from '@/context/shopping-carts'
import { useStore } from "effector-react"

const DashboardPage = () => {
  const [newProducts, setNewProducts] = useState<IProducts>({} as IProducts)
  const [bestsellers, setBestsellers] = useState<IProducts>({} as IProducts)
  const [spinner, setSpinner] = useState(false)
  const [showAlert, setShowAlert] = useState(!!1)
  const shoppingCart = useStore($shoppingCart)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewProductsFx('products/bestsellers')
      const newProducts = await getBestsellersOrNewProductsFx('products/new')

      setNewProducts(newProducts)
      setBestsellers(bestsellers)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert &&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.dashboard__alert}
            >
            <CartAlert count={shoppingCart.length} closeAlert={closeAlert}/>
          </motion.div> }
        </AnimatePresence>
        <h2 className={styles.dashboard__title}>Наши игрушки</h2>
        <div className={styles.dashboard__products}>
          <h3 className={styles.dashboard__products__title}>Самые популярные</h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner}/>
        </div>
        <div className={styles.dashboard__products}>
          <h3 className={styles.dashboard__products__title}>Новинки</h3>
          <DashboardSlider items={newProducts.rows || []} spinner={spinner}/>
        </div>

      </div>
    </section>
  )
}

export default DashboardPage
