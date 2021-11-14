import {userAPI} from "../../Components/Api/Api";
import {updateObjectInArray} from "../../objects-helpers/helpers";
import {PhotosType} from "./profileReducer";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case UNFOLLOW : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.pageNumber,
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type SerUsersActionType = {
    type: typeof SET_USERS
    users: UserType
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
type ToogleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}


export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
export const serUsers = (users: UserType) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});
export const toogleIsFetching = (isFetching: boolean): ToogleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const getUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch:any) => {
        dispatch(toogleIsFetching(false));
        let response = await userAPI.getUsers(currentPage, pageSize)

        dispatch(toogleIsFetching(true));
        dispatch(serUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
}

const followUnfollowFlow = async (dispatch: any, userId : number, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSuccess)
    }
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSuccess)
    }
}

export default usersReducer;
