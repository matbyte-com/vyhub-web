<template>
<div>
  <ConfirmationDialog :btn-text="$t('_notification.markAllAsRead')"
                      @submit="markAllAsRead" ref="markAsReadDialog"/>
  <PageTitleFlat :title="$t('_notification.notifications')"
                 :hide-triangle="$vuetify.breakpoint.smAndDown"
                 :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"/>
  <v-card flat class="card-rounded"
          :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
    <v-card-text class="pt-1">
      <v-fade-transition>
        <v-btn variant="flat" color="primary" v-if="newMessages" @click="fetchData()" class="mt-3">
          <v-icon start>
            mdi-sync
          </v-icon>
          {{ $t('_notification.newNotifications') }}
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
        @reload="fetchData">
        <template v-slot:header>
          <div class="d-flex align-center">
            <v-spacer v-if="$vuetify.breakpoint.xsOnly" />
            <v-btn
              variant="outlined"
              color="primary"
              @click="$refs.markAsReadDialog.show">
              <v-icon start>
                mdi-playlist-check
              </v-icon>
              {{ $t('_notification.markAllAsRead') }}
            </v-btn>
            <v-spacer />
            <v-checkbox
              :hide-details="true"
              dense
              v-model="showOnlyReadItems"
              :label="$t('_notification.hideReadNotifications')"
              @update:model-value="fetchData"
              class="mr-3 align-self-center mt-0 pt-0">
            </v-checkbox>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="outlined"
                  color="primary"
                 
                  v-bind="props">
                  <v-icon start>
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
                :label="$t(`_notification.type.${category.toLowerCase()}`)"
                :value="category"
                @update:model-value="fetchData"
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
            {{ $t(`_notification.${item.message.name}`, { ...item.message.kwargs }) }}
          </span>
        </template>
        <template v-slot:item.category="{ item }">
          <span :class="{ 'font-weight-medium': !item.read }">
             {{ $t(`_notification.type.${item.category.toLowerCase()}`) }}
          </span>
        </template>
        <template v-slot:item.time="{ item }" >
          <span :class="{ 'font-weight-medium': !item.read }">
            {{ $t('_notification.timeAgo', {
            time: utils.formatElapsedTime((new Date() - new Date(item.created_on)))
          }) }}
          </span>
        </template>
        <template v-slot:item.action="{ item }" >
          <div class="text-right">
            <v-tooltip location="left" v-if="item.link">
              <template v-slot:activator="{ props }">
                <v-icon
                        v-bind="props" class="mr-1">
                  mdi-open-in-new
                </v-icon>
              </template>
              <span>{{ $t('_notification.isLink') }}</span>
            </v-tooltip>
            <v-tooltip location="left">
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props" @click.stop="toggleReadStatus(item)">
                  <v-icon v-if="item.read">
                    mdi-email-outline
                  </v-icon>
                  <v-icon v-else>
                    mdi-email-open-outline
                  </v-icon>
                </v-btn>
              </template>
              <span v-if="item.read">{{ $t('_notification.markUnRead') }}</span>
              <span v-else>{{ $t('_notification.markRead') }}</span>
            </v-tooltip>
          </div>
        </template>
      </PaginatedDataTable>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import EventBus from '@/services/EventBus';
import openapi from '@/api/openapi';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';

export default {
  name: 'Notification.vue',
  components: {
    PageTitleFlat, PaginatedDataTable, ConfirmationDialog,
  },
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
    async markAllAsRead() {
      (await openapi).notification_markAsRead(null, { all: true }).then(() => {
        this.$refs.markAsReadDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.toggleSuccess'),
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
          title: this.$t('_messages.toggleSuccess'),
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
