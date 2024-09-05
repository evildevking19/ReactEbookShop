const getSession = () => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const cbid = JSON.parse(sessionStorage.getItem("cbid"))
    return { token, cbid }
}

export const getUser = async () => {
    const session = getSession()
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        }
    }
    const resp = await fetch(`http://localhost:8000/600/users/${session.cbid}`, requestOptions)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const result = await resp.json()
    return result
}

export const getUserOrders = async () => {
    const session = getSession()
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        }
    }
    const resp = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${session.cbid}`, requestOptions)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const result = await resp.json()
    return result
}

export const createOrder = async (cartList, total, user) => {
    const session = getSession()
    const order = {
        cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(order)
    }
    const resp = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, requestOptions)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const result = await resp.json()
    return result
}