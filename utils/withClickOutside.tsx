import { ForwardRefExoticComponent, MutableRefObject, RefAttributes, useEffect, useRef, useState } from "react"
import { IWrappedComponentProps } from "@/types/common"

export function withClickOutside(
  WrapperComponent: ForwardRefExoticComponent<IWrappedComponentProps & RefAttributes<HTMLDivElement>>
) {
  const Component = () => {
    const [open, setOpen] = useState(false)
    const ref =useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
      //closes the window when clicking on any other part of the screen
      const handleClickOutside = (e: MouseEvent) => {
        if (!ref.current.contains(e.target as HTMLDivElement)) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [ref])

    return <WrapperComponent open={open} setOpen={setOpen} ref={ref}/>
  }

  return Component
  }
