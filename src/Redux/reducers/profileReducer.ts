import {profileAPI, userAPI} from "../../Components/Api/Api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type PostType = {
    id: number
    message: string
    likesCount: number
}

type ContactsType = {
    gitHub: string
    vk: string
    facebook: string
    twitter: string
    website: string
    youtube: string
    mainlink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type InitialStateType = typeof initialState

let initialState = {
    posts: [
        {id: 1, message: 'How are you?', likesCount: 12},
        {id: 2, message: 'its my first post', likesCount: 11},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {
                id: 3,
                message: action.postValue,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default :
            return state;
    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    postValue: string
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type  DeletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const addPostActionCreator = (postValue: string): AddPostActionCreatorActionType => ({type: ADD_POST, postValue})
export const deletePost = (id: number): DeletePostActionType => ({type: DELETE_POST, id})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getProfile = (userId: number) => {
    return async (dispatch: any) => {
        let response = await userAPI.getProfile(userId)

        dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)

        dispatch(setStatus(response.data))
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}

export const savePhoto = (file:any) => {
    return async (dispatch:any) => {
        let response = await profileAPI.savePhoto(file)

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export default profileReducer;
