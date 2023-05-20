import { IAuthPageInput } from "@/types/auth"
import style from "@/styles/auth/index.module.scss"

const EmailInput = ({ register, errors }: IAuthPageInput) => {
  return (
    <label className={style.form__label}>
      <input
        {...register("email", {
          required: "Введите email!",
          minLength: 2,
          maxLength: 15,
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
            message: "Недопустимое значение!"
          }
        })}
        className={style.forms_field_input}
        type="email"
        placeholder="Email"
      />
      {errors.email && (
        <span className={style.errors_alert}>{errors.email?.message}</span>
      )}
    </label>
  )
}

export default EmailInput
