export const getProductList = async (searchTerm) => {
    const resp = await fetch(`${process.env.REACT_APP_HOST}/444/products?name_like=${searchTerm || ""}`)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const data = await resp.json()
    return data
}

export const getProduct = async (id) => {
    const resp = await fetch(`${process.env.REACT_APP_HOST}/444/products/${id}`)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const data = await resp.json()
    return data
}

export const getFeaturedList = async () => {
    const resp = await fetch(`${process.env.REACT_APP_HOST}/444/featured_products`)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const data = await resp.json()
    return data
}