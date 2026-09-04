import openapi from '@/api/openapi';
import { useVyHubStore } from '@/store';

const store = useVyHubStore();

export default {
  userTypeIcons: {
    CENTRAL: 'custom:vyhub',
    STEAM: 'custom:steam',
    DISCORD: 'custom:discord',
    MINECRAFT: 'custom:minecraft',
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
    if (!store.user) return;
    const user_id = store.user.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rsp = await (await openapi).user_getMemberships({ uuid: user_id, active: true });
    store.userMemberships = rsp.data;
  },
};
