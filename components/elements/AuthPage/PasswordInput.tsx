import { IAuthPageInput } from "@/types/auth"
import style from "@/styles/auth/index.module.scss"

const PasswordInput = ({ register, errors }: IAuthPageInput) => {
  return (
    <label className={style.form__label}>
      <input
        {...register("password", {
          required: "Введите пароль!",
          minLength: 5,
          maxLength: 25,
          pattern: {
            value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/i,
            message: "Недопустимое значение!"
          }
        })}
        className={style.forms_field_input}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className={style.errors_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={style.errors_alert}>Минимум 5 символа!</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={style.errors_alert}>Не более 25 символов!</span>
      )}
    </label>
  )
}

export default PasswordInput
