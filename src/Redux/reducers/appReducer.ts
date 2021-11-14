import {toAuth} from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false,
}

const authInitReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED
}

export const setInitializedSuccess = (): InitializedSuccessActionType => ({type: SET_INITIALIZED});

export const initialize = () => {
    return (dispatch: any) => {
        let promise = dispatch(toAuth());

        promise.then(() => {
            dispatch(setInitializedSuccess());
        })
    }
}

export default authInitReducer;
