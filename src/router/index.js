import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index'
import Login from '@/views/Login/Login'
import Home from '@/views/Home'

const Goods = () => import('../views/Goods/index.vue')
const Params = () => import('../views/Params/index.vue')
const Specifications = () =>import('../views/Params/paramsinfo/Specifications.vue')
const Order = () => import('../views/Order/index.vue')
const Avater = () => import('../views/Avater/index.vue')
const OrderList= () => import('../views/Order/orderlist.vue')
const Orderback= () => import('../views/Order/orderback.vue')
const User =() => import('@/views/User/index.vue')

//子级路由
const AddGoods = ()=> import('../views/Goods/Addgoods.vue')
Vue.use(VueRouter)

const routes = [
  { 
    path: '', 
    component: Layout,
    meta: { 
      isLogin:true
     },
    children:[
      {
        path:'/',
        name: Home,
        component: Home,
      },
      {
        path:'/goods',
        name: Goods,
        component: Goods
      },
      {
        path:'/addgoods',
        name: AddGoods,
        component: AddGoods
      },
      {
        path:'/params',
        name: Params,
        component: Params,
        redirect:'/params/specifications',
        children:[
          {
            path:'specifications',
            name:Specifications,
            component:Specifications
          }
        ]
      },{
        path:'/avater',
        name: Avater,
        component: Avater
      },
      {
        path:'/order',
        name: Order,
        component: Order,
        redirect: '/order/orderlist',
        children:[
          {
            path:'orderlist',
            component: OrderList
          },{
            path:'orderback',
            component: Orderback
          }
        ]
      },
      {
        path:'/user',
        name: User,
        component: User
      },
    ]
    },
  { 
    path: '/login', 
    name: Login,
    component: Login
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
