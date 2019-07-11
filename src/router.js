import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import Employee from './components/Employee'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addnew',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "addnew" */ './views/AddNew.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/emp',
      name: 'Employee',
      component: Employee
    },
    // {
    //   path: '/add',
    //   name: 'AddNewEmployee',
    //   component: () => import(/* webpackChunkName: "addnewemployee" */ './components/AddNewEmployee')
    // },
    // {
    //   path: '/edit/:id',
    //   name: 'EditEmployee',
    //   component: () => import(/* webpackChunkName: "editemployee" */ './components/EditEmployee'),
    // }, 
    {
      path: '/edit/:id',
      name: 'EditEmployee',
      component: () => import(/* webpackChunkName: "editemployee" */ './components/FormEmployee'),
    },
    {
      path: '/add',
      name: 'AddNewEmployee',
      component: () => import(/* webpackChunkName: "editemployee" */ './components/FormEmployee'),
    }
  ]
})
