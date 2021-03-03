/**
 * This is a mixin which checks if a user possesses a given property
 * This mixin is registered in the App.vue
 * It can be used out of any component by calling $checkProp(prop: string)
 */
import store from '@/store/index';
import PropertyService from '@/services/PropertyService';

export default {
  methods: {
    $checkProp(prop: PropertyService, bundleId?: string): boolean {
      /**
       * return True if user is admin
       */
      if (store.getters.user.is_admin === true) {
        return true;
      }

      const { properties } = store.getters;

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
