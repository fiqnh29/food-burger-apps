const INITIAL_STATE = {
    username: '',
    email: '',
    role: '',
    password: '',
    voucher:[],
    cart: [],
    id: 0
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                role: action.payload.role,
                cart: action.payload.cart,
                voucher: action.payload.voucher,
            }
        case 'LOGOUT':
            return INITIAL_STATE
        case 'ADD_TO_CART':
            return{
                ...state,
                cart: action.payload
            }
        case 'ADD_TO_VOUCHER':
            return{
                ...state,
                voucher: action.payload
            }
        default:
            return INITIAL_STATE
    }
}
export default authReducer;