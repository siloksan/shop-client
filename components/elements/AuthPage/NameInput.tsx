import { IAuthPageInput } from "@/types/auth"
import style from "@/styles/auth/index.module.scss"

const NameInput = ({ register, errors }: IAuthPageInput) => {
  return (
    <label className={style.form__label}>
      <input
        {...register("name", {
          required: "Введите имя!",
          minLength: 2,
          maxLength: 15,
          pattern: {
            value: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9а-яА-ЯёЁ._]+$/i,
            message: "Недопустимое значение!"
          }
        })}
        className={style.forms_field_input}
        type="text"
        placeholder="Name"
      />
      {errors.name && (
        <span className={style.errors_alert}>{errors.name?.message}</span>
        )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={style.errors_alert}>Минимум 2 символа!</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={style.errors_alert}>Не более 15 символов!</span>
      )}
    </label>
  )
}

export default NameInput
