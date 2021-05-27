const initialState = {
    user: {},
    isError : false,
    isSuccessAdd : false
}


const basicInfoReducer = (state = initialState, action)=>{
    if (action.type === 'GET_USER') {
        return{
            ...state,
            user : action.payload,
            isError : action.isError
        }
    }
    if (action.type === 'ADD_USER') {
        return{
            ...state,
            isSuccessAdd : action.isSuccessAdd
        }
    }
    return state

}

export default basicInfoReducer