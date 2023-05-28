import React, { useState } from "react"
import Select from "react-select"
import { SelectOptionType } from "@/types/common"
import { controlStyles, inputStyles, menuStyles, optionStyles } from "@/styles/searchInput"

const  SearchInput = () => {

  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }
  return (
    <Select
      placeholder="Поиск"
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles),
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state)
        })
      }}
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 2, 3, 4, 5, 6, 2, 3, 5, 7, 8, 10].map((item) => ({
        value: item,
        label: item
      }))}
    />
  )
}

export default SearchInput
