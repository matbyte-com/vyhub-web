export default {
  userTypeIcons: {
    CENTRAL: 'mdi-image-filter-center-focus-strong',
    STEAM: 'mdi-steam',
    DISCORD: 'mdi-discord',
    MINECRAFT: 'mdi-minecraft',
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
