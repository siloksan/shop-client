import Select from "react-select"
import { optionStyles } from "@/styles/searchInput"
import React, { useEffect, useState } from "react"
import { IOption, SelectOptionType } from "@/types/common"
import { createSelectOption } from "@/utils/common"
import { selectStyles, controlStyles, menuStyles } from "@/styles/catalog/select"
import { categoriesOption } from "@/utils/selectContents"
import { $products, setProductsCheapFirst, setProductsExpensiveFirst, setProductsPopularity } from "@/context/products"
import { useRouter } from "next/router"
import { useStore } from "effector-react"

const FilterSelect = () => {
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()
  const products = useStore($products)

   useEffect(() => {
     if (products.rows) {
       switch (router.query.first) {
       case "cheap":
         updateCategoryOption('По возрастанию цены')
         setProductsCheapFirst()
         break
       case "expensive":
         updateCategoryOption('По убыванию цены')
         setProductsExpensiveFirst()
         break
       case "popular":
         updateCategoryOption('По популярности')
         setProductsPopularity()
         break
       }
     }
   }, [products.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  //set the query parameter for the selected select
  const updateRouteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption)
    switch ((selectedOption as IOption).value) {
    case "По возрастанию цены":
      setProductsCheapFirst()
      updateRouteParam('cheap')
      break
    case "По убыванию цены":
      setProductsExpensiveFirst()
      updateRouteParam('expensive')
      break
    case "По популярности":
      setProductsPopularity()
      updateRouteParam('popular')
      break
    }
  }

  return (
    <Select
      placeholder="Поиск"
      value={categoryOption || createSelectOption("По возрастанию цены")}
      onChange={handleSearchOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles)
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles)
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state)
        })
      }}
      isSearchable={false}
      options={categoriesOption}
    />
  )
}

export default FilterSelect
