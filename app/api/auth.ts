import { ISignInFx, ISignUpFx } from "@/types/auth"
import { toast } from "react-toastify"
import api from '../axiosClients'
import { createEffect } from "effector-next"

export const signUpFx = createEffect(async ({ url, username, password, email }: ISignUpFx) => {
  const { data } = await api.post(url,{ username, password, email })

  if (data.warningMessage) {
    toast.warning(data.warningMessage)
    return
  }

  toast.success('Регистрация прошла успешно!')
  return data
})

export const signInFx = createEffect(async ({ url, username, password }: ISignInFx) => {
  const { data } = await api.post(url,{ username, password })

  if (data.warningMessage) {
    toast.warning(data.warningMessage)
    return
  }

  toast.success('Вход выполнен!')
  return data
})
