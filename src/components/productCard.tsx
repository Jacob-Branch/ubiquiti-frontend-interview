import {Product} from "../types/product.ts";
import { useNavigate} from "react-router-dom";

interface HeaderProps {
  product: Product
}

export const ProductCard  = ({product}: HeaderProps) => {
  const navigate = useNavigate()
  return (
      <div onClick={() => navigate("/product/"+product.id)} className={"product-card"}>
        <div>
          <img alt={product.name} src={product.image.medium} />
        </div>
        <div>
          <p>{product.name}</p>
          <p>{product.productLine.name}</p>
        </div>
      </div>
  )
}