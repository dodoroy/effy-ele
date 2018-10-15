import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Msite from './views/Msite.vue'
import Food from './views/Food.vue'
import Shop from './views/Shop.vue'
import Search from './views/Search.vue'
import Order from './views/Order.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/city/:cityid',
            name: 'city',
            component: City,
        },
        {
            path: '/msite',
            name: 'msite',
            component: Msite,
        },
        {
            path: '/food',
            name: 'food',
            component: Food,
        },
        {
            path: '/shop',
            name: 'shop',
            component: Shop,
        },
        {
            path: '/search/:geohash',
            name: 'search',
            component: Search,
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
})
