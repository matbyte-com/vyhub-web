import Vue from 'vue';
import VueRouter, { RouteConfig, RawLocation, Route } from 'vue-router';
import store from '@/store/index';
import i18n from '@/plugins/i18n';
import UtilService from '@/services/UtilService';
import AuthService from '@/services/AuthService';
import AccessControlService from '@/services/AccessControlService';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Start',
    meta: { noContainer: true, noHeader: true },
    component: () => import('../views/Start.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { noContainer: true, noHeader: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/news',
    name: 'News',
    meta: { title: i18n.t('_pageTitle.news') },
    component: () => import('../views/News.vue'),
  },
  {
    path: '/user',
    name: 'Dashboard',
    meta: { title: i18n.t('_pageTitle.dashboard'), requiresAuth: true },
    component: () => import('../views/Redirect/Dashboard.vue'),
  },
  {
    path: '/user/:id/:component?',
    name: 'UserDashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/profile/:type/:id',
    name: 'UserProfile',
    component: () => import('../views/Redirect/UserProfile.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/settings/:component?',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      requiresAuth: true,
      title: i18n.t('_pageTitle.settings'),
      reqProp: 'admin_menu',
      noContainer: true,
    },
  },
  {
    path: '/bans/:banId?',
    name: 'Bans',
    meta: { title: i18n.t('_pageTitle.bans') },
    component: () => import('@/views/Ban.vue'),
  },
  {
    path: '/warnings/:warningId?',
    name: 'Warnings',
    meta: { title: i18n.t('_pageTitle.warnings') },
    component: () => import('@/views/Warning.vue'),
  },
  {
    path: '/shop',
    component: () => import('@/views/Shop/Start.vue'),
    children: [
      {
        path: '',
        name: 'Shop',
        component: () => import('@/views/Shop/Categories.vue'),
        meta: { title: i18n.t('_pageTitle.shop') },
      },
      {
        path: ':categoryId',
        name: 'ShopCategory',
        component: () => import('@/views/Shop/Category.vue'),
        meta: { title: i18n.t('_pageTitle.shopCategory') },
      },
    ],
  },
  {
    path: '/cart',
    name: 'ShopCart',
    meta: { title: i18n.t('_pageTitle.shopCart'), requiresAuth: true },
    component: () => import('../views/Shop/Cart.vue'),
  },
  {
    path: '/shop/checkout/:debitId/:action',
    name: 'ShopCheckout',
    meta: { title: i18n.t('_pageTitle.shop'), requiresAuth: true },
    component: () => import('../views/Shop/Checkout.vue'),
  },
  {
    path: '/admin/shop/:component?',
    name: 'ShopAdmin',
    component: () => import('@/views/Shop/Admin.vue'),
    meta: { requiresAuth: true, title: i18n.t('_pageTitle.shopAdministration'), reqProp: 'admin_menu' },
  },
  {
    path: '/cms/:title',
    name: 'Cms',
    meta: { noContainer: true },
    component: () => import('../views/UserCmsHtml.vue'),
  },
  {
    path: '/notification',
    name: 'Notification',
    meta: { title: i18n.t('_pageTitle.notifications'), requiresAuth: true },
    component: () => import('../views/Notification.vue'),
  },
  {
    path: '/notification/:id',
    name: 'Notification Link',
    meta: { title: i18n.t('_pageTitle.notificationLink') },
    component: () => import('../views/NotificationLink.vue'),
  },
  {
    path: '/log',
    name: 'Log',
    meta: { title: i18n.t('_pageTitle.log'), requiresAuth: true },
    component: () => import('../views/Log.vue'),
  },
  {
    path: '/legal',
    name: 'Legal',
    meta: { title: i18n.t('_pageTitle.legal') },
    component: () => import('../views/Legal.vue'),
  },
  {
    path: '/ticket',
    name: 'Ticket',
    meta: { title: i18n.t('_pageTitle.ticket'), requiresAuth: true },
    component: () => import('../views/Ticket.vue'),
  },
  {
    path: '/ticket/:id',
    name: 'TicketThread',
    meta: { title: i18n.t('_pageTitle.ticket') },
    component: () => import('../views/TicketThread.vue'),
  },
  {
    path: '/forum/',
    name: 'Forum',
    meta: { title: i18n.t('_pageTitle.forum') },
    component: () => import('../views/Forum/Forum.vue'),
  },
  {
    path: '/forum/topic/:id',
    name: 'ForumTopic',
    meta: { title: i18n.t('_pageTitle.forum') },
    component: () => import('../views/Forum/ForumTopic.vue'),
  },
  {
    path: '/forum/thread/:id',
    name: 'ForumThread',
    meta: { title: i18n.t('_pageTitle.forum') },
    component: () => import('../views/Forum/ForumThread.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    meta: { title: i18n.t('_pageTitle.team') },
    component: () => import('../views/Team.vue'),
  },
  {
    path: '/server-dashboard/:id',
    name: 'ServerDashboard',
    meta: { title: i18n.t('_pageTitle.serverDashboard') },
    component: () => import('../views/ServerDashboard.vue'),
  },
  {
    path: '/faq',
    name: 'FAQ',
    meta: { title: i18n.t('_pageTitle.faq') },
    component: () => import('../views/FAQ.vue'),
  },
  {
    path: '*',
    name: '404 Path not found',
    redirect() {
      return '/news';
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

      // only ignore NavigationDuplicated and Redirected error
      if (VueRouter.isNavigationFailure(error, VueRouter.NavigationFailureType.redirected)
        || VueRouter.isNavigationFailure(error, VueRouter.NavigationFailureType.duplicated)) {
        // whatever, we are fine if it's aborted due to navigation redirect
        resolve(this.currentRoute);
      }
      reject(error);
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

      // only ignore NavigationDuplicated and Redirected error
      if (VueRouter.isNavigationFailure(error, VueRouter.NavigationFailureType.redirected)
        || VueRouter.isNavigationFailure(error, VueRouter.NavigationFailureType.duplicated)) {
        // whatever, we are fine if it's aborted due to navigation redirect
        resolve(this.currentRoute);
      }
      reject(error);
    });
  });
};

