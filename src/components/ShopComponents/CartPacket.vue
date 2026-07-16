<template>
  <div>
    <v-card
      class="vh-cart-packet card-rounded"
      border
      min-height="100px"
    >
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3"
            lg="3"
            xl="2"
            align-self="center"
            class="text-center"
          >
            <PacketImage
              :cover="true"
              style="cursor: pointer; border-radius: 5px"
              :packet="cartPacket.packet"
              @click="showPacket"
            />
          </v-col>
          <v-col>
            <div
              class="text-h6"
              style="cursor: pointer;"
              @click="showPacket"
            >
              {{ cartPacket.packet.title }}
            </div>
            <div
              v-if="cartPacket.packet.subtitle"
              class="text-subtitle-2"
            >
              {{ cartPacket.packet.subtitle }}
            </div>
          </v-col>
          <v-col
            cols="12"
            md="auto"
            lg="auto"
            class="d-flex align-center justify-end"
            align-self="center"
          >
            <div>
              <v-row dense>
                <v-col :class="(cartPacket.discount ? 'text-green' : '')">
                  <template v-if="hasFirstCycle">
                    <div
                      class="text-h6 text-right"
                      :class="cartPacket.discount ? 'text-green' : 'text-primary'"
                    >
                      {{ utils.formatCurrency(cartPacket.price_first.total, cartPacket.currency.code) }}
                      <span
                        v-if="durationText"
                        class="text-caption"
                      >{{ durationText }}</span>
                    </div>
                    <div class="text-body-2 text-medium-emphasis text-right mt-1">
                      {{ $t('_shop.labels.afterwardsRecurring', {
                        price: utils.formatCurrency(cartPacket.price.total, cartPacket.currency.code) }) }}
                      <span v-if="recurringText">{{ recurringText }}</span>
                    </div>
                  </template>
                  <div
                    v-else
                    class="text-h6 text-right"
                  >
                    {{ utils.formatCurrency(cartPacket.price.total, cartPacket.currency.code) }}
                    <span
                      v-if="recurringText"
                      class="text-caption"
                    >{{ recurringText }}</span>
                  </div>
                  <div v-if="cartPacket.discount">
                    <v-chip
                      class="mt-1 font-italic"
                      color="green"
                      size="small"
                    >
                      <span>
                        -{{ cartPacket.discount.percentage }}% {{ cartPacket.discount.name }}
                      </span>
                      <v-icon
                        v-if="showRemove"
                        size="small"
                        end
                        class="text-red"
                        @click="$emit('removeDiscount')"
                      >
                        mdi-close-circle
                      </v-icon>
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
              <v-row
                v-if="cartPacket.price.credits != null "
                dense
              >
                <v-col :class="(cartPacket.discount ? 'text-green' : '')">
                  <div class="text-subtitle-2">
                    {{ cartPacket.price.credits }}
                    {{ $store.getters.shopConfig.credits_display_title }}
                  </div>
                </v-col>
              </v-row>
            </div>
            <div
              v-if="showRemove && cartPacket"
              class="d-flex align-center ml-5"
            >
              <v-btn
                variant="outlined"
                :size="!cartPacket.target_user ? 'small' : undefined"
                color="secondary"
                class="mr-1"
                :icon="!cartPacket.target_user"
                @click="openTargetUserEditDialog"
              >
                <v-icon :start="cartPacket.target_user !== null">
                  mdi-gift-open
                </v-icon>
                <span v-if="cartPacket.target_user">{{ cartPacket.target_user.username }}</span>
              </v-btn>
              <v-btn
                icon="mdi-delete"
                variant="outlined"
                size="small"
                color="error"
                @click="$emit('remove')"
              />
            </div>
          </v-col>
        </v-row>
        <div v-if="cartPacket.target_user && !showRemove">
          <v-icon
            color="secondary"
            start
          >
            mdi-gift-open
          </v-icon>
          <UserLink
            :small="true"
            :user="cartPacket.target_user"
          />
        </div>
      </v-card-text>
    </v-card>
    <DialogForm
      ref="targetUserEditDialog"
      :title="$t('_shop.labels.changeTargetUser')"
      :form-schema="cartPacketTargetUserForm"
      icon="mdi-account-switch"
      @submit="changeTargetUser"
    >
      <template #user-chip>
        <div>
          <UserLink
            v-if="cartPacket.target_user"
            :user="cartPacket.target_user"
          />
        </div>
      </template>
    </DialogForm>
    <PacketDetailDialog
      ref="detailDialog"
      :cart-packet="true"
      :packet="cartPacket.packet"
      :hide-buy-btns="openPurchase"
    />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import CartPacketTargetUserForm from '@/forms/CartPacketTargetUserForm';

export default {
  props: {
    cartPacket: Object,
    showRemove: Boolean,
    openPurchase: Object,
    priceCols: {
      type: Number,
      default: 3,
    },
  },
  emits: ['remove', 'removeDiscount', 'targetUserChanged'],
  data() {
    return {
      cartPacketTargetUserForm: CartPacketTargetUserForm,
    };
  },
  computed: {
    hasFirstCycle() {
      return this.cartPacket.price_first != null;
    },
    recurringText() {
      const { recurring } = this.cartPacket;
      if (recurring == null) return null;
      return this.utils.isSingularTimeunit(recurring)
        || `${this.$t('every')} ${this.utils.formatLength(recurring)}`;
    },
    durationText() {
      const { recurring } = this.cartPacket;
      if (recurring == null) return null;
      return this.utils.formatLength(recurring);
    },
  },
  methods: {
    showPacket() {
      this.$refs.detailDialog.show();
    },
    async changeTargetUser() {
      const data = this.$refs.targetUserEditDialog.getData();
      (await openapi).shop_editCartPacket(this.cartPacket.id, data)
        .then(() => {
          this.$emit('targetUserChanged');
          this.$notify({
            type: 'success',
            text: this.$t('_shop.messages.targetUserChanged'),
          });
          this.$refs.targetUserEditDialog.closeAndReset();
        }).catch((err) => {
        this.$refs.targetUserEditDialog.setError(err);
      });
    },
    openTargetUserEditDialog() {
      this.$refs.targetUserEditDialog.show();
      if (this.cartPacket.target_user) {
        this.$refs.targetUserEditDialog.setData({
          target_user_id: this.cartPacket.target_user.id,
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
