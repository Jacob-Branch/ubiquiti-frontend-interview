import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Product as ProductType} from "../types/product.ts";
import {getProduct} from "../utils/product.ts";
import {Navbar} from "../components/navbar.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";

export const Product = () => {
  const productID = useParams().id
  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductType | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  console.log(productID)

  const getAndSetProduct = async (id: string) => {
    try {
      setProduct(await getProduct(id))
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "There was a problem")
    }
  }

  useEffect(() => {
    if (!productID) navigate("/")
    else getAndSetProduct(productID)
    document.title = "Ubiquiti | Devices | Jekabs Zarins"
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
          <img alt={product.name} src={product.image.large} />
          <ul>
            <li>
              <p>Product line</p>
              <p>{product.productLine.name}</p>
            </li>
            <li>
              <p>ID</p>
              <p>{product.id}</p>
            </li>
            <li>
              <p>Name</p>
              <p>{product.name}</p>
            </li>
            {product.shortnames.length !== 0 &&
              <li>
                <p>Shortnames</p>
                <div>
                  {product.shortnames.map((v) => <p>{v}</p>)}
                </div>
              </li>
            }
            {product.guids.length !== 0 &&
              <li>
                <p>GU IDs</p>
                <div>
                  {product.guids.map((v) => <p>{v}</p>)}
                </div>
              </li>
            }
            {product.sysIDs.length !== 0 &&
              <li>
                <p>System IDs</p>
                <div>
                  {product.sysIDs.map((v) => <p>{v}</p>)}
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    : <>
        <Navbar />
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
      </>
  )
}