import {ProductList} from "../types/product.ts";
import {ProductCard} from "./productCard.tsx";

interface HeaderProps {
  products: ProductList
}

export const ProductGrid = ({products}: HeaderProps) => {
  return (
      <div className={"product-grid"}>
        <p>{products.length} devices</p>
        <div>
          {products.map((v, i) => (
              <ProductCard product={v} key={i} />
          ))}
        </div>
      </div>
  )
}