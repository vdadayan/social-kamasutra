import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "720e621c-22bc-48be-a9e1-c157c873fe78"
    }
})

export const userAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow (userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile (userId) {
        console.warn('please use profileAPI')
        return profileAPI.getProfile(userId)
    },
    auth() {
        return instance.get(`auth/me`)
    },
    login (email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logOut () {
        return instance.delete('auth/login')
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get("profile/" + userId)
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put('profile/status/' ,{status: status})
    }
}