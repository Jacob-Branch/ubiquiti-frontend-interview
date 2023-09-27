import { z } from "zod"

export const productSchema = z.object({
  sysIDs: z.array(z.string()),
  name: z.string(),
  image: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string()
  }),
  productLine: z.object({
    name: z.string(),
    id: z.string()
  }),
  id: z.string(),
  guids: z.array(z.string()),
  shortnames: z.array(z.string()),
})
export type Product = z.infer<typeof productSchema>

export const productListSchema = z.array(productSchema)
export type ProductList = z.infer<typeof productListSchema>