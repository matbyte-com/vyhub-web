import store from '@/store';

export interface UserModel {
  id: string; // uuid
}

export default {
  methods: {
    $checkTopicAdmin(admins: UserModel[], specificUser: UserModel | null): boolean {
      const { userMemberships } = store.getters;

      if (specificUser && admins.some((admin) => admin.id === specificUser.id)) {
        return true;
      }

      if (userMemberships == null) return false;
      const adminGroupIds = admins.map((admin) => admin.id);
      // eslint-disable-next-line max-len
      return userMemberships?.some((membership: {
        group: { id: string; };
      }) => adminGroupIds.includes(membership.group.id));
    },
    $checkIsForumBanned(): boolean {
      const { properties } = store.getters;
      if (properties == null) return false;
      return properties.some((property: { name: string }) => property.name === 'forum_post');
    },
  },
};
