<template>
  <div>
    <PageTitleFlat :hide-triangle="true" :title="$t('_shop.labels.admin')"
                   :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"/>
    <v-card flat class="fill-height card-rounded-bottom"
            :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
      <v-card-text>
        <v-tabs v-model="tabModel" >
          <v-tab v-for="tab in allowedTabs"
                 :key="tab.id"
                 class="justify-start"
                 @click="$router.push({ name: 'ShopAdmin',
                                    params: { component: tab.name} })">
            <v-icon left>{{ tab.icon }}</v-icon>
            <span>{{ tab.title }}</span>
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>
    <v-card class="fill-height card-rounded mt-3" flat min-height="200px">
      <v-card-text>
        <component :is="componentInstance"></component>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PageTitleFlat from '@/components/PageTitleFlat.vue';

export default {
  name: 'Purchase',
  components: { PageTitleFlat },
  data() {
    return {
      tabs: [
        {
          name: 'purchases',
          icon: 'mdi-clipboard-list',
          component: 'Purchases',
          reqProp: 'purchase_show',
          title: this.$t('_purchases.labels.allPurchases'),
        },
        {
          name: 'applied-packets',
          icon: 'mdi-gift-open',
          component: 'AppliedPackets',
          reqProp: 'purchase_show',
          title: this.$t('_purchases.labels.appliedPackets'),
        },
        {
          name: 'discounts',
          icon: 'mdi-ticket-percent',
          component: 'Discounts',
          reqProp: 'discount_show',
          title: this.$t('discounts'),
        },
        {
          name: 'purchase-confirmation',
          icon: 'mdi-lock-reset',
          component: 'PurchaseManualConfirmation',
          reqProp: 'purchase_edit',
          title: this.$t('_purchases.labels.confirmPurchases'),
        },
        {
          name: 'report',
          icon: 'mdi-file-table',
          component: 'Report',
          reqProp: 'purchase_show',
          title: this.$t('report'),
        },
        {
          name: 'statistics',
          icon: 'mdi-chart-areaspline',
          component: 'Statistics',
          reqProp: 'purchase_show',
          title: this.$t('statistics'),
        },
      ],
      activeComponent: 'my-purchases',
      tabModel: null,
    };
  },
  beforeMount() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.params.component) {
        const tab = this.tabs.find((t) => t.name === this.$route.params.component);
        this.tabModel = this.allowedTabs.indexOf(tab);
        this.activeComponent = tab.component;
      } else {
        this.activeComponent = this.allowedTabs[0].component;
      }
    },
  },
  computed: {
    componentInstance() {
      const type = this.activeComponent;
      return () => import(`@/components/ShopComponents/Admin/${type}`);
    },
    allowedTabs() {
      return this.tabs.filter((t) => !t.reqProp || this.$checkProp(t.reqProp) === true);
    },
  },
};
</script>

<style scoped>

</style>
