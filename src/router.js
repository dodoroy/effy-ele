import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Msite from './views/Msite.vue'
import Food from './views/Food.vue'
import Shop from './views/Shop.vue'
import ShopDetail from './views/ShopDetail.vue'
import ShopDetailSafe from './views/ShopDetailSafe.vue'
import ShopFoodDetail from './views/ShopFoodDetail.vue'
import Search from './views/Search.vue'
import Order from './views/Order.vue'
import OrderDetail from './views/OrderDetail.vue'
import Checkout from './views/Checkout.vue'
import CheckoutRemark from './views/CheckoutRemark.vue'
import CheckoutPayment from './views/CheckoutPayment.vue'
import Profile from './views/Profile.vue'
import ProfileInfo from './views/ProfileInfo.vue'
import ProfileInfoUsername from './views/ProfileInfoUsername.vue'
import Login from './views/Login.vue'
import Forget from './views/Forget.vue'
import Address from './views/Address.vue'
import AddressAdd from './views/AddressAdd.vue'
import AddressSearch from './views/AddressSearch.vue'
import Download from './views/Download.vue'
import { getOrderDetail } from './service/getData'

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
      children: [
        {
          path: 'shopDetail',
          name: '',
          component: ShopDetail,
          children: [
            {
              path: 'shopSafe',
              component: ShopDetailSafe
            }
          ]
        },
        {
          path: 'foodDetail',
          name: '',
          component: ShopFoodDetail,
        },
      ]
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
      children: [
        {
          path: 'orderDetail',
          component: OrderDetail,
        }
      ]
    },

    {
      path: '/checkout',
      name: '',
      component: Checkout,
      children: [
        {
          path: 'remark',
          component: CheckoutRemark
        },
        {
          path: 'payment',
          component: CheckoutPayment
        },
        {
          path: 'address',
          name: '',
          component: Address,
          children: [
            {
              path: 'add',
              name: '',
              component: AddressAdd,
            },
            {
              path: 'search',
              name: '',
              component: AddressSearch,
            }
          ],
        },

      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      children: [
        {
          path: 'info',
          component: ProfileInfo,
          children: [
            {
              path: 'username',
              component: ProfileInfoUsername
            }
          ]

        },
        {
          path: 'address',
          name: '',
          component: Address,
          children: [
            {
              path: 'add',
              name: '',
              component: AddressAdd,
            },
          ]
        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
    },
    {
      path: '/download',
      name: '',
      component: Download,
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
