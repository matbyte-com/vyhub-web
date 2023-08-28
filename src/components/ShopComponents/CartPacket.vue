<template>
  <div>
    <v-card class="vh-cart-packet card-rounded" outlined>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="3" md="3" lg="3" xl="2" align-self="center" class="text-center">
            <v-img
              @click="showPacket"
              style="cursor: pointer; border-radius: 5px"
              :src="cartPacket.packet.image_url"
            ></v-img>
          </v-col>
          <v-col>
            <div class="text-h6" @click="showPacket" style="cursor: pointer;">
              {{ cartPacket.packet.title }}
            </div>
            <div class="subtitle-2" v-if="cartPacket.packet.subtitle">
              {{ cartPacket.packet.subtitle }}
            </div>
          </v-col>
          <v-col cols="12" md="auto" lg="auto"
                 class="d-flex align-center justify-end" align-self="center">
            <div>
              <v-row dense>
                <v-col :class="(cartPacket.discount ? 'green--text' : '')">
                  <div class="text-h6 text-right">
                    {{ cartPacket.price.total
                    .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                    {{ cartPacket.currency.symbol }}
                    <div v-if="cartPacket.recurring != null">
                      {{ $t('every') }}
                      {{ utils.formatLength(cartPacket.recurring) }}
                    </div>
                  </div>
                  <div v-if="cartPacket.discount">
                <span class="caption">
                  -{{ cartPacket.discount.percentage }}% {{ cartPacket.discount.name }}
                </span>
                    <v-icon @click="$emit('removeDiscount')" v-if="showRemove" small>
                      mdi-close
                    </v-icon>
                  </div>
                </v-col>
              </v-row>
              <v-row dense v-if="cartPacket.price.credits">
                <v-col>
                  <div class="subtitle-2">
                    {{ cartPacket.price.credits }}
                    {{ $store.getters.shopConfig.credits_display_title }}
                  </div>
                </v-col>
              </v-row>
            </div>
            <div class="d-flex align-center ml-5" v-if="showRemove && cartPacket">
              <v-btn outlined :small="!cartPacket.target_user"
                     color="secondary" class="mr-1" :fab="!cartPacket.target_user"
                     @click="openTargetUserEditDialog">
                <v-icon :left="cartPacket.target_user !== null">mdi-gift-open</v-icon>
                <span v-if="cartPacket.target_user">{{ cartPacket.target_user.username }}</span>
              </v-btn>
              <v-btn fab outlined small color="error"
                     @click="$emit('remove')">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <div v-if="cartPacket.target_user && !showRemove">
          <v-icon color="secondary" left>mdi-gift-open</v-icon>
          <UserLink :small="true" :user="cartPacket.target_user" />
        </div>
      </v-card-text>
    </v-card>
    <DialogForm :title="$t('_shop.labels.changeTargetUser')"
                :form-schema="cartPacketTargetUserForm"
                @submit="changeTargetUser"
                icon="mdi-account-switch"
                ref="targetUserEditDialog">
      <template v-slot:target_user_id-after>
        <UserLink v-if="cartPacket.target_user" :user="cartPacket.target_user" />
      </template>
    </DialogForm>
    <!-- TODO Make Packet Dialog Available for Cart Packets -->
    <PacketDetailDialog ref="detailDialog" :packet="cartPacket" />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import DialogForm from '@/components/DialogForm.vue';
import CartPacketTargetUserForm from '@/forms/CartPacketTargetUserForm';
import UserLink from '@/components/UserLink.vue';
import PacketDetailDialog from '@/components/ShopComponents/PacketDetailDialog.vue';

export default {
  name: 'CartPacket',
  components: { PacketDetailDialog, UserLink, DialogForm },
  data() {
    return {
      cartPacketTargetUserForm: CartPacketTargetUserForm,
    };
  },
  props: {
    cartPacket: Object,
    showRemove: Boolean,
    priceCols: {
      type: Number,
      default: 3,
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
