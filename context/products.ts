import { createDomain } from "effector-next"
import { IProducts } from "@/types/products"

const products = createDomain()

export const setProducts = products.createEvent<IProducts>()
export const setProductsCheapFirst = products.createEvent()
export const setProductsExpensiveFirst = products.createEvent()
export const setProductsPopularity = products.createEvent()
export const setFilteredProducts = products.createEvent()

export const $products = products
  .createStore<IProducts>({} as IProducts)
  .on(setProducts, (_, parts) => parts)
  .on(setProductsCheapFirst, (state) => ({
    ...state,
      rows: state.rows.sort((a, b) => a.price - b.price)
  }))
  .on(setProductsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price)
  }))
  .on(setProductsPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.popularity - b.popularity)
  }))

export const $filteredProducts = products
  .createStore<IProducts>({} as IProducts)
  .on(setFilteredProducts, (_, parts) => parts)

