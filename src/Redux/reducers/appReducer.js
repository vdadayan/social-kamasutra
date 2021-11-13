import { toAuth } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false,
}

const authInitReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state;
    }
}

export const setInitializedSucces = () => ({type: SET_INITIALIZED});

export const initialize = () => {
    return (dispatch) => {
        let promise = dispatch(toAuth());

        promise.then(() => {
            dispatch(setInitializedSucces());
        })
    }
}

export default authInitReducer;