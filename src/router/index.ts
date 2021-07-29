import Vue from 'vue';
import VueRouter, { RouteConfig, RawLocation, Route } from 'vue-router';
import store from '@/store/index';
import i18n from '@/plugins/i18n';
import UtilService from '@/services/UtilService';
import AuthService from '@/services/AuthService';
import config from '@/config';

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
    meta: { title: i18n.t('pageTitle.dashboard'), requiresAuth: true },
    redirect(to) {
      if (store.getters.isLoggedIn) {
        return {
          path: `/user/${store.getters.user.id}`,
        };
      }
      return {
        path: '/',
        query: {
          login: 'true',
          return_url: UtilService.data().utils.getFullUrl('/dashboard'),
          ...to.query,
        },
      };
    },
  },
  {
    path: '/user/:id',
    name: 'UserDashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: i18n.t('pageTitle.about') },
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/settings/:component?',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true, title: i18n.t('pageTitle.settings') },
  },
  {
    path: '/bans/:banId?',
    name: 'Bans',
    meta: { title: i18n.t('pageTitle.bans') },
    component: () => import('@/views/Ban.vue'),
  },
  {
    path: '/warnings/:warningId?',
    name: 'Warnings',
    meta: { title: i18n.t('pageTitle.warnings') },
    component: () => import('@/views/Warning.vue'),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop/Start.vue'),
    meta: { title: i18n.t('pageTitle.shop') },
  },
  {
    path: '/shop/category/:categoryId',
    name: 'ShopCategory',
    component: () => import('@/views/Shop/Category.vue'),
    meta: { title: i18n.t('pageTitle.shopCategory') },
  },
  {
    path: '/shop/packet/:packetId',
    name: 'ShopPacket',
    component: () => import('@/views/Shop/Packet.vue'),
    meta: { title: i18n.t('pageTitle.shopPacket') },
  },
  {
    path: '/shop/cart',
    name: 'ShopCart',
    meta: { title: i18n.t('pageTitle.shopCart'), requiresAuth: true },
    component: () => import('../views/Shop/Cart.vue'),
  },
  {
    path: '/shop/checkout/:debitId/:action',
    name: 'ShopCheckout',
    meta: { title: i18n.t('pageTitle.shopCheckout'), requiresAuth: true },
    component: () => import('../views/Shop/Checkout.vue'),
  },
  {
    path: '/shop/admin/:component?',
    name: 'ShopAdmin',
    component: () => import('@/views/Shop/Admin.vue'),
    meta: { requiresAuth: true, title: i18n.t('pageTitle.shopAdministration') },
  },
  {
    path: '/cms/:title',
    name: 'Cms',
    component: () => import('../views/UserCmsHtml.vue'),
  },
  {
    path: '/notification',
    name: 'Notification',
    meta: { title: i18n.t('pageTitle.notifications'), requiresAuth: true },
    component: () => import('../views/Notification.vue'),
  },
  {
    path: '/log',
    name: 'Log',
    meta: { title: i18n.t('pageTitle.log'), requiresAuth: true },
    component: () => import('../views/Log.vue'),
  },
  {
    path: '/legal',
    name: 'Legal',
    meta: { title: i18n.t('pageTitle.legal') },
    component: () => import('../views/Legal.vue'),
  },
  {
    path: '*',
    name: '404 Path not found',
    redirect() {
      return '/';
    },
  },
];

// Restrict Error Message for Duplicated Navigation on Router.to and Router.replace methods
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
  return new Promise((resolve, reject) => {
    originalPush.call(this, location, () => {
      // on complete

      resolve(this.currentRoute);
    }, (error) => {
      // on abort

      // only ignore NavigationDuplicated error
      if (error.name === 'NavigationDuplicated') {
        resolve(this.currentRoute);
      } else {
        reject(error);
      }
    });
  });
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location: RawLocation): Promise<Route> {
  return new Promise((resolve, reject) => {
    originalReplace.call(this, location, () => {
      // on complete

      resolve(this.currentRoute);
    }, (error) => {
      // on abort

      // only ignore NavigationDuplicated error
      if (error.name === 'NavigationDuplicated') {
        resolve(this.currentRoute);
      } else {
        reject(error);
      }
    });
  });
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

function showLoginDialog(to: Route, from: Route) {
  router.push({
    path: from.path,
    query: { login: 'true', return_url: UtilService.data().utils.getFullUrl(to.fullPath) },
  });
}

// Handle Route requires Login
router.beforeEach((to, from, next) => {
  const refreshToken = to.query.refresh_token;

  if (refreshToken != null && typeof refreshToken === 'string') {
    AuthService.login(refreshToken).then(() => {
      console.log('Successful login!');
      next();
    }).catch((e) => {
      console.log(e);
      showLoginDialog(to, from);
    });
  } else if ((to.query.login !== 'true')
    && (to.matched.some((record) => record.meta.requiresAuth))) {
    // this route requires auth
    if (!store.getters.isLoggedIn) {
      console.log('Showing login dialog.');
      showLoginDialog(to, from);
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to != null && to.meta != null && to.meta.title != null) {
      document.title = to.meta.title;
    } else {
      document.title = config.default_title;
    }
  });
});

export default router;
