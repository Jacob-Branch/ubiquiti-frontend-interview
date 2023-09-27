import { z } from "zod"

export const PRODUCT_LINES = ["UniFI", "UniFI LTE", "UniFI Protect", "UniFI Access", "airMax", "EdgeMax"] as const
export type ProductLines = typeof PRODUCT_LINES[number]

export const productSchema = z.object({
  name: z.string(),
  image: z.string(),
  productLine: z.enum(PRODUCT_LINES),
  id: z.string(),
  shortname: z.string(),
  maxPower: z.number(),
  speed: z.number(),
  numOfPorts: z.number(),
})
export type Product = z.infer<typeof productSchema>

export const productListSchema = z.array(productSchema)
export type ProductList = z.infer<typeof productListSchema>