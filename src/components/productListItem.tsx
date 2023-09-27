import {Product as ProductType} from "../types/product.ts";

interface HeaderProps {
  product: ProductType
}

export const ProductListItem = ({product}: HeaderProps) => {
  return (
      <>
        <td><img alt={product.name} src={product.image.small} /></td>
        <td><p>{product.productLine.name}</p></td>
        <td><p>{product.name}</p></td>
      </>
  )
}