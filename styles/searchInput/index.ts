import { CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig } from "react-select"
import { IOption } from "@/types/common"

export const controlStyles = (defaultStyles: CSSObjectWithLabel) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #9E9E9E',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '#9E9E9E',
  },
  borderRight: 'none',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
})

export const menuStyles = (defaultStyles: CSSObjectWithLabel) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  borderRadius: '4px',
  height: 'auto',
  overflow: 'hidden',
  width: 'calc(100% + 40px)',
  minHeight: 30,
})

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  state: OptionProps<IOption, boolean, GroupBase<IOption>>) => {
  return {
    ...defaultStyles,
    cursor: "pointer",
    padding: '6px 12px',
    margin: 0,
    '&:hover': {
      backgroundColor: "#e77b55",
    },
  }
}

export const inputStyles: StylesConfig<IOption,
  boolean,
  GroupBase<IOption>> = {
  //the line separating the arrow and the search field
  indicatorSeparator: () => ({
    border: "none"
  }),
  //Arrow for the drop-down list
  dropdownIndicator: () => ({
    display: "none"
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 30,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'grey',
    }
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "#b9babb"
  })
}
