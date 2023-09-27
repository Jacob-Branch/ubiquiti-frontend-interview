import {Dispatch, SetStateAction, useState} from "react";

interface HeaderProps {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  display: "list" | "grid"
  setDisplay: Dispatch<SetStateAction<"list" | "grid">>
  filter: string[]
  setFilter: Dispatch<SetStateAction<string[]>>
  productLines: {name: string, id: string}[]
}

export const ContentControl = ({search, setSearch, display, setDisplay, filter, setFilter, productLines}: HeaderProps) => {
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
          <img alt={"list view"} src={display === "list" ? "/icons/list-view/active.svg" : "/icons/list-view/inactive.svg"}  onClick={() => setDisplay("list")}/>
          <img alt={"grid view"} src={display === "grid" ? "/icons/grid-view/active.svg" : "/icons/grid-view/inactive.svg"} onClick={() => setDisplay("grid")}/>
          <button onClick={() => setFilterOpen(prev => !prev)}>Filter</button>
          <div style={{display: filterOpen ? "flex" : "none"}}>
            <form>
              <div>
                <legend>Filters</legend>
                <button type={"button"} onClick={() => setFilterOpen(false)}><img alt={"close"} src={"/icons/Close-icon.svg"} /></button>
              </div>
              <p>Product line</p>
              {productLines.map((v, i) => (
                  <div key={`product-lines-filter-${i}`}>
                    <input type={"checkbox"} id={`checkbox-${v.id}`} checked={filter.includes(v.id)} onChange={() => setFilter(prev => prev.includes(v.id) ? prev.filter((i) => i !== v.id) : [...prev, v.id])}/>
                    <label htmlFor={`checkbox-${v.id}`} className={`${filter.includes(v.id) && "checked"}`}><span></span>{v.name}</label>
                  </div>
              ))}
            </form>
          </div>
        </div>
      </div>
  )
}