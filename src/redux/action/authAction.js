export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const addToCart = (data) => {
    return{
        type: 'ADD_TO_CART',
        payload: data
    }
}
export const addToVoucher = (data) => {
    return{
        type: 'ADD_TO_VOUCHER',
        payload: data
    }
}