import {Product, productSchema, ProductList, productListSchema, ProductLines} from "../types/product.ts"

const API_ENDPOINT = ""

const FAKE_DATA: {[x:string]: Product} = {
  "unifi-in-wall": {
    name: "Access Point WiFi 6 In-Wall",
    image: "/images/products/wifi-6-in-wall.png",
    id: "unifi-in-wall",
    shortname: "U6-In-Wall",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-enterprise": {
    name: "Access Point WiFi 6 Enterprise",
    image: "/images/products/wifi-6-enterprise.png",
    id: "unifi-enterprise",
    shortname: "U6-Enterprise",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "nano-switch": {
    name: "NanoSwitch",
    image: "/images/products/nano-switch.png",
    id: "nano-switch",
    shortname: "NanoSwitch",
    productLine: "UniFI Access",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-lte": {
    name: "UniFi LTE",
    image: "/images/products/unifi-lte.png",
    id: "unifi-lte",
    shortname: "UniFi-LTE",
    productLine: "UniFI LTE",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-in-wall-2": {
    name: "Access Point WiFi 6 In-Wall",
    image: "/images/products/wifi-6-in-wall.png",
    id: "unifi-in-wall-2",
    shortname: "U6-In-Wall",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-enterprise-2": {
    name: "Access Point WiFi 6 Enterprise",
    image: "/images/products/wifi-6-enterprise.png",
    id: "unifi-enterprise-2",
    shortname: "U6-Enterprise",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "nano-switch-2": {
    name: "NanoSwitch",
    image: "/images/products/nano-switch.png",
    id: "nano-switch-2",
    shortname: "NanoSwitch",
    productLine: "UniFI Access",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-lte-2": {
    name: "UniFi LTE",
    image: "/images/products/unifi-lte.png",
    id: "unifi-lte-2",
    shortname: "UniFi-LTE",
    productLine: "UniFI LTE",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-in-wall-3": {
    name: "Access Point WiFi 6 In-Wall",
    image: "/images/products/wifi-6-in-wall.png",
    id: "unifi-in-wall-3",
    shortname: "U6-In-Wall",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-enterprise-3": {
    name: "Access Point WiFi 6 Enterprise",
    image: "/images/products/wifi-6-enterprise.png",
    id: "unifi-enterprise-3",
    shortname: "U6-Enterprise",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "nano-switch-3": {
    name: "NanoSwitch",
    image: "/images/products/nano-switch.png",
    id: "nano-switch-3",
    shortname: "NanoSwitch",
    productLine: "UniFI Access",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-lte-3": {
    name: "UniFi LTE",
    image: "/images/products/unifi-lte.png",
    id: "unifi-lte-3",
    shortname: "UniFi-LTE",
    productLine: "UniFI LTE",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-in-wall-4": {
    name: "Access Point WiFi 6 In-Wall",
    image: "/images/products/wifi-6-in-wall.png",
    id: "unifi-in-wall-4",
    shortname: "U6-In-Wall",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-enterprise-4": {
    name: "Access Point WiFi 6 Enterprise",
    image: "/images/products/wifi-6-enterprise.png",
    id: "unifi-enterprise-4",
    shortname: "U6-Enterprise",
    productLine: "UniFI",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "nano-switch-4": {
    name: "NanoSwitch",
    image: "/images/products/nano-switch.png",
    id: "nano-switch-4",
    shortname: "NanoSwitch",
    productLine: "UniFI Access",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  },
  "unifi-lte-4": {
    name: "UniFi LTE",
    image: "/images/products/unifi-lte.png",
    id: "unifi-lte-4",
    shortname: "UniFi-LTE",
    productLine: "UniFI LTE",
    maxPower: 25,
    speed: 2400,
    numOfPorts: 5
  }
}

export const getProduct = async (id: string): Promise<Product> => {
  if (API_ENDPOINT !== "") {
    const data = await fetch(`${API_ENDPOINT}products/${id}`)
    const product = productSchema.safeParse(await data.json())

    if (product.success) return product.data
    else throw new Error("Malformed product data")
  }
  return FAKE_DATA[id]
}

export const getProducts = async (filter?: ProductLines[], search?: string): Promise<ProductList> => {
  let products: Product[] = API_ENDPOINT ? [] : Object.values(FAKE_DATA)
  if (API_ENDPOINT !== "") {const data = await fetch(`${API_ENDPOINT}products?${filter && "filter="+filter+"/"}${search && "search="+search}`)
    const productList = productListSchema.safeParse(await data.json())

    if (productList.success) products = productList.data
    else throw new Error("Malformed product data")
  } else {
    if (filter) {
      for (const f of filter) {
        products = products.filter((v) => v.productLine === f)
      }
    }

    if (search) {
      products = products.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
    }
  }

  return products
}