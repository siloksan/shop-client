import FilterSelect from "@/components/modules/CatalogPage/FilterSelect"
import { getProductsFx } from "@/app/api/products"
import { $filteredProducts, $products, setProducts } from "@/context/products"
import { toast } from "react-toastify"
import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import skeletonStyles from "@/styles/skeleton/index.module.scss"
import CatalogItem from "@/components/modules/CatalogPage/CatalogItem"
import ReactPaginate from "react-paginate"
import { IQueryParams } from "@/types/catalog"
import { useRouter } from "next/router"
import { IProducts } from "@/types/products"
import PriceRange from "@/components/modules/CatalogPage/PriceRange"
import styles from "@/styles/catalog/index.module.scss"

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const products = useStore($products)
  const filterProducts = useStore($filteredProducts)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([100, 10000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const resetPriceRange = !isPriceRangeChanged
  const pagesCount = Math.ceil(products.count / 20)
  const router = useRouter()

  const resetFilters = async () => {
    try {
      const data = await getProductsFx("/products?limit=20&offset=0")
      setProducts(data)
      setPriceRange([100, 10000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [filterProducts, isFilterInQuery])

  console.log(products.rows)

  const loadProducts = async () => {
    try {
      setSpinner(true)
      const data = await getProductsFx("/products?limit=20&offset=0")
      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1
          }
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push({
              query: {
                ...query,
                offset: 1
              }
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setProducts(isFilterInQuery ? filterProducts : data)
          return
        }

        const offset = +query.offset - 1
        const result = await getProductsFx(
          `/products?limit=20&offset=${offset}`
        )

        setCurrentPage(offset)
        setProducts(isFilterInQuery ? filterProducts : result)
        return
      }

      setCurrentPage(0)
      setProducts(isFilterInQuery ? filterProducts : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: IProducts) => {
    setCurrentPage(0)
    setProducts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getProductsFx("/products?limit=20&offset=0")

      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const result = await getProductsFx(
        `/products?limit=20&offset=${selected}`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1
          }
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setProducts(result)
    } catch (error) {
      toast.error((error as Error).message)
    }
    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={styles.catalog__title}>Каталог игрушек</h2>
      </div>
      <div className={styles.catalog__top}>
        <FilterSelect />
        <PriceRange
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetPriceRange={resetPriceRange}
          resetFilters={resetFilters}
          isPriceRangeChanged={isPriceRangeChanged}
          currentPage={currentPage}
          setIsFilterInQuery={setIsFilterInQuery}
        />
      </div>
      <div className={styles.catalog__bottom}>
        {spinner ? (
          <ul className={skeletonStyles.skeleton}>
            {Array.from(new Array(16)).map((_, i) => (
              <li
                key={i}
                className={skeletonStyles.skeleton__item}
              >
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.catalog__list}>
            {products.rows?.length ? products.rows.map((item) => (
              <CatalogItem key={item.id} item={item} />
            )) : (
              <span>Игрушки закончились, но мы уже вяжем новые</span>
            )}
          </ul>
        )}
        <ReactPaginate
          containerClassName={styles.catalog__bottom__list}
          pageClassName={styles.catalog__bottom__list__item}
          pageLinkClassName={styles.catalog__bottom__list__item__link}
          previousClassName={styles.catalog__bottom__list__prev}
          nextClassName={styles.catalog__bottom__list__next}
          breakClassName={styles.catalog__list__break}
          breakLinkClassName={styles.catalog__list__break__link}
          pageCount={pagesCount}
          breakLabel="..."
          forcePage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
}

export default CatalogPage
