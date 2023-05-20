import { MutableRefObject, useRef, useState } from "react"
import SignUpForm from "@/components/modules/AuthPage/SignUpForm"
import SignInForm from "@/components/modules/AuthPage/SignInForm"
import style from "@/styles/auth/index.module.scss"

const AuthPage = () => {

  const userForms = useRef() as MutableRefObject<HTMLDivElement>

  const [stateOfTheForm, setStateOfTheForm] = useState(true)

  const switchForm = () => {
    if (stateOfTheForm) {
      userForms.current.classList.remove(style.bounceRight)
      userForms.current.classList.add(style.bounceLeft)
      setStateOfTheForm(false)
    } else {
      userForms.current.classList.remove(style.bounceLeft)
      userForms.current.classList.add(style.bounceRight)
      setStateOfTheForm(true)
    }
  }

  return (
    <section className={style.main}>
      <div className={style.user_options_forms} ref={userForms}>
        <SignInForm switchForm={switchForm} />
        <SignUpForm switchForm={switchForm} />
      </div>
    </section>
  )
}

export default AuthPage
