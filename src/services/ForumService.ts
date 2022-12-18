import store from '@/store';

export interface UserModel {
  id: string; // uuid
}

export default {
  methods: {
    $checkTopicAdmin(admins: UserModel[]): boolean {
      const { user } = store.getters;
      if (user == null) return false;
      return admins.some((el) => el.id === user.id);
    },
  },
};
