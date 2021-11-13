import { stopSubmit } from "redux-form";
import { userAPI } from "../../Components/Api/Api";

const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        default: return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});

export const toAuth = () => {
    return async(dispatch) => {
        let response = await userAPI.auth()

        if (response.data.resultCode === 0 ) {
            let {id, login, email,} = response.data.data;

            dispatch(setAuthUserData(id, email, login, true))
        }
        }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await userAPI.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(toAuth())
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
                dispatch(stopSubmit('login', {_error: message,}))
            }
    }
}

export const LogOut = () => {
    return async(dispatch) => {
        let response = await userAPI.logOut()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
    }
}

export default authReducer;