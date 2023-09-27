import {Product, ProductList} from "../types/product.ts"

const API_ENDPOINT = "https://static.ui.com/fingerprint/ui/public.json"

const productLines: {name: string, id: string}[] = []

export const getProductLines = () => productLines

const createDeviceList = (devices: any[]): Product[] => {
  const products: Product[] = []
  for (let i = 0; i < devices.length; i++) {
    if (!productLines.find((v) => v.id === devices[i].line.id)) productLines.push({name: devices[i].line.name, id: devices[i].line.id})
    const device: Product = {
      name: devices[i].product.name,
      sysIDs: devices[i].sysids,
      image: {
        small: `https://static.ui.com/fingerprint/ui/icons/${devices[i].icon.id}_${devices[i].icon.resolutions[1][0]}x${devices[i].icon.resolutions[1][1]}.png`,
        medium: `https://static.ui.com/fingerprint/ui/icons/${devices[i].icon.id}_${devices[i].icon.resolutions[3][0]}x${devices[i].icon.resolutions[3][1]}.png`,
        large: `https://static.ui.com/fingerprint/ui/icons/${devices[i].icon.id}_${devices[i].icon.resolutions[4][0]}x${devices[i].icon.resolutions[4][1]}.png`,
      },
      productLine: {
        name: devices[i].line.name,
        id: devices[i].line.id
      },
      id: devices[i].id,
      guids: devices[i].guids,
      shortnames: devices[i].shortnames,
    }
    products.push(device)
  }
  return products
}

export const getProduct = async (id: string): Promise<Product> => {
  let json
  try {
    const data = await fetch(`${API_ENDPOINT}`)
    json = await data.json()
  } catch (e) {
    throw new Error("Data provider is down")
  }

  const devices = json.devices
  const products = createDeviceList(devices)
  const product = products.find((v) => v.id === id)

  if (product) return product
  else throw new Error("404 This device does not exist")
}

export const getProducts = async (filter?: string[], search?: string): Promise<ProductList> => {
  let json
  try {
    const data = await fetch(`${API_ENDPOINT}`)
    json = await data.json()
  } catch (e) {
    throw new Error("Data provider is down")
  }

  const devices = json.devices
  let products = createDeviceList(devices)

  if (filter && filter.length !== 0) products = products.filter((v) => filter.includes(v.productLine.id))
  if (search) products = products.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
  return products
}