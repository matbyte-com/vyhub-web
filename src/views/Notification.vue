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
        @click:row="rowClick"
        :footer-props="{
          'disable-items-per-page': true,
        }"
        >
        <template v-slot:header>
          <div class="d-flex align-center">
            <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
            <v-btn
              outlined
              color="primary"
              @click="$refs.markAsReadDialog.show"
            >
              <v-icon left>
                mdi-playlist-check
              </v-icon>
              {{ $t('notification.markAllAsRead') }}
            </v-btn>
            <v-spacer />
            <v-checkbox
              :hide-details="true"
              dense
              :label="$t('notification.hideReadNotifications')"
              @change="showReadNotifications"
              class="mr-3 align-self-center mt-0 pt-0">
            </v-checkbox>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="primary"
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
                hide-details
                v-for="(category, index) in categories"
                :key="index"
                v-model="selectedCat"
                :label="$t(`notification.type.${category.toLowerCase()}`)"
                :value="category"
                @change="newCat"
              ></v-checkbox>
              <a class="ma-1" @click="selectedCat = []; fetchData()">{{ $t('reset') }}</a>
            </v-menu>
          </div>
        </template>
        <template v-slot:item.icon="{ item }">
          <v-icon>
            {{ item.message.kwargs.icon }}
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
            time: utils.formatElapsedTime((new Date() - new Date(item.created_on)) / 1000)
          }) }}
          </span>
        </template>
        <template v-slot:item.action="{ item }" >
          <div class="text-right">
            <v-tooltip left v-if="item.link">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs"
                        v-on="on" class="mr-1">
                  mdi-open-in-new
                </v-icon>
              </template>
              <span>{{ $t('notification.isLink') }}</span>
            </v-tooltip>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" @click.stop="toggleReadStatus(item)">
                  <v-icon v-if="item.read">
                    mdi-email-outline
                  </v-icon>
                  <v-icon v-else>
                    mdi-email-open-outline
                  </v-icon>
                </v-btn>
              </template>
              <span v-if="item.read">{{ $t('notification.markUnRead') }}</span>
              <span v-else>{{ $t('notification.markRead') }}</span>
            </v-tooltip>
          </div>
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
      itemsPerPage: 50,
      newMessages: null,
      notifications: [],
      totalItems: 20,
      categories: [],
      headers: [
        {
          text: this.$t('icon'), value: 'icon', sortable: false, focus: true,
        },
        { text: this.$t('message'), value: 'message', sortable: false },
        { text: this.$t('type'), value: 'category', sortable: false },
        { text: this.$t('createdOn'), value: 'time' },
        {
          value: 'action', sortable: false, align: 'right', width: '150px',
        },
      ],
      state: {
        page: 1,
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
      if (sortByCat) this.selectedCat = sortByCat;
      (await openapi).notification_getNotifications({
        size: this.itemsPerPage,
        page: this.state.page - 1,
        descending: this.state.desc,
        categories: this.selectedCat,
        hide_read: this.state.read,
      })
        .then((rsp) => {
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
        this.fetchData();
      });
    },
    rowClick(item) {
      this.toggleReadStatus(item);
      if (item.link) this.$router.push({ name: item.link.name, params: { ...item.link.kwargs } });
    },
    async toggleReadStatus(item) {
      (await openapi).notification_markAsRead(null, { id: [item.id] });
      // eslint-disable-next-line no-param-reassign
      item.read = !item.read;
    },
  },
};
</script>

<style scoped>

</style>
