<template>
  <div>
    <v-card
      class="vh-cart-packet card-rounded"
      border
      min-height="120px"
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
                <v-col :class="(cartPacket.discount ? 'green--text' : '')">
                  <div class="text-h6 text-right">
                    {{ cartPacket.price.total
                      .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                    {{ cartPacket.currency.symbol }}
                    <div v-if="cartPacket.recurring != null">
                      <span v-if="utils.isSingularTimeunit(cartPacket.recurring)">
                        {{ utils.isSingularTimeunit(cartPacket.recurring) }}
                      </span>
                      <span v-else>
                        {{ $t('every') }}
                        {{ utils.formatLength(cartPacket.recurring) }}
                      </span>
                    </div>
                  </div>
                  <div v-if="cartPacket.discount">
                    <span class="text-caption">
                      -{{ cartPacket.discount.percentage }}% {{ cartPacket.discount.name }}
                    </span>
                    <v-icon
                      v-if="showRemove"
                      size="small"
                      @click="$emit('removeDiscount')"
                    >
                      mdi-close
                    </v-icon>
                  </div>
                </v-col>
              </v-row>
              <v-row
                v-if="cartPacket.price.credits != null "
                dense
              >
                <v-col>
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
                :fab="!cartPacket.target_user"
                @click="openTargetUserEditDialog"
              >
                <v-icon :start="cartPacket.target_user !== null">
                  mdi-gift-open
                </v-icon>
                <span v-if="cartPacket.target_user">{{ cartPacket.target_user.username }}</span>
              </v-btn>
              <v-btn
                fab
                variant="outlined"
                size="small"
                color="error"
                @click="$emit('remove')"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
      <template #target_user_id-after>
        <UserLink
          v-if="cartPacket.target_user"
          :user="cartPacket.target_user"
        />
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
import DialogForm from '@/components/DialogForm.vue';
import CartPacketTargetUserForm from '@/forms/CartPacketTargetUserForm';
import UserLink from '@/components/UserLink.vue';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';
import PacketImage from '@/components/ShopComponents/PacketImage.vue';

export default {
  name: 'CartPacket',
  components: {
    PacketImage, PacketDetailDialog, UserLink, DialogForm,
  },
  props: {
    cartPacket: Object,
    showRemove: Boolean,
    openPurchase: Object,
    priceCols: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      cartPacketTargetUserForm: CartPacketTargetUserForm,
    };
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
