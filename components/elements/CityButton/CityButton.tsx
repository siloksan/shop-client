import LocationSwg from "@/components/elements/svg/LocationSvg/LocationSwg"
import styles from '@/styles/cityButton/index.module.scss'

const CityButton = () => {
  return (
    <button className={styles.city}>
      <span className={styles.city__span}><LocationSwg /></span>
      <span className={styles.city__text}>Yaroslavl</span>
    </button>
  )
}

export default CityButton
