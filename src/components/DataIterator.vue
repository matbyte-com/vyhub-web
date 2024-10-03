<template>
  <v-data-iterator
    v-model:items-per-page="currentItemsPerPage"
    v-model:page="page"
    :items="items"
    :search="searchVal"
    hide-default-footer
    v-bind="$attrs"
  >
    <template #no-data>
      <div class="text-center mt-4 text-subtitle-2 text-disabled">
        {{ $t('noDataAvailable') }}
      </div>
    </template>
    <template #header>
      <v-row justify="end">
        <v-col
          v-if="search"
          lg="3"
          md="6"
          sm="12"
        >
          <v-text-field
            v-model="searchVal"
            :label="$t('search')"
            hide-details
            variant="outlined"
            density="compact"
          >
            <template #prepend-inner>
              <v-icon>
                mdi-magnify
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <slot name="header" />
    </template>

    <template
      v-for="(_, slot) of inheritSlots"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>

    <template #footer>
      <div class="d-flex justify-space-between align-center mt-3 mr-1">
        <div>
          <slot name="footer-left" />
        </div>
        <div v-if="showPageSelector && numberOfPages > 1">
          <span class="text-grey">Items per page</span>
          <v-menu location="bottom">
            <template #activator="{ props }">
              <v-btn
                variant="text"
                color="primary"
                class="ml-2"
                v-bind="props"
              >
                {{ currentItemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div
          v-if="numberOfPages > 1"
          class="text-right"
        >
          <span class="mr-4 text-grey">
            {{ page }} of {{ numberOfPages }}
          </span>
          <!-- TODO Both Buttons were fab and dark -->
          <v-btn
            size="small"
            color="primary"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            size="small"
            color="primary"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  props: {
    items: Array,
    search: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    itemsPerPage: {
      type: Number,
      default: 4,
    },
    showPageSelector: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchVal: '',
      filter: {},
      page: 1,
      currentItemsPerPage: 0,
    };
  },
  computed: {
    loading() {
      return this.items == null;
    },
    inheritSlots() {
      const slots = { ...this.$slots };

      if ('header' in slots) {
        delete slots.header;
      }

      return slots;
    },
    itemsPerPageArray() {
      if (this.items == null) {
        return [0];
      }

      const arr = [];

      for (let i = 1; i <= Math.ceil(this.items.length / this.currentItemsPerPage); i += 1) {
        arr.push(i * this.currentItemsPerPage);
      }

      return arr;
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.currentItemsPerPage);
    },
  },
  beforeMount() {
    this.currentItemsPerPage = this.itemsPerPage;
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.currentItemsPerPage = number;
    },
  },
};
</script>

<style scoped>

</style>
