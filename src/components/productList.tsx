import {ProductList as ProductListType} from "../types/product.ts";
import {ProductListItem} from "./productListItem.tsx";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
  products: ProductListType,
}

export const ProductList = ({products}: HeaderProps) => {
  const navigate = useNavigate()
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>{products.length} devices</th>
              <th>Product line</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((v, i) => (
                <tr key={i} onClick={() => navigate("/product/"+v.id)}>
                  <ProductListItem product={v} />
                </tr>
            ))}
          </tbody>
        </table>
      </>
  )
}