import { createSelectOption } from "@/utils/common"

export const categoriesOption = [
  "По возрастанию цены",
  "По убыванию цены",
  "По популярности"
].map(createSelectOption)
