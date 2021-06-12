/**
 * This is a mixin which checks if a user possesses a given property
 * This mixin is registered in the App.vue
 * It can be used out of any component by calling $checkProp(prop: string)
 * When the optional Parameter Bundle is given the Property has to exist in the given bundle
 */
import store from '@/store/index';
import Properties from '@/services/PropertyService';

export default {
  methods: {
    $checkProp(prop: Properties, bundleId?: string): boolean {
      /**
       * return True if user is admin
       */

      // TODO: Replace with default group properties (in backend)
      if (!store.getters.isLoggedIn) {
        return true;
      }

      if (store.getters.user.admin === true) {
        return true;
      }

      const { properties } = store.getters;

      if (properties == null) {
        return false;
      }

      /**
       * return bool depending if Optional[bundleId] is set
       */
      if (bundleId) {
        return properties
          .some((el: any) => el.name === prop && el.serverbundle_id === bundleId);
      }
      return properties.some((el: { name: string }) => el.name === prop);
    },
  },
};