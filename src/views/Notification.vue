<template>
<div>
  <ConfirmationDialog :btn-text="$t('notification.markAllAsRead')"
                      @submit="markAllAsRead" ref="markAsReadDialog"/>
  <PageTitle icon="mdi-bell-outline">{{ $t('notification.notifications') }}</PageTitle>
  <v-card>
    <v-card-text class="mt-0 pt-0">
      <v-fade-transition>
        <v-btn depressed color="primary" v-if="newMessages" @click="fetchData(1)" class="mt-3">
          <v-icon left>
            mdi-sync
          </v-icon>
          {{ $t('notification.newNotifications') }}
        </v-btn>
      </v-fade-transition>
      <DataTable
        class="mt-4"
        :headers="headers"
        :items="notifications"
        :server-items-length.sync="totalItems"
        :items-per-page.sync="itemsPerPage"
        @update:page="newPage"
        @update:sort-desc="newDesc"
        :footer-props="{
          'disable-items-per-page': true,
        }"
        >
        <template v-slot:header>
          <v-row>
            <v-col class="d-flex align-center">
              <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
              <v-btn
                outlined
                color="primary"
                dark
                @click="$refs.markAsReadDialog.show"
              >
                <v-icon left>
                  mdi-playlist-check
                </v-icon>
                {{ $t('notification.markAllAsRead') }}
              </v-btn>
            </v-col>
            <v-col class="d-flex align-center">
              <v-spacer />
              <v-checkbox
                align-center
                dense
                :label="$t('notification.hideReadNotifications')"
                @change="showReadNotifications"
                class="mr-3">
              </v-checkbox>
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-filter
                    </v-icon>
                    {{ $t('type') }}
                  </v-btn>
                </template>
                <v-checkbox
                  class="ml-2, mr-2"
                  dense
                  v-for="(category, index) in categories"
                  :key="index"
                  v-model="selectedCat"
                  :label="$t(`notification.type.${category.toLowerCase()}`)"
                  :value="category"
                  @change="newCat"
                ></v-checkbox>
                <a class="ma-1" @click="selectedCat = []">{{ $t('reset') }}</a>
              </v-menu>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.icon="{ item }">
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </template>
        <template v-slot:item.message="{ item }">
          <span :class="{ 'font-weight-medium': !item.read }">
            {{ $t(`notification.${item.message.name}`, { ...item.message.kwargs }) }}
          </span>
        </template>
        <template v-slot:item.category="{ item }">
          <span :class="{ 'font-weight-medium': !item.read }">
             {{ $t(`notification.type.${item.category.toLowerCase()}`) }}
          </span>
        </template>
        <template v-slot:item.time="{ item }" >
          <span :class="{ 'font-weight-medium': !item.read }">
            {{ $t('notification.timeAgo', {
            time: utils.formatLength((new Date() - new Date(item.created_on)) / 1000)
          }) }}
          </span>
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import EventBus from '@/services/EventBus';
import DataTable from '@/components/DataTable.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Notification.vue',
  components: { PageTitle, DataTable, ConfirmationDialog },
  data() {
    return {
      selectedCat: [],
      itemsPerPage: 7,
      newMessages: null,
      notifications: [],
      totalItems: null,
      categories: [],
      headers: [
        {
          text: this.$t('icon'), value: 'icon', sortable: false, focus: true,
        },
        { text: this.$t('message'), value: 'message', sortable: false },
        { text: this.$t('type'), value: 'category', sortable: false },
        { text: this.$t('createdOn'), value: 'time' },
      ],
      state: {
        page: 1,
        sortByCat: null,
        desc: false,
        read: false,
      },
    };
  },
  mounted() {
    EventBus.on('notification', this.newNotification);
    this.fetchData();
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      (await openapi).notification_getCategories().then((rsp) => {
        this.categories = rsp.data;
      });
    },
    async fetchData(page = null, sortByCat = null) {
      this.newMessages = false;
      this.notifications = null;
      if (page) this.state.page = page;
      if (sortByCat) this.state.sortByCat = sortByCat;
      (await openapi).notification_getNotifications({
        size: this.itemsPerPage,
        page: this.state.page - 1,
        descending: this.state.desc,
        categories: this.state.sortByCat,
        hide_read: this.state.read,
      })
        .then((rsp) => {
          this.loading = false;
          this.notifications = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    newNotification() {
      this.newMessages = true;
    },
    getTime(time) {
      const time_obj = new Date(time);
      return `${time_obj.getHours()}:${time_obj.getMinutes()}`;
    },
    newPage(page) {
      this.fetchData(page);
    },
    newDesc(ev) {
      console.log(ev);
      if (ev[0] === undefined || ev[0] === false) this.state.desc = false;
      else this.state.desc = true;
      if (ev[0] !== false) this.fetchData(1);
    },
    newCat(cat) {
      this.fetchData(1, cat);
    },
    resetCatFilter() {
      this.selectedCat = [];
      this.fetchData(1);
    },
    showReadNotifications(bool) {
      this.state.read = bool;
      this.fetchData(1);
    },
    async markAllAsRead() {
      (await openapi).notification_markAsRead(null, { all: true }).then(() => {
        this.$refs.markAsReadDialog.closeAndReset();
      });
    },
  },
};
</script>

<style scoped>

</style>
