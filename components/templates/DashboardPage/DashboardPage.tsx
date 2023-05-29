import styles from "@/styles/dashboardPage/index.module.scss"
import { useEffect, useState } from "react"
import { IProducts } from "@/types/products"
import { getBestsellersOrNewProductsFx } from "@/app/api/products"
import { toast } from "react-toastify"
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider"

const DashboardPage = () => {
  const [newProducts, setNewProducts] = useState<IProducts>({} as IProducts)
  const [bestsellers, setBestsellers] = useState<IProducts>({} as IProducts)
  const [spinner, setSpinner] = useState(false)

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

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
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
