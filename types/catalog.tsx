export interface IQueryParams {
  offset: string
  first: string
  priceFrom: string
  priceTo: string
}

export interface IPriceRangeProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetPriceRange: boolean
  resetFilters: VoidFunction
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
}
