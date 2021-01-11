<template>
  <div>
    <h1>Linked Accounts</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="(attribute ,index) in linkedAcc[0]" :key="index" class="text-left">
              {{ index }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(acc, index) in linkedAcc"
            :key="index"
          >
            <td>{{ acc.acc }}</td>
            <td>{{ acc.username }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'LinkedAccounts',
  data() {
    return {
      linkedAcc: [
        {
          acc: 'Central',
          username: 'Nutzer1',
        },
        {
          acc: 'Gmod',
          username: 'iBot3',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
