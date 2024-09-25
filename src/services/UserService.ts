import openapi from '@/api/openapi';
import store from '@/store';

export default {
  userTypeIcons: {
    CENTRAL: 'custom:vyhub',
    STEAM: 'mdi-steam',
    DISCORD: 'custom:discord',
    MINECRAFT: 'mdi-minecraft',
    TEAMSPEAK3: 'custom:teamspeak',
    FIVEM: 'custom:fivem',
    ASA: 'custom:asa',
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rsp = await (await openapi).user_getMemberships({ uuid: user_id, active: true });
    store.commit('SET_USER_MEMBERSHIPS', rsp.data);
  },
};
