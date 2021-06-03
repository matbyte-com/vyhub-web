<template>
<div>
  <PageTitle icon="mdi-bell-outline">{{ $t('notification.notifications') }}</PageTitle>
  <v-card>
    <v-card-text>
      <v-btn outlined color="primary" v-if="newMessages">
        <v-icon left>
          mdi-sync
        </v-icon>
        {{ $t('notification.newNotifications') }}
      </v-btn>
      <DataTable
        class="mt-4"
        :headers="headers"
        :items="notifications">
        <template v-slot:item.message="{ item }">
          {{ $t(`notification.${item.message.name}`, { ...item.message.kwargs }) }}
        </template>
        <template v-slot:item.category="{ item }">
          {{ $t(`notification.type.${item.category.toLowerCase()}`) }}
        </template>
        <template v-slot:item.time="{ item }" >
          {{ $t('notification.timeAgo', {
            time: utils.formatLength((new Date() - new Date(item.created_on)) / 1000)
          }) }}
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import EventBus from '@/services/EventBus';
import DataTable from '@/components/DataTable.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Notification.vue',
  components: { DataTable, PageTitle },
  data() {
    return {
      newMessages: null,
      notifications: [],
      headers: [
        { text: this.$t('message'), value: 'message' },
        { text: this.$t('type'), value: 'category' },
        { text: this.$t('createdOn'), value: 'time' },
      ],
    };
  },
  mounted() {
    EventBus.on('notification', this.newNotification);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).notification_getNotifications().then((rsp) => {
        this.notifications = rsp.data;
      });
    },
    newNotification() {
      this.newMessages = true;
    },
    getTime(time) {
      const time_obj = new Date(time);
      return `${time_obj.getHours()}:${time_obj.getMinutes()}`;
    },
  },
};
</script>

<style scoped>

</style>
