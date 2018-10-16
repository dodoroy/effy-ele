import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Msite from './views/Msite.vue'
import Food from './views/Food.vue'
import Shop from './views/Shop.vue'
import ShopDetail from './views/ShopDetail.vue'
import ShopFoodDetail from './views/ShopFoodDetail.vue'
import Search from './views/Search.vue'
import Order from './views/Order.vue'
import Checkout from './views/Checkout.vue'
import CheckoutPayment from './views/CheckoutPayment.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Address from './views/Address.vue'
import AddressAdd from './views/AddressAdd.vue'

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
      path: '/shop/shopDetail',
      name: '',
      component: ShopDetail,
    },
    {
      path: '/shop/foodDetail',
      name: '',
      component: ShopFoodDetail,
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
      path: '/checkout',
      name: '',
      component: Checkout,
      children: [
        {
          path: 'payment',
          component: CheckoutPayment
        }
      ]
    },
    {
      path: '/checkout/address',
      name: '',
      component: Address,
    },
    {
      path: '/checkout/address/add',
      name: '',
      component: AddressAdd,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/profile/address',
      name: '',
      component: Address,
    },
    {
      path: '/profile/address/add',
      name: '',
      component: AddressAdd,
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
