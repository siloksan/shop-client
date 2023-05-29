import { IProduct } from "@/types/products"

export interface IDashboardSlider {
  items: IProduct[]
  spinner: boolean
  goToProductPage?: boolean
}
