import openapi from '@/api/openapi';
import store from '@/store';

export default {
  userTypeIcons: {
    CENTRAL: '$vyhub',
    STEAM: 'mdi-steam',
    DISCORD: '$discord',
    MINECRAFT: 'mdi-minecraft',
    TEAMSPEAK3: '$teamspeak',
    FIVEM: '$fivem',
    ASA: '$asa',
  },
  userExternalLink(type: string, id: string) {
    switch (type) {
      case 'STEAM':
        return `https://steamcommunity.com/profiles/${id}`;
      case 'DISCORD':
        return `https://discord.com/users/${id}`;
      case 'MINECRAFT':
        return `https://namemc.com/profile/${id}`;
      case 'RUST':
        return `https://ruststats.gg/rust-stats/user/${id}`;
      default:
        return null;
    }
  },
  async setUserMemberships() {
    if (!store.getters.user) return;
    const user_id = store.getters.user.id;
    const rsp = await (await openapi).user_getMemberships(user_id);
    store.commit('SET_USER_MEMBERSHIPS', rsp.data);
  },
};
