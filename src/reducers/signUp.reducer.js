const signUp = (state = {}, action) => {
    switch (action.type) {
        case 'SUBMIT_SIGN_UP' :
            return {
                ...state
            }
        default :
            return state
    }
}

export default signUp