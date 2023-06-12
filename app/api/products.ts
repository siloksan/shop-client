import { createEffect } from "effector-next"
import api from '../axiosClients'

export const getBestsellersOrNewProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getProductsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})
