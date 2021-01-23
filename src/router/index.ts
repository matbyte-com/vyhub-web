import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect() {
      if (store.getters.isLoggedIn) {
        const userName = store.getters.user.username;
        return `/dashboard/${userName}`;
      }
      return { path: '/', query: { login: 'true' } };
    },
  },
  {
    path: '/dashboard/:uName',
    name: 'UserDashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ban',
    name: 'Bans',
    component: () => import('@/views/Ban.vue'),
    meta: { requiresAuth: true },
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

export default router;
