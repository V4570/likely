import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export default new Vuex.Store({
    state:{
        status: '',
        token: localStorage.getItem('user-token') || '',
        expiresAt: null,
        user: {}
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status
    },
    mutations: {
        [LOGIN_REQUEST]: state => {
            state.status = 'loading'
        },
        [LOGIN_SUCCESS]: (state, resp) => {
            state.status = 'success'
            state.token = resp.token
            state.expiresAt = resp.expiresAt
            state.user = resp.user
        },
        [LOGIN_ERROR]: state => {
            state.status = 'error'
        },
        [LOGOUT]: state => {
            state.token = ''
        },
        [SIGNUP_REQUEST]: state => {
            state.status = 'loading'
        },
        [SIGNUP_SUCCESS]: state => {
            state.status = 'success'
        },
        [SIGNUP_ERROR]: state => {
            state.status = 'error'
        }
    },
    actions: {
        [LOGIN_REQUEST]: ({commit}, user) => {
            return new Promise( (resolve, reject) => {
                commit(LOGIN_REQUEST)
                const loginOptions = {
                    method: 'POST',
                    url: "/api/login",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        username: user.username,
                        password: user.password
                    }
                }
                axios(loginOptions).then(response => {
                    localStorage.setItem("user-token", response.data.token)
                    commit(LOGIN_SUCCESS, response.data)
                    resolve(response)
                }).catch(e => {
                    commit(LOGIN_ERROR)
                    localStorage.removeItem("user-token")
                    reject(e)
                })
            })
        },
        [LOGOUT]: ({commit}) => {
            return new Promise(resolve => {
                commit(LOGOUT)
                localStorage.removeItem('user-token')
                resolve()
            })
        },
        [SIGNUP_REQUEST]: ({commit}, user) => {
            return new Promise((resolve, reject) => {
                commit(SIGNUP_REQUEST)
                const signupOptions = {
                    method: 'POST',
                    url: "/api/signup",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    data: {
                        email: user.email,
                        username: user.username,
                        password: user.password
                    }
                }

                axios(signupOptions).then(response => {
                    commit(SIGNUP_SUCCESS)
                    resolve(response)
                }).catch(e => {
                    commit(SIGNUP_ERROR)
                    reject(e)
                })
            })
        }
    }
})