import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Product.vue'),
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/products/:id',
    name: 'product-show',
    component: () => import('../views/ProductShow.vue'),
    meta: {
      requiresAuth: true
    },
    props: true,
    async beforeEnter(to, from, next) {
      try {
        const product = await store.dispatch('product/getProduct', to.params.id)
        to.params.product = product
        next()
      } catch (err) {
        console.log('Product/:id beforeEnter: ', err)
      }
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
    return
  } else {
    next()
  }
})
