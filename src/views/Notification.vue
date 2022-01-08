<template>
<div>
  <ConfirmationDialog :btn-text="$t('notification.markAllAsRead')"
                      @submit="markAllAsRead" ref="markAsReadDialog"/>
  <PageTitle icon="mdi-bell-outline">{{ $t('notification.notifications') }}</PageTitle>
  <v-card>
    <v-card-text class="mt-0 pt-0">
      <v-fade-transition>
        <v-btn depressed color="primary" v-if="newMessages" @click="fetchData()" class="mt-3">
          <v-icon left>
            mdi-sync
          </v-icon>
          {{ $t('notification.newNotifications') }}
        </v-btn>
      </v-fade-transition>
      <PaginatedDataTable
        :show-search="false"
        ref="notificationTable"
        class="mt-4"
        :headers="headers"
        :items="notifications"
        :totalItems="totalItems"
        default-sort-by="created_on"
        :default-sort-desc="true"
        @click:row="rowClick"
        @reload="fetchData"
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
            time: utils.formatElapsedTime((new Date() - new Date(item.created_on)))
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
      </PaginatedDataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import EventBus from '@/services/EventBus';
import openapi from '@/api/openapi';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';

export default {
  name: 'Notification.vue',
  components: { PaginatedDataTable, PageTitle, ConfirmationDialog },
  data() {
    return {
      selectedCat: [],
      newMessages: null,
      notifications: null,
      totalItems: 0,
      categories: [],
      showOnlyReadItems: false,
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
    async fetchData(queryParams = null) {
      this.newMessages = false;
      this.notifications = null;
      (await openapi).notification_getNotifications({
        categories: this.selectedCat,
        hide_read: this.showOnlyReadItems,
        ...(queryParams != null ? queryParams : this.$refs.notificationTable.getQueryParameters()),
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
    newCat() {
      this.fetchData();
    },
    showReadNotifications(bool) {
      this.showOnlyReadItems = bool;
      this.fetchData();
    },
    async markAllAsRead() {
      (await openapi).notification_markAsRead(null, { all: true }).then(() => {
        this.$refs.markAsReadDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('notification.messages.readSuccess'),
          type: 'success',
        });
      });
    },
    rowClick(item) {
      if (!item.read) {
        this.toggleReadStatus(item);
      }
      if (item.link) this.$router.push({ name: item.link.name, params: { ...item.link.kwargs } });
    },
    async toggleReadStatus(item) {
      (await openapi).notification_markAsRead(null, { id: [item.id] }).then(() => {
        this.$notify({
          title: this.$t('notification.messages.readSuccess'),
          type: 'success',
        });
      });
      // eslint-disable-next-line no-param-reassign
      item.read = !item.read;
    },
  },
};
</script>

<style scoped>

</style>
