import {userAPI} from "../../Components/Api/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState


const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case  GET_CAPTCHA_URL_SUCCESS : {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captcha: string | null): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth, captcha}
});

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

export const toAuth = () => {
    return async (dispatch: any) => {
        let response = await userAPI.auth()

        if (response.data.resultCode === 0) {
            let {id, login, email, captcha} = response.data.data;

            dispatch(setAuthUserData(id, email, login, true, captcha))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        // @ts-ignore
        let response = await userAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(toAuth())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
            dispatch(stopSubmit('login', {_error: message,}))

        }
    }
}

export const LogOut = () => {
    return async (dispatch: any) => {
        let response = await userAPI.logOut()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false, null))
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let response = await userAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
}

export default authReducer;
