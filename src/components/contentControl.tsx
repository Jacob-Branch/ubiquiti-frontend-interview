import {Dispatch, SetStateAction, useState} from "react";
import {ProductLines, PRODUCT_LINES} from "../types/product.ts";

interface HeaderProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  display: "list" | "grid"
  setDisplay: Dispatch<SetStateAction<"list" | "grid">>
  filter: ProductLines[]
  setFilter: Dispatch<SetStateAction<ProductLines[]>>
}

export const ContentControl = ({search, setSearch, display, setDisplay, filter, setFilter}: HeaderProps) => {
  const [tempSearch, setTempSearch] = useState(search)
  const [filterOpen, setFilterOpen] = useState(false)

  const updateSearch = (search: string) => {
    setSearch(search)
    setTempSearch(search)
  }
  return (
      <div className={"content-control"}>
        <form className={"search"} onSubmit={(e) => {
          e.preventDefault()
          updateSearch(tempSearch)
        }}>
          <button onClick={() => updateSearch(tempSearch)}><img alt={"search"} src={"/icons/Search-icon.svg"} /></button>
          <input type={"text"} value={tempSearch} onChange={(v) => setTempSearch(v.target.value)} placeholder={"Search"}/>
          <button type={"submit"} onClick={() => updateSearch("")}><img alt={"clear"} src={"/icons/Close-icon.svg"} /></button>
        </form>
        <div>
          <img alt={"list view"} src={display === "list" ? "/icons/list-view/active.svg" : "/icons/list-view/inactive.svg"}  onClick={() => setDisplay(prev => prev === "grid" ? "list" : "grid")}/>
          <img alt={"grid view"} src={display === "grid" ? "/icons/grid-view/active.svg" : "/icons/grid-view/inactive.svg"} onClick={() => setDisplay(prev => prev === "list" ? "grid" : "list")}/>
          <button onClick={() => setFilterOpen(prev => !prev)}>Filter</button>
          <div style={{display: filterOpen ? "flex" : "none"}}>
            <form>
              <div>
                <legend>Filters</legend>
                <button type={"button"} onClick={() => setFilterOpen(false)}><img alt={"close"} src={"/icons/Close-icon.svg"} /></button>
              </div>
              <p>Product line</p>
              {PRODUCT_LINES.map((v, i) => (
                  <div key={`product-lines-filter-${i}`}>
                    <input type={"checkbox"} id={`checkbox-${v.replace(" ", "-")}`} checked={filter.includes(v)} onChange={() => setFilter(prev => prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v])}/>
                    <label htmlFor={`checkbox-${v.replace(" ", "-")}`} className={`${filter.includes(v) && "checked"}`}><span></span>{v}</label>
                  </div>
              ))}
            </form>
          </div>
        </div>
      </div>
  )
}