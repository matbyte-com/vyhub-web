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
};
