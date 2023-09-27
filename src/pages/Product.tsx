import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Product as ProductType} from "../types/product.ts";
import {getProduct} from "../utils/product.ts";
import {Navbar} from "../components/navbar.tsx";

export const Product = () => {
  const productID = useParams().id
  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductType | null>(null)

  console.log(productID)

  const getAndSetProduct = async (id: string) => {
    setProduct(await getProduct(id))
  }

  useEffect(() => {
    if (!productID) navigate("/")
    else getAndSetProduct(productID)
  }, []);
  return (product ?
      <div className={"product-page"}>
        <Navbar />
        <div>
          <img alt={"back"} src={"/icons/Back-icon.svg"} onClick={() => navigate("/")}/>
          <h1>{product.name}</h1>
          <div></div>
        </div>
        <div>
          <img alt={product.name} src={product.image} />
          <ul>
            <li>
              <p>Product line</p>
              <p>{product.productLine}</p>
            </li>
            <li>
              <p>ID</p>
              <p>{product.id}</p>
            </li>
            <li>
              <p>Name</p>
              <p>{product.name}</p>
            </li>
            <li>
              <p>Shortname</p>
              <p>{product.shortname}</p>
            </li>
            <li>
              <p>Max. power</p>
              <p>{product.maxPower} W</p>
            </li>
            <li>
              <p>Speed</p>
              <p>{product.speed} Mbps</p>
            </li>
            <li>
              <p>Number of ports</p>
              <p>{product.numOfPorts}</p>
            </li>
          </ul>
        </div>
      </div>
  : <></>)
}