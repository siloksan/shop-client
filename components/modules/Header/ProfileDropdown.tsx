import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IWrappedComponentProps } from "@/types/common"
import ProfileSvg from "@/components/elements/svg/ProfileSvg/ProfileSvg"
import LogoutSvg from "@/components/elements/svg/LogoutSvg/Logout"
import { withClickOutside } from "@/utils/withClickOutside"
import styles from "@/styles/profileDropDown/index.module.scss"
import { useStore } from "effector-react"
import { $user } from "@/context/user"
import { logoutFx } from "@/app/api/auth"
import { useRouter } from "next/router"

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({ open, setOpen }, ref) => {
  const toggleProfileDropDown = () => setOpen(!open)
  const user = useStore($user)
  const router = useRouter()

  const handleLogout = async () => {
    await logoutFx('/users/logout')
    router.push('/')
  }

  return (
    <div className={styles.profile} ref={ref}>
      <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
        <span className={styles.profile__span}><ProfileSvg /></span>
      </button>
      {/*for animation  I use library framer-motion*/}
      <AnimatePresence>
        {open &&(
          <motion.ul
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={styles.profile__dropdown}
          style={{ transformOrigin: "right top" }}
        >
          <li className={styles.profile__dropdown__user}>
            <span className={styles.profile__dropdown__username}>{user.username}</span>
            <span className={styles.profile__dropdown__email}>{user.email}</span>
          </li>
          <li className={styles.profile__dropdown__item}>
            <button
              className={styles.profile__dropdown__item__btn}
              onClick={handleLogout}>
              <span className={styles.profile__dropdown__item__text}>Выйти</span>
              <span className={styles.profile__dropdown__item__svg}><LogoutSvg /></span>
            </button>
          </li>
        </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
})

ProfileDropdown.displayName = "ProfileDropdown"
export default withClickOutside(ProfileDropdown)
