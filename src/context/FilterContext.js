import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducers"

const filterInitialState = {
    productList: [],
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    ratings: null
}

export const FilterContext = createContext(filterInitialState)

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState)

    const initialProductList = (products) => {
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products
            }
        })
    }

    const bestSeller = (products) => {
        return state.bestSellerOnly ? products.filter(prod => prod.best_seller === true) : products
    }

    const inStock = (products) => {
        return state.onlyInStock ? products.filter(prod => prod.in_stock === true) : products
    }

    const sort = (products) => {
        if (state.sortBy === "l2h") {
            return products.sort((a, b) => Number(a.price) - Number(b.price))
        }
        if (state.sortBy === "h2l") {
            return products.sort((a, b) => Number(b.price) - Number(a.price))
        }
        return products
    }

    const rating = (products) => {
        if (state.ratings === "4SA") {
            return products.filter(prod => prod.rating >= 4)
        }
        if (state.ratings === "3SA") {
            return products.filter(prod => prod.rating >= 3)
        }
        if (state.ratings === "2SA") {
            return products.filter(prod => prod.rating >= 2)
        }
        if (state.ratings === "1SA") {
            return products.filter(prod => prod.rating >= 1)
        }
        return products
    }

    const filteredProductList = rating(sort(inStock(bestSeller(state.productList))))

    const value = {
        state,
        dispatch,
        products: filteredProductList,
        initialProductList
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)