/**
 * This is a mixin which checks if a user possesses a given property
 * This mixin is registered in the App.vue
 * It can be used out of any component by calling $checkProp(prop: string)
 * When the optional Parameter Bundle is given the Property has to exist in the given bundle
 */
import store from '@/store/index';
import config from '@/config';

interface Property {
  name: string
  granted: boolean
  value: string
  user_id: string
}

export default {
  methods: {
    $checkProp(prop: string, bundleId?: string): boolean {
      // return True if user is admin
      if (store.getters.isLoggedIn) {
        if (store.getters.user.admin === true) {
          return true;
        }

        if (config.demo_mode) {
          return true;
        }
      }

      if (prop === null) {
        return true;
      }

      const { properties } = store.getters;

      if (properties == null) {
        return false;
      }

      // return bool depending if Optional[bundleId] is set
      if (bundleId) {
        throw Error('Not implemented.');
        // TODO: Get properties by severbundle from backend
        // return properties
        //  .some((el: Property) => el.name === prop && el.serverbundle_id === bundleId
        //  && el.granted);
      }
      return properties.some((el: Property) => el.name === prop && el.granted);
    },
  },
};
