import {Navbar} from "../components/navbar.tsx";
import {useEffect, useState} from "react";
import {ProductList as ProductListType, ProductLines} from "../types/product.ts";
import {getProducts} from "../utils/product.ts";
import {ProductList} from "../components/productList.tsx";
import {ContentControl} from "../components/contentControl.tsx";
import {ProductGrid} from "../components/productGrid.tsx";

export const Home = () => {
  const [products, setProducts] = useState<ProductListType | null>()
  const [search, setSearch] = useState("")
  const [display, setDisplay] = useState<"list" | "grid">("list")
  const [filter, setFilter] = useState<ProductLines[]>([])
  const setData = async (filter?: ProductLines[], search?: string) => {
    setProducts(await getProducts(filter, search))
  }

  useEffect(() => {
    setData()
  }, []);

  useEffect(() => {
    setData(filter, search)
  }, [search, filter]);
  return (
      <>
        <Navbar />
        <ContentControl search={search} setSearch={setSearch} display={display} setDisplay={setDisplay} filter={filter} setFilter={setFilter} />
        {products && <>{display === "list" ? <ProductList products={products}/> : <ProductGrid products={products} />}</>}
      </>
  )
}