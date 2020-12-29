import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import i18n from '@/plugins/i18n';
import store from '@/store/index';
import RouterView from '@/views/RouterView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:locale',
    component: RouterView,
    beforeEnter: (to, from, next) => {
      const { locale } = to.params;
      if (!i18n.availableLocales.includes(locale)) {
        next(`${i18n.locale}${to.fullPath}`);
      } else {
        i18n.locale = locale;
      }
      return next();
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect() {
      return i18n.locale;
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
