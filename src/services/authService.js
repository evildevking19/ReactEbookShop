export const login = async (authDetail) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authDetail)
    }

    const resp = await fetch(`${process.env.REACT_APP_HOST}/login`, requestOptions)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const result = await resp.json()

    if (result.accessToken) {
        sessionStorage.setItem("token", JSON.stringify(result.accessToken))
        sessionStorage.setItem("cbid", JSON.stringify(result.user.id))
    }

    return result
}

export const register = async (authDetail) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(authDetail)
    }

    const resp = await fetch(`${process.env.REACT_APP_HOST}/register`, requestOptions)
    if (!resp.ok) {
        throw new Error({ message: resp.statusText, status: resp.status })
    }
    const result = await resp.json()

    if (result.accessToken) {
        sessionStorage.setItem("token", JSON.stringify(result.accessToken))
        sessionStorage.setItem("cbid", JSON.stringify(result.user.id))
    }

    return result
}

export const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("cbid")
}