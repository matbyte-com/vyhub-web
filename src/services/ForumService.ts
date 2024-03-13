import store from '@/store';

export interface UserModel {
  id: string; // uuid
  memberships: { group: { id: string } }[];
}

export default {
  methods: {
    $checkTopicAdmin(admins: UserModel[], specificUser: UserModel | null): boolean {
      if (specificUser && admins.some((admin) => admin.id === specificUser.id)) {
        return true;
      }

      let memberships = null;
      if (specificUser) {
        memberships = specificUser.memberships;
      } else {
        memberships = store.getters.userMemberships;
      }
      if (memberships == null) return false;
      const adminGroupIds = admins.map((admin) => admin.id);
      return memberships?.some((membership: {
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
