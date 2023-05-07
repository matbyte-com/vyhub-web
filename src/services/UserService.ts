export default {
  userTypeIcons: {
    CENTRAL: '$vyhub',
    STEAM: 'mdi-steam',
    DISCORD: 'mdi-discord',
    MINECRAFT: 'mdi-minecraft',
    TEAMSPEAK3: '$teamspeak',
    FIVEM: 'mdi-alpha-v-circle',
  },
  userExternalLink(type: string, id: string) {
    switch (type) {
      case 'STEAM':
        return `https://steamcommunity.com/profiles/${id}`;
      case 'DISCORD':
        return `https://discord.com/users/${id}`;
      case 'MINECRAFT':
        return `https://namemc.com/profile/${id}`;
      default:
        return null;
    }
  },
};
