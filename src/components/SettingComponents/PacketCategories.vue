<template>
  <div>
    <SettingTitle>{{ $t('categories') }}</SettingTitle>

    <DataTable
      :headers="headers"
      :items="categories"
      :search="true">
      <template v-slot:footer-right>
        <v-btn outlined color="success" @click="$refs.createCategoryDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_packetCategory.labels.create') }}</span>
        </v-btn>
      </template>
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
    <DialogForm
      ref="createCategoryDialog"
      :form-schema="categorySchema"
      titleIcon="mdi-star"
      :submitText="$t('create')"
      @submit="createCategory"
      :title="$t('_packetCategory.labels.create')"/>
    <DialogForm
      ref="editCategoryDialog"
      :form-schema="categorySchema"
      titleIcon="mdi-star"
      :submitText="$t('edit')"
      @submit="editCategory"
      :title="$t('_packetCategory.labels.edit')"/>
    <DeleteConfirmationDialog
      ref="deleteCategoryDialog"
      @submit="deleteCategory"/>
  </div>
</template>

<script>
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import UtilService from '../../services/UtilService';
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
    this.queryData();
  },
  methods: {
    async queryData() {
      const api = await openapi;

      api.packet_getCategories().then((rsp) => {
        this.categories = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
    async createCategory() {
      const data = this.$refs.createCategoryDialog.getData();

      const api = await openapi;

      api.packet_createCategory(null, data).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_packetCategory.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createCategoryDialog.setErrorMessage(err.response.data);
      });
    },
    async editCategory(category) {
      const data = this.$refs.editCategoryDialog.getData();

      const api = await openapi;

      api.packet_editCategory({ uuid: category.id }, data).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_packetCategory.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editCategoryDialog.setErrorMessage(err.response.data);
      });
    },
    async deleteCategory(category) {
      const api = await openapi;

      api.packet_deleteCategory({ uuid: category.id }).then(() => {
        this.queryData();
        this.$notify({
          title: this.$t('_packetCategory.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteCategoryDialog.setErrorMessage(err.response.data);
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

<style scoped>

</style>