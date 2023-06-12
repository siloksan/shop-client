import { ISignInFx, ISignUpFx } from "@/types/auth"
import { toast } from "react-toastify"
import api from '../axiosClients'
import { createEffect } from "effector-next"
import { AxiosError } from "axios"
import { HTTPStatus } from "@/constants"

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

export const checkUserAuthFX = createEffect(async ( url: string) => {
  try {
    const { data } = await api.get(url)

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    toast.error((error as Error).message)
  }
})

export const logoutFx = createEffect(async ( url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
