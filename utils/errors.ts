import { AxiosError } from "axios"
import { HTTPStatus } from "@/constants"
import { toast } from "react-toastify"

export const showAuthError = (error: unknown) => {
  const axiosError = error as AxiosError

  if (axiosError.response && axiosError.response.status === HTTPStatus.UNAUTHORIZED ) {
    toast.error('Неверное имя пользователя или пароль')
    return
  }

  toast.error((error as Error).message)
}
