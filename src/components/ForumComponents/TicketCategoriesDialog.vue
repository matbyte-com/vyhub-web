<template>
  <Dialog
    ref="dialog"
    :title="$t('_forum.manageTicketCategories')"
    icon="mdi-tag-multiple"
    :max-width="800"
  >
    <DataTable
      id="ticket-categories-table"
      :headers="headers"
      :items="categories"
      disable-sort
      hide-default-footer
      :items-per-page="-1"
    >
      <template #item.name="{ item }">
        <v-chip
          :color="item.color || '#9E9E9E'"
          variant="flat"
          size="small"
        >
          {{ item.name }}
        </v-chip>
      </template>
      <template #item.enabled="{ item }">
        <BoolIcon :value="item.enabled" />
      </template>
      <template #item.actions="{ item }">
        <div class="text-right">
          <DragDropIcon class="mr-1" />
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
        @click="$refs.createCategoryDialog.show()"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        <span>{{ $t('_forum.addTicketCategory') }}</span>
      </v-btn>
    </div>
    <DialogForm
      ref="createCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-tag"
      :submit-text="$t('create')"
      :title="$t('_forum.addTicketCategory')"
      @submit="createCategory"
    />
    <DialogForm
      ref="editCategoryDialog"
      :form-schema="categorySchema"
      icon="mdi-tag"
      :submit-text="$t('edit')"
      :title="$t('_forum.editTicketCategory')"
      @submit="editCategory"
    />
    <DeleteConfirmationDialog
      ref="deleteCategoryDialog"
      @submit="deleteCategory"
    />
  </Dialog>
</template>

<script>
import Sortable from 'sortablejs';
import openapi from '../../api/openapi';
import CategoryForm from '../../forms/TicketCategoryForm';

export default {
  emits: ['updated'],
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
      sortable: null,
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
      this.fetchData().then(() => {
        this.$nextTick(() => this.initSortable());
      });
    },
    initSortable() {
      const table = document.querySelector('#ticket-categories-table tbody');
      if (!table || this.sortable) {
        return;
      }
      this.sortable = Sortable.create(table, {
        onEnd: ({ newIndex, oldIndex }) => {
          const rowSelected = this.categories.splice(oldIndex, 1)[0];
          this.categories.splice(newIndex, 0, rowSelected);
          this.saveOrder();
        },
      });
    },
    async fetchData() {
      const api = await openapi;

      return api.forum_getTicketCategories().then((rsp) => {
        this.categories = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async createCategory() {
      const data = this.$refs.createCategoryDialog.getData();
      const api = await openapi;

      api.forum_createTicketCategory(null, data).then(() => {
        this.refresh();
        this.$notify({ title: this.$t('_messages.createSuccess'), type: 'success' });
        this.$refs.createCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createCategoryDialog.setError(err);
      });
    },
    async editCategory(category) {
      const data = this.$refs.editCategoryDialog.getData();
      const api = await openapi;

      api.forum_editTicketCategory({ uuid: category.id }, data).then(() => {
        this.refresh();
        this.$notify({ title: this.$t('_messages.editSuccess'), type: 'success' });
        this.$refs.editCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editCategoryDialog.setError(err);
      });
    },
    async deleteCategory(category) {
      const api = await openapi;

      api.forum_deleteTicketCategory({ uuid: category.id }).then(() => {
        this.refresh();
        this.$notify({ title: this.$t('_messages.deleteSuccess'), type: 'success' });
        this.$refs.deleteCategoryDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteCategoryDialog.setError(err);
      });
    },
    showEditDialog(category) {
      this.$refs.editCategoryDialog.setData({ ...category });
      this.$refs.editCategoryDialog.show(category);
    },
    async saveOrder() {
      const api = await openapi;
      const order = this.categories.map((c) => c.id);

      await api.forum_updateTicketCategoryOrder(null, order).then(() => {
        this.$notify({ title: this.$t('_messages.updateOrderSuccess'), type: 'success' });
        this.$emit('updated');
      });
    },
    refresh() {
      this.fetchData();
      this.$emit('updated');
    },
  },
};
</script>

<style>
  #ticket-categories-table tr {
    cursor: move !important;
  }
</style>
