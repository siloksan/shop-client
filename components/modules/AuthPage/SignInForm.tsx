import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { IInputs } from "@/types/auth"
import NameInput from "@/components/elements/AuthPage/NameInput"
import PasswordInput from "@/components/elements/AuthPage/PasswordInput"
import spinnerStyle from "@/styles/spinner/index.module.scss"
import { showAuthError } from "@/utils/errors"
import { signInFx } from "@/app/api/auth"
import { useRouter } from "next/router"
import style from "@/styles/auth/index.module.scss"

const SignInForm = ({ switchForm }: { switchForm: () => void }) => {

  const [spinner, setSpinner] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm<IInputs>()

  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await signInFx({
        url: "/users/login",
        username: data.name,
        password: data.password
      })

      resetField("name")
      resetField("password")
      route.push('/dashboard')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={style.user_forms_login}>
      <h2 className={style.forms_title}>Войти в аккаунт</h2>
      <form className={style.forms_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.forms_field}>
          <NameInput register={register} errors={errors} />
        </div>
        <div className={style.forms_field}>
          <PasswordInput register={register} errors={errors} />
        </div>
        <div className={style.forms_buttons}>
          <button className={style.forms_buttons_action}>
            {spinner ? <div className={spinnerStyle.spinner}/> : 'Войти'}
          </button>
        </div>
        <button type="button" className={style.forms_buttons_forgot}>Forgot password?</button>
      </form>
      <button className={style.user_registered_login} onClick={switchForm}>Хотите Зарегистрироваться?</button>
    </div>
  )
}

export default SignInForm
