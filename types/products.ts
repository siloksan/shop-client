export interface IProduct {
  id: number
  price: number
  name: string
  description: string
  images: string
  in_stock: boolean
  bestseller: boolean
  new: boolean
  popularity: number
}

export interface IProducts {
  count: number
  rows: IProduct[]
}
