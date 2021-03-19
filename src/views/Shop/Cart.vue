<template>
  <div>
    <v-row>
      <v-col>
        <page-title>{{ $t('_shop.labels.cart') }}</page-title>
      </v-col>
    </v-row>

    <v-row v-if="cartPackets != null">
      <v-col lg="9" md="8">
        <v-row v-for="cartPacket in cartPackets" v-bind:key="cartPacket.id">
          <v-col>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col lg="2" align-self="center" class="text-center">
                    <v-img
                      :src="cartPacket.packet.image_url"
                    ></v-img>
                  </v-col>
                  <v-col>
                    <div class="text-h6">
                      {{ cartPacket.packet.title }}
                    </div>
                    <div class="subtitle-2" v-if="cartPacket.packet.subtitle">
                      {{ cartPacket.packet.subtitle }}
                    </div>
                    <div class="body-2">
                      <ul>
                        <li v-for="point in cartPacket.packet.abstract" :key="point">
                          {{ point }}
                        </li>
                      </ul>
                    </div>
                  </v-col>
                  <v-col lg="2" class="text-right" align-self="center">
                    <v-row dense>
                      <v-col>
                        <div class="text-h6">
                          {{ cartPacket.price.total.toFixed(2).toLocaleString() }}
                          {{ cartPacket.currency.symbol }}
                        </div>
                      </v-col>
                    </v-row>
                    <v-row dense v-if="cartPacket.price.credits">
                      <v-col>
                        <div class="subtitle-2">
                          {{ cartPacket.price.credits }} {{ $t('_shop.labels.credits') }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col lg="1" align-self="center" class="text-center">
                    <v-btn fab outlined small color="error"
                           @click="removeCartPacket(cartPacket.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div v-if="cartPackets.length === 0">{{ $t('_shop.messages.cartEmpty') }}</div>
        <v-btn class="mt-2" color="error" @click="clearCart"
               v-else outlined>
          <v-icon class="mr-1">mdi-delete</v-icon>
          {{ $t('_shop.labels.removeAllPackets') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon class="mr-1">mdi-cart</v-icon>
                {{ $t('_shop.labels.cartTotal') }}
              </v-card-title>
              <v-card-text v-if="cartPrice != null" class="body-1">
                <v-row>
                  <v-col>
                    <div>
                      {{ $t('_shop.labels.subtotal') }}
                      <div class="float-right">
                        {{ cartPrice.net.toFixed(2).toLocaleString() }}
                        {{ cartPrice.currency.symbol }}
                      </div>
                    </div>
                    <div>
                      {{ $t('_shop.labels.tax') }} ({{ cartPrice.tax_rate }}%)
                      <div class="float-right">
                        {{ cartPrice.tax_amount.toFixed(2).toLocaleString() }}
                        {{ cartPrice.currency.symbol }}
                      </div>
                    </div>
                    <div class="font-weight-bold">
                      {{ $t('_shop.labels.total') }}
                      <div class="float-right">
                        {{ cartPrice.total.toFixed(2).toLocaleString() }}
                        {{ cartPrice.currency.symbol }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row align="center" v-if="cartPrice.credits != null">
                  <v-divider></v-divider>
                  <span class="mr-3 ml-3">{{ $t('or') }}</span>
                  <v-divider></v-divider>
                </v-row>
                <v-row v-if="cartPrice.credits != null">
                  <v-col>
                    <div class="font-weight-bold">
                      {{ $t('_shop.labels.credits') }}
                      <div class="float-right">
                        {{ cartPrice.credits }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="font-italic body-2 text-center" v-if="cartPrice.tax_info">
                      {{ cartPrice.tax_info }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                <v-icon class="mr-1">mdi-map-marker</v-icon>
                {{ $t('_shop.labels.billingAddress') }}
              </v-card-title>
              <v-card-text class="body-1">
                <Address v-if="currentAddress != null" :address="currentAddress"></Address>
                <div v-else>{{ $t('_shop.messages.noAddressSpecified') }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="success" @click="$refs.addressAddDialog.show()">
                  <v-icon class="mr-1">mdi-plus</v-icon>
                  {{ $t('add') }}
                </v-btn>
                <v-btn text color="primary">
                  <v-icon class="mr-1">mdi-format-list-text</v-icon>
                  {{ $t('select') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-actions>
                <v-btn color="primary" block :disabled="cartPackets.length == 0">
                  <v-icon class="mr-1">mdi-page-next-outline</v-icon>
                  {{ $t('_shop.labels.checkout') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col lg="9" md="8">
        <v-skeleton-loader v-for="n in 3"
                           v-bind:key="n"
                           type="card-heading, list-item-avatar">
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      </v-col>
    </v-row>
    <DialogForm :form-schema="addressFormSchema" ref="addressAddDialog"
                :title="$t('_address.labels.add')" :submit-text="$t('create')"
                title-icon="mdi-map-marker"
                @submit="addAddress">
    </DialogForm>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import utilService from '@/services/UtilService';
import api from '@/api/api';
import AddressForm from '@/forms/AddressForm';
import DialogForm from '@/components/DialogForm.vue';
import ShopService from '@/services/ShopService';
import Address from '@/components/Address.vue';

export default {
  components: {
    Address,
    PageTitle,
    DialogForm,
  },
  data() {
    return {
      cartPackets: null,
      cartPrice: null,
      cartCorrect: false,
      addressFormSchema: AddressForm,
    };
  },
  beforeMount() {
    this.queryData();
  },
  methods: {
    queryData() {
      const countryCode = (this.$store.getters.address != null
        ? this.$store.getters.address.country.code : null);

      api.shop.getCart(countryCode)
        .then((rsp) => {
          this.cartPackets = rsp.data.packets;
          this.cartPrice = rsp.data.price;
          this.cartCorrect = rsp.data.correct;

          this.$store.dispatch('setCartPacketCount', {
            cartPacketCount: this.cartPackets.length,
          });
        }).catch((err) => {
          console.log(err);
          utilService.notifyUnexpectedError(err.response.data);
        });
    },
    removeCartPacket(cartPacketId) {
      api.shop.removeFromCart(cartPacketId).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.removeFromCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
      });
    },
    clearCart() {
      api.shop.clearCart().then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_shop.messages.clearCartSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        utilService.notifyUnexpectedError(err.response.data);
      });
    },
    addAddress() {
      const data = this.$refs.addressAddDialog.getData();

      api.user.addAddress(data.name, data.streetAndNumber, data.addition, data.zipCode, data.city,
        data.state, data.country).then((rsp) => {
        ShopService.selectAddress(rsp.data);
        this.$notify({
          title: this.$t('_address.messages.addSuccess'),
          type: 'success',
        });
        this.$refs.addressAddDialog.closeAndReset();
        this.queryData();
      }).catch((err) => {
        console.log(err);
        this.$refs.addressAddDialog.setErrorMessage(err.response.data);
      });
    },
  },
  computed: {
    currentAddress() {
      return this.$store.getters.address;
    },
  },
};
</script>

<style scoped>

</style>
