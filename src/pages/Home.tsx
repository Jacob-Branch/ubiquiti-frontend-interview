import {Navbar} from "../components/navbar.tsx";
import {useEffect, useState} from "react";
import {ProductList as ProductListType} from "../types/product.ts";
import {getProductLines, getProducts} from "../utils/product.ts";
import {ProductList} from "../components/productList.tsx";
import {ContentControl} from "../components/contentControl.tsx";
import {ProductGrid} from "../components/productGrid.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";

export const Home = () => {
  const displayStyleInLocalStorage = localStorage.getItem("display")
  const [display, setDisplay] = useState<"list" | "grid">(
      displayStyleInLocalStorage === "grid" || displayStyleInLocalStorage === "list"
          ? displayStyleInLocalStorage
          : "list"
  )

  const [products, setProducts] = useState<ProductListType | null>()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string[]>([])
  const [productLines, setProductLines] = useState<{name: string, id: string}[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  const setData = async (filter?: string[], search?: string) => {
    try {
      setProducts(await getProducts(filter, search))
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "There was a problem")
    }
  }

  useEffect(() => {
    setProductLines(getProductLines())
    document.title = "Ubiquiti | Devices | Jekabs Zarins"

    // const localStorageDisplayStyle = localStorage.getItem("display")
    // if (localStorageDisplayStyle === "grid" || localStorageDisplayStyle === "list") {
    //   setDisplay(localStorageDisplayStyle)
    // }
  }, []);

  useEffect(() => {
      setData(filter, search)
  }, [search, filter]);

  useEffect(() => {
    localStorage.setItem("display", display)
  }, [display]);

  return (
      <>
        <Navbar />
        <ContentControl search={search} setSearch={setSearch} display={display} setDisplay={setDisplay} filter={filter} setFilter={setFilter} productLines={productLines} />
        {products && <>{display === "list" ? <ProductList products={products}/> : <ProductGrid products={products} />}</>}
        {errorMessage !== "" && <ErrorMessage message={errorMessage} />}
      </>
  )
}