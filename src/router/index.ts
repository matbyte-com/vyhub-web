import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Nyx Web' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { title: 'Dashboard' },
    redirect() {
      if (store.getters.isLoggedIn) {
        const userName = store.getters.user.username;
        return `/dashboard/${userName}`;
      }
      return { path: '/', query: { login: 'true' } };
    },
  },
  {
    path: '/dashboard/:id',
    name: 'UserDashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: 'About' },
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/settings/:component?',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true, title: 'Settings' },
  },
  {
    path: '/ban/:banId?',
    name: 'Bans',
    component: () => import('@/views/Ban.vue'),
    meta: { title: 'Bans' },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop/Start.vue'),
    meta: { title: 'Shop' },
  },
  {
    path: '/shop/category/:categoryId',
    name: 'ShopCategory',
    component: () => import('@/views/Shop/Category.vue'),
    meta: { title: 'Shop - Category' },
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: { title: 'Cart' },
    component: () => import('../views/Shop/Cart.vue'),
  },
  {
    path: '*',
    name: '404 Path not found',
    redirect() {
      return '/';
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.query.login !== 'true') && (to.matched.some((record) => record.meta.requiresAuth))) {
    // this route requires auth
    if (!store.getters.isLoggedIn) {
      next({
        path: to.fullPath,
        query: { login: 'true' },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const DEFAULT_TITLE = process.env.VUE_APP_DEFAULT_TITLE;
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
