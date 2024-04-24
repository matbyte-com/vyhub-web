import store from '@/store';

export interface UserModel {
  id: string; // uuid
  memberships: { group: { id: string } }[];
}

export default {
  methods: {
    $checkTopicAdmin(admins: UserModel[], specificUser: UserModel | null): boolean {
      // eslint-disable-next-line no-param-reassign
      specificUser = specificUser || store.getters.user;
      if (specificUser && admins.some((admin) => admin.id === specificUser?.id)) {
        return true;
      }

      const memberships = specificUser?.memberships || store.getters.userMemberships;
      if (!memberships) return false;
      const adminGroupIds = admins.map((admin) => admin.id);
      return memberships.some((membership: {
        group: { id: string; }; }) => adminGroupIds.includes(membership.group.id));
    },
    $checkIsForumBanned(): boolean {
      const { properties } = store.getters;
      return properties?.some((property: { name: string, granted: boolean }) => property.name === 'forum_post' && !property.granted) || false;
    },
  },
};
