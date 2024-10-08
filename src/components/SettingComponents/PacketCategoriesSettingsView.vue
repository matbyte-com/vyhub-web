<template>
  <div>
    <SettingTitle doc-path="/guide/shop/packet">
      {{ $t('categories') }}
    </SettingTitle>
    <!-- TODO Update sortable table to make it more clear that it can be sorted? -->
    <DataTable
      id="categories-table"
      :headers="headers"
      :items="categories"
      disable-sort
      hide-default-footer
      :show-search="true"
    >
      <template #item.enabled="{ item }">
        <BoolIcon :value="item.enabled" />
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            class="mr-1"
            @click="showEditDialog(item)"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            variant="outlined"
            color="error"
            size="small"
            @click="$refs.deleteCategoryDialog.show(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <v-divider class="mb-3" />
    <div class="d-flex">
      <v-spacer />
      <v-btn
        variant="outlined"
        color="success"
        :class="{ 'glow-effect':utils.customerJourneyActive('add-category') }"
        @click="$refs.createCategoryDialog.show()"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        <span>{{ $t('_packetCategory.labels.create') }}</span>
      </v-btn>
    </div>
    <DialogForm
      ref="createCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-star"
      :submit-text="$t('create')"
      :title="$t('_packetCategory.labels.create')"
      @submit="createCategory"
    />
    <DialogForm
      ref="editCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-star"
      :submit-text="$t('edit')"
      :title="$t('_packetCategory.labels.edit')"
      @submit="editCategory"
    />
    <DeleteConfirmationDialog
      ref="deleteCategoryDialog"
      @submit="deleteCategory"
    />
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import EventBus from '@/services/EventBus';
import openapi from '../../api/openapi';
import CategoryForm from '../../forms/PacketCategoryForm';

export default {
  data() {
    return {
      headers: [
        { title: this.$t('name'), key: 'name' },
        { title: this.$t('enabled'), key: 'enabled' },
        {
          title: this.$t('actions'), key: 'actions', width: '200px', sortable: false, align: 'end',
        },
      ],
      categories: null,
      categorySchema: CategoryForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    const table = document.querySelector('#categories-table tbody');
    Sortable.create(table, {
      onEnd: ({ newIndex, oldIndex }) => {
        const rowSelected = this.categories.splice(oldIndex, 1)[0];
        this.categories.splice(newIndex, 0, rowSelected);

        openapi.then((api) => {
          for (let i = newIndex; i < this.categories.length; i += 1) {
            const cat = this.categories[i];
            api.packet_editCategory({ uuid: cat.id }, { sort_id: i })
              .catch((err) => {
                console.log(err);
                this.utils.notifyUnexpectedError(err.response.data);
              });
          }
        });
      },
    });
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.packet_getCategories().then((rsp) => {
        this.categories = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createCategory() {
      const data = this.$refs.createCategoryDialog.getData();

      const api = await openapi;

      api.packet_createCategory(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createCategoryDialog.closeAndReset();
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
      }).catch((err) => {
        console.log(err);
        this.$refs.createCategoryDialog.setError(err);
      });
    },
    async editCategory(category) {
      const data = this.$refs.editCategoryDialog.getData();

      const api = await openapi;

      api.packet_editCategory({ uuid: category.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editCategoryDialog.setError(err);
      });
    },
    async deleteCategory(category) {
      const api = await openapi;

      api.packet_deleteCategory({ uuid: category.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteCategoryDialog.setError(err);
      });
    },
    showEditDialog(category) {
      const data = { ...category };

      this.$refs.editCategoryDialog.setData(data);
      this.$refs.editCategoryDialog.show(category);
    },
  },
};
</script>

<style>
  #categories-table tr {
    cursor: move  !important;
  }
</style>
