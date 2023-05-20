import NameInput from "@/components/elements/AuthPage/NameInput"
import { useForm } from "react-hook-form"
import { IInputs } from "@/types/auth"
import EmailInput from "@/components/elements/AuthPage/EmailInput"
import PasswordInput from "@/components/elements/AuthPage/PasswordInput"
import { signUpFx } from "@/app/api/auth"
import { toast } from "react-toastify"
import { showAuthError } from "@/utils/errors"
import style from "@/styles/auth/index.module.scss"
import spinnerStyle from "@/styles/spinner/index.module.scss"
import React, { useState } from "react"

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {

  const [spinner, setSpinner] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const userDate = await signUpFx({
        url: "/users/signup",
        username: data.name,
        email: data.email,
        password: data.password
      })

      if (!userDate) {
        return
      }

      resetField("email")
      resetField("name")
      resetField("password")
      switchForm()
    } catch (error) {
      toast.error((error as Error).message)
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className={style.user_forms_signup}>
      <h2 className={style.forms_title}>Пройти регистрацию</h2>
      <form className={style.forms_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.forms_field}>
          <NameInput register={register} errors={errors} />
        </div>
        <div className={style.forms_field}>
          <EmailInput register={register} errors={errors} />
        </div>
        <div className={style.forms_field}>
          <PasswordInput register={register} errors={errors} />
        </div>
        <div className={style.forms_buttons}>
          <button className={style.forms_buttons_action}>
            {spinner ? <div className={spinnerStyle.spinner}/> : 'Зарегистрироваться'}
          </button>
        </div>
      </form>
      <button className={style.user_registered_login} onClick={switchForm}>Уже есть аккаунт?</button>
    </div>
  )
}

export default SignUpForm