const router = new VueRouter({
  mode: 'history',
  base: '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

function showLoginDialog(to: Route, from: Route, link_refresh_token: string | null) {
  const return_url = UtilService.data().utils.getFullUrl(to.fullPath);

  if (link_refresh_token != null) {
    const query = { login: 'true', link_refresh_token };
    router.push({ path: from.path, query });
  } else {
    const query = { login: 'true', return_url };
    router.push({ path: from.path, query });
  }
}

// Handle Route requires Login
router.beforeEach(async (to, from, next) => {
  const refreshToken = to.query.refresh_token;

  let success = false;

  if (refreshToken != null && typeof refreshToken === 'string') {
    if (!store.getters.isLoggedIn) {
      // If user is not logged in, try to login with refresh token
      try {
        await AuthService.login(refreshToken);
        Vue.prototype.$notify({
          title: i18n.t('_login.messages.loginSuccess'),
          type: 'success',
        });
        success = true;
        console.log('Successful login!');
      } catch (e) {
        console.log(e);
        Vue.prototype.$notify({
          title: i18n.t('_login.messages.loginError'),
          type: 'error',
        });
        showLoginDialog(to, from, null);
      }
    } else {
      // If the user is already logged in, redirect to the same page with login=true
      // to trigger the login dialog to finish account linking
      const query = {
        ...to.query,
        login: 'true',
        link_refresh_token: refreshToken,
        refresh_token: undefined,
      };

      if (to.name != null) {
        next({ name: to.name, query, params: to.params });
      } else {
        next({ name: 'News', query });
      }
    }
  } else if ((to.query.login !== 'true')
    && (to.matched.some((record) => record.meta.requiresAuth))) {
    // If the route requires auth, user is not logged in and login is not true,
    // redirect to the same page with login=true
    if (!store.getters.isLoggedIn) {
      console.log('Showing login dialog.');
      showLoginDialog(to, from, null);
    } else {
      success = true;
    }
  } else {
    success = true;
  }

  if (success) {
    const reqProp = to?.meta?.reqProp;

    if (reqProp == null || AccessControlService.methods.$checkProp(reqProp)) {
      const query = { ...to.query };

      // If refresh_token is present, remove it from query
      if (!query.login && (query.refresh_token || query.link_refresh_token)) {
        delete query.refresh_token;
        delete query.link_refresh_token;

        if (to.name != null) {
          next({ name: to.name, query, params: to.params });
        } else {
          next({ name: 'News', query });
        }
      } else {
        next();
      }
    } else {
      console.log(`Property ${reqProp} missing.`);
      next({
        path: ('/'),
      });
    }
  }
});

const title = (store.getters.generalConfig?.community_name
  ? store.getters.generalConfig?.community_name : 'VyHub');

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to != null && to.meta != null && to.meta.title != null) {
      if (store.getters.generalConfig) {
        document.title = `${to.meta.title} - ${title}`;
      } else {
        document.title = to.meta.title;
      }
    } else {
      document.title = title;
    }
  });
});

export default router;
