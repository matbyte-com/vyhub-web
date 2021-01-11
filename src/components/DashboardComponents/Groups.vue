<template>
  <div>
    <h1>Groups</h1>
    <div class="pb-4">
      <v-simple-table :hover="primary">
          <thead>
            <tr>
              <th class="text-left">
                Serverbundle
              </th>
              <th class="text-left">
                Gruppen
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                TTT
              </td>
              <td>
                <span v-for="(group, index) in groups" :key="index">
                  <v-chip
                    @mouseover="setActiveProps(group)"
                    @mouseleave="resetActives"
                    class="ml-1 mb-1 a secondary"
                    :class="checkGroups(group)"
                  >{{ group.name }}
                  </v-chip>
                </span>
              </td>
            </tr>
          </tbody>
      </v-simple-table>
    </div>
    <v-divider />
    <h3>Resultierende Properties:</h3>
    <div class="pb-4">
      <span v-for="(prop, index) in getProperties" :key="index" >
      <v-chip
        @mouseover="setActiveGroups(prop)"
        @mouseleave="resetActives"
        small
        class="ml-1 mb-1 a secondary"
        :class="checkProps(prop)"
      >{{ prop }}
      </v-chip>
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Groups',
  data() {
    return {
      activeProps: [],
      activeGroups: [],
      test: false,
      groups: [
        {
          name: 'admin', props: ['settings', 'dashboard', 'setting2'],
        },
        {
          name: 'user', props: ['123', '32', '45'],
        },
        {
          name: '123', props: ['12345', 'sdf', '45'],
        },
      ],
    };
  },
  methods: {
    toogletest() {
      if (this.test === true) {
        this.test = false;
      } else {
        this.test = true;
      }
    },
    resetActives() {
      this.activeProps = [];
      this.activeGroups = [];
    },
    setActiveProps(group) {
      group.props.forEach((prop) => this.activeProps.push(prop));
      this.activeGroups.push(group.name);
    },
    setActiveGroups(prop) {
      this.groups.forEach((group) => {
        if (group.props.includes(prop)) {
          this.activeGroups.push(group.name);
        }
      });
      this.activeProps.push(prop);
    },
    checkGroups(group) {
      if (this.activeGroups.includes(group.name)) {
        return 'accent';
      }
      return '';
    },
    checkProps(prop) {
      if (this.activeProps.includes(prop)) {
        return 'accent';
      }
      return '';
    },
  },
  computed: {
    // remove duplicate properties
    getProperties() {
      const props = new Set();
      this.groups.forEach((group) => group.props.forEach((prop) => props.add(prop)));
      return props;
    },
  },
};
</script>

<style scoped>
  .a {
    transition: background 0.5s linear 0.1s , color 0.5s linear
  }
</style>
