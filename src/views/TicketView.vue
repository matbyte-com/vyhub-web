<template>
  <div>
    <PageTitleFlat
      :hide-triangle="true"
      :no-bottom-border-radius="$vuetify.display.smAndDown"
      :title="$t('_forum.tickets')"
    />
    <v-card
      :class="{ 'mt-3 card-rounded-top':!$vuetify.display.smAndDown,
                'no-top-border-radius': $vuetify.display.smAndDown }"
      class="card-rounded-bottom"
      flat
    >
      <v-card-text>
        <PaginatedDataTable
          ref="ticketTable"
          :headers="headers"
          :items="tickets"
          :total-items="totalItems"
          default-sort-by="created"
          :default-sort-desc="true"
          class="cursor"
          @reload="fetchData"
          @click:row="showTicket"
        >
          <template #header>
            <div class="d-flex align-center ga-3">
              <v-checkbox
                v-model="show_closed"
                :label="$t('_forum.showClosed')"
                class="text-capitalize flex-grow-0"
                hide-details
                @update:model-value="() => fetchData()"
              />
              <v-menu
                location="bottom"
                :close-on-content-click="false"
              >
                <template #activator="{ props }">
                  <v-btn
                    variant="outlined"
                    color="primary"
                    v-bind="props"
                  >
                    <v-icon start>
                      mdi-filter
                    </v-icon>
                    {{ $t('category') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-checkbox
                    v-for="(category, index) in categories"
                    :key="index"
                    v-model="selectedCategories"
                    class="ml-2 mr-2"
                    hide-details
                    :label="category.name"
                    :value="category.id"
                    @update:model-value="fetchData()"
                  />
                  <a
                    class="ma-1"
                    href="javascript:void(0)"
                    @click="selectedCategories = []; fetchData()"
                  >
                    {{ $t('reset') }}</a>
                </v-card>
              </v-menu>
            </div>
          </template>
          <template #item.category="{ item }">
            <v-chip
              v-if="item.category"
              :color="item.category.color || '#9E9E9E'"
              variant="flat"
              size="small"
            >
              {{ item.category.name }}
            </v-chip>
          </template>
          <template #item.color-status="{ item }">
            <v-sheet
              :color="ticketRowFormatter(item)"
              height="110%"
              width="10px"
              style="margin-left: -15px"
            />
          </template>
          <template #item.created="{ item }">
            {{ utils.formatDate(item.created) }}
          </template>
          <template #item.creator="{ item }">
            <v-avatar class="ma-1">
              <v-img
                v-if="item.creator"
                :src="item.creator.avatar"
              />
              <v-img
                v-else
                src="https://www.gravatar.com/avatar/{}?d=retro&s=200"
              />
            </v-avatar>
            <span v-if="$vuetify.display.xs">
              <UserLink
                v-if="item.creator"
                :user="item.creator"
                :color="ticketRowFormatter(item)"
              />
            </span>
            <span v-else>
              <UserLink
                v-if="item.creator"
                :user="item.creator"
              />
            </span>
          </template>
          <template
            #item.last_post="{ item }"
          >
            <span
              v-if="item.last_post"
              class="d-flex align-center justify-end"
            >
              {{ utils.formatDate(item.last_post.created) }}
              <UserLink
                :user="item.last_post.creator"
                class="ml-1"
                @click.prevent
              />
            </span>
          </template>
          <template #footer-right>
            <v-btn
              v-if="$checkProp('ticket_edit')"
              color="primary"
              variant="outlined"
              class="mr-2"
              @click="$refs.categoriesDialog.show()"
            >
              <v-icon start>
                mdi-tag-multiple
              </v-icon>
              <span>{{ $t('_forum.manageTicketCategories') }}</span>
            </v-btn>
            <v-btn
              color="success"
              variant="outlined"
              @click="$refs.addThreadDialog.show()"
            >
              <v-icon start>
                mdi-plus
              </v-icon>
              <span>{{ $t('_forum.addTicket') }}</span>
            </v-btn>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <ThreadAddDialog
      ref="addThreadDialog"
      :dialog-title="$t('_forum.addTicket')"
      :show-category="true"
      @submit="newThread"
    />
    <TicketCategoriesDialog
      ref="categoriesDialog"
      @updated="fetchCategories"
    />
  </div>
</template>

<script>
import openapi from '../api/openapi';

export default {
  data() {
    return {
      tickets: null,
      show_closed: false,
      categories: [],
      selectedCategories: [],
      headers: [
        { key: 'color-status', sortable: false, width: '1px' },
        { title: this.$t('_forum.creator'), key: 'creator', sortable: false },
        { title: this.$t('title'), key: 'title', sortable: false },
        { title: this.$t('category'), key: 'category', sortable: false },
        { title: this.$t('_forum.created'), key: 'created' },
        {
          title: this.$t('_forum.last_post'), key: 'last_post', sortable: false, align: 'end',
        },
      ],
      page: 1,
      totalItems: 0,
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchData();
  },
  methods: {
    async fetchCategories() {
      (await openapi).forum_getTicketCategories().then((rsp) => {
        this.categories = rsp.data;
      });
    },
    async fetchData(queryParams = null) {
      (await openapi).forum_getTickets({
        show_closed: this.show_closed,
        category_id: this.selectedCategories,
        ...(queryParams != null ? queryParams : this.$refs.ticketTable.getQueryParameters()),
      })
        .then((rsp) => {
          this.tickets = rsp.data.items; this.totalItems = rsp.data.total;
          for (let i = 0; i < this.tickets.length; i += 1) {
            if (!this.tickets[i].creator) {
              this.tickets[i].creator = {
                username: this.$t('deletedUser'),
                avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
              };
            }
            if (!this.tickets[i].last_post.creator) {
              this.tickets[i].last_post = {
                creator: {
                  username: this.$t('deletedUser'),
                  avatar: 'https://cdn.vyhub.net/vyhub/avatars/default.png',
                },
              };
            }
          }
        });
    },
    async newThread() {
      const data = this.$refs.addThreadDialog.getData();
      (await openapi).forum_createThread(null, data).then(() => {
        this.$refs.addThreadDialog.close();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addThreadDialog.setError(err);
      });
    },
    ticketRowFormatter(item) {
      const add = (this.$vuetify.theme.current.dark ? 'darken-4' : '');

      if (item.status === 'CLOSED') {
        return `green ${add}`;
      }

      if (item.is_read) {
        return `grey ${add}`;
      }

      return `orange ${add}`;
    },
    showTicket(event, row) {
      this.$router.push({ name: 'TicketThread', params: { id: row.item.id } });
    },
  },
};
</script>

<style scoped>
.cursor :deep(td) {
  cursor: pointer !important;
}
</style>
