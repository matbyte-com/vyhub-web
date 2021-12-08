export default {
  userTypeIcons: {
    CENTRAL: 'mdi-image-filter-center-focus-strong',
    STEAM: 'mdi-steam',
    DISCORD: 'mdi-discord',
  },
  userExternalLink(type: string, id: string) {
    switch (type) {
      case 'STEAM':
        return `https://steamcommunity.com/profiles/${id}`;
      case 'DISCORD':
        return `https://discord.com/users/${id}`;
      default:
        return null;
    }
  },
};
