import { Range, getTrackBackground } from "react-range"
import { IPriceRangeProps } from "@/types/catalog"
import { useState } from "react"
import styles from "@/styles/filter/index.module.scss"
import spinnerStyles from "@/styles/spinner/index.module.scss"
import { useRouter } from "next/router"
import { getProductsFx } from "@/app/api/products"
import { setFilteredProducts } from "@/context/products"
import { toast } from "react-toastify"

const STEP = 0.1
const MIN = 0
const MAX = 10000

const PriceRange = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetPriceRange,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery
}: IPriceRangeProps) => {
  const handlePriceRangeChange = (value: number[]) => {
    setIsPriceRangeChanged(true)
    setPriceRange(value)
  }
  const [spinner, setSpinner] = useState(false)
  const router = useRouter()

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : "";
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (isPriceRangeChanged) {
        router.push({
          query: {
            ...router.query,
            priceFrom,
            priceTo,
            offset: initialPage + 1
          }
        }, undefined, { shallow: true })
        const data = await getProductsFx(
          `/products?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilteredProducts(data)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={styles.filter__price}>
      <div className={styles.filter__price__inputs}>
        <input
          className={styles.filter__price__input}
          type="text"
          value={Math.ceil(priceRange[0])}
          placeholder={`от ${MIN}`}
          readOnly
        />
        <span className={styles.filter__price__border} />
        <input
          className={styles.filter__price__input}
          type="text"
          value={Math.ceil(priceRange[1])}
          placeholder={`до ${MAX}`}
          readOnly
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em"
        }}
      >
        <Range
          values={priceRange}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={handlePriceRangeChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "auto",
                display: "flex",
                width: "100%",
                padding: "0 10px"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ["#B1CEFA", "#247CC8", "#B1CEFA"],
                    min: MIN,
                    max: MAX
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style
              }}
            >
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#FFF",
                  borderRadius: "50%",
                  border: "3px solid #1C629E",
                  boxShadow: "0px 12px 8px -6px rgba(174, 181, 239, .2)"
                }}
              />
            </div>
          )}
        />
      </div>
      <div className={styles.filter__actions}>
        <button
          className={styles.filter__actions__show}
          disabled={spinner || resetPriceRange}
          onClick={applyFilters}
        >
          {spinner ? <span
            className={spinnerStyles.spinner}
            style={{ top: 6, left: "47%" }}
          /> : "Показать"}
        </button>
        <button
          className={styles.filter__actions__reset}
          disabled={resetPriceRange}
          onClick={resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default PriceRange
