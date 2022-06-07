<template>
  <div>
    <SettingTitle docPath="/guide/shop/packet">
      {{ $t('categories') }}
    </SettingTitle>

    <DataTable
      :headers="headers"
      :items="categories"
      id="categories-table"
      disable-sort
      hide-default-footer
      :showSearch="true">
      <template v-slot:item.enabled="{ item }">
        <BoolIcon :value="item.enabled"></BoolIcon>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deleteCategoryDialog.show(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <v-divider class="mb-3"/>
    <div>
      <v-btn outlined color="success" @click="$refs.createCategoryDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_packetCategory.labels.create') }}</span>
      </v-btn>
    </div>
    <DialogForm
      ref="createCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-star"
      :submitText="$t('create')"
      @submit="createCategory"
      :title="$t('_packetCategory.labels.create')"/>
    <DialogForm
      ref="editCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-star"
      :submitText="$t('edit')"
      @submit="editCategory"
      :title="$t('_packetCategory.labels.edit')"/>
    <DeleteConfirmationDialog
      ref="deleteCategoryDialog"
      @submit="deleteCategory"/>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import CategoryForm from '../../forms/PacketCategoryForm';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'PacketCategories',
  components: {
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
    SettingTitle,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('enabled'), value: 'enabled' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      categories: null,
      categorySchema: CategoryForm,
    };
  },
  beforeMount() {
    this.fetchData();
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
          title: this.$t('_packetCategory.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createCategoryDialog.closeAndReset();
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
          title: this.$t('_packetCategory.messages.editSuccess'),
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
          title: this.$t('_packetCategory.messages.deleteSuccess'),
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
};
</script>

<style>
  #categories-table tr {
    cursor: move  !important;
  }
</style>
