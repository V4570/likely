import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from "@/components/Signup";
import store from '@/store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next('/login');
        return;
    }
    next();
};

const ifAuthenticatedLogin = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next('/');
        return;
    }
    next();
}


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifAuthenticatedLogin
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
            beforeEnter: ifAuthenticatedLogin
        }
    ]
})