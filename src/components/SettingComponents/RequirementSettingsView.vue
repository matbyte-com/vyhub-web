<template>
  <div>
    <SettingTitle doc-path="/guide/requirement_set">
      {{ $t('_settings.requirements') }}
    </SettingTitle>
    <p class="text-medium-emphasis mb-4">
      {{ $t('_settings.requirementSetsHint') }}
    </p>
    <DialogForm
      ref="requirementAddDialog"
      :form-schema="requirementAddForm"
      :title="requirementDialogTitle"
      icon="mdi-approximately-equal"
      @submit="saveRequirement"
      @cancel="cancelRequirementInline"
    />
    <DialogForm
      ref="requirementSetAddDialog"
      :form-schema="requirementSetAddForm"
      :title="$t('_settings.addRequirementSet')"
      icon="mdi-greater-than-or-equal"
      @submit="addRequirementSet"
    />
    <DeleteConfirmationDialog
      ref="requirementSetDeleteConfirmationDialog"
      @submit="deleteRequirementSet"
    />
    <!-- Edit Requirement Sets Dialog -->
    <Dialog
      ref="requirementSetEditDialog"
      :title="$t('_settings.editRequirementSet')"
      icon="mdi-greater-than-or-equal"
      :max-width="1500"
    >
      <v-row class="mt-1">
        <v-col
          cols="12"
          md="5"
        >
          <h3 class="display-h3">
            {{ $t('general') }}
          </h3>
          <gen-form
            ref="requirementSetEditForm"
            :form-schema="requirementSetAddForm"
            :submit-text="$t('save')"
            :cancel-text="null"
            class="mt-2"
            @submit="editRequirementSet"
          />

          <v-divider class="my-6" />

          <h3 class="display-h3">
            {{ $t('_settings.requirementSetTest') }}
          </h3>
          <p class="text-medium-emphasis mt-1 mb-3">
            {{ $t('_settings.requirementSetTestHint') }}
          </p>
          <div class="d-flex align-center ga-3">
            <UserSelect
              v-model="testUser"
              class="flex-grow-1"
            />
            <v-btn
              color="primary"
              :disabled="!testUser"
              variant="flat"
              @click="testRequirementSetAgainstUser"
            >
              {{ $t('test') }}
            </v-btn>
          </div>
          <div
            v-if="testResult !== null"
            class="d-flex align-center mt-3"
          >
            <bool-icon
              class="animate__animated animate__heartBeat mr-2"
              :value="testResult"
            />
            <span>
              {{ testResult ? $t('_settings.testFulfilled') : $t('_settings.testNotFulfilled') }}
            </span>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="7"
          class="req-manage-col"
        >
          <h3 class="display-h3">
            {{ $t('requirements') }}
          </h3>
          <p class="text-medium-emphasis mt-1 mb-3">
            {{ $t('_requirement.logicHint') }}
          </p>
          <RequirementLogicGroup
            :model-value="logicTree"
            :requirements="requirements || []"
            :create-requirement="createRequirementInline"
            :edit-requirement="editRequirementInline"
            :resolve-key="resolveKey"
            :is-root="true"
            @update:model-value="onLogicChange"
          />
          <div
            class="d-flex align-center mt-3"
            style="min-height: 28px;"
          >
            <template v-if="logicLoading">
              <v-progress-circular
                indeterminate
                size="16"
                width="2"
                class="mr-2"
              />
              <span class="text-caption text-medium-emphasis">{{ $t('saving') }}</span>
            </template>
            <v-alert
              v-else-if="formulaMsg != null"
              type="error"
              density="compact"
              class="mb-0 py-1"
            >
              {{ formulaMsg }}
            </v-alert>
            <span
              v-else
              class="text-caption text-medium-emphasis d-flex align-center"
            >
              <v-icon
                size="small"
                class="mr-1"
              >
                mdi-content-save-check-outline
              </v-icon>
              {{ $t('savedAutomatically') }}
            </span>
          </div>
        </v-col>
      </v-row>
    </Dialog>
    <!-- Real Component -->
    <DataTable
      :headers="headers"
      :items="requirementSets"
    >
      <template #item.actions="{ item }">
        <div class="text-right">
          <v-btn
            variant="outlined"
            color="primary"
            size="small"
            class="mr-1"
            @click="openEditRequirementSetDialog(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            variant="outlined"
            color="error"
            size="small"
            @click="openDeleteRequirementSetDialog(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
      <template #footer-right>
        <v-btn
          color="success"
          variant="outlined"
          @click="$refs.requirementSetAddDialog.show()"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_settings.addRequirementSet') }}</span>
        </v-btn>
      </template>
    </DataTable>
  </div>
</template>

<script>
import RequirementAddForm from '@/forms/RequirementAddForm';
import RequirementSetAddForm from '@/forms/RequirementSetAddForm';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import RequirementLogicGroup from '@/components/SettingComponents/RequirementLogicGroup.vue';

export default {
  components: { RequirementLogicGroup },
  data() {
    return {
      requirementAddForm: RequirementAddForm.returnForm(),
      requirementSetAddForm: RequirementSetAddForm,
      requirement_set_id: null,
      requirementSets: null,
      requirements: null,
      headers: [
        { title: this.$t('name'), key: 'name' },
        {
          title: this.$t('actions'), key: 'actions', sortable: false, align: 'end',
        },
      ],
      formulaMsg: null,
      logicTree: { connector: '&', children: [] },
      logicLoading: false,
      pendingRequirementResolve: null,
      editingRequirementId: null,
      groupsById: {},
      packetsById: {},
      bundlesById: {},
      testUser: null,
      testResult: null,
    };
  },
  computed: {
    requirementDialogTitle() {
      return this.editingRequirementId
        ? this.$t('_requirement.editRequirement')
        : this.$t('_requirement.addRequirement');
    },
  },
  beforeMount() {
    this.fetchData();
    this.loadKeyLookups();
  },
  methods: {
    async loadKeyLookups() {
      const api = await openapiCached;
      const byId = (list) => Object.fromEntries((list || []).map((i) => [i.id, i]));
      api.group_getGroups().then((rsp) => { this.groupsById = byId(rsp.data); });
      api.packet_getPackets().then((rsp) => { this.packetsById = byId(rsp.data); });
      api.server_getBundles().then((rsp) => { this.bundlesById = byId(rsp.data); });
    },
    async fetchData() {
      (await openapi).requirements_getRequirementSets().then((rsp) => {
        this.requirementSets = rsp.data;
      });
    },
    async fetchRequirements() {
      await (await openapi).requirements_getRequirementSet(this.requirement_set_id).then((rsp) => {
        this.requirements = rsp.data.requirements;
      });
    },
    async addRequirementSet() {
      const data = this.$refs.requirementSetAddDialog.getData();
      const existingIds = new Set((this.requirementSets || []).map((s) => s.id));
      (await openapi).requirements_createRequirementSet(null, data)
        .then(async () => {
          this.$refs.requirementSetAddDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.addSuccess'),
            type: 'success',
          });
          const rsp = await (await openapi).requirements_getRequirementSets();
          this.requirementSets = rsp.data;
          const created = this.requirementSets.find((s) => !existingIds.has(s.id));
          if (created) this.openEditRequirementSetDialog(created);
        }).catch((err) => {
          this.$refs.requirementSetAddDialog.setError(err);
        });
    },
    createRequirementInline() {
      return new Promise((resolve) => {
        this.editingRequirementId = null;
        this.pendingRequirementResolve = resolve;
        this.$refs.requirementAddDialog.setData({});
        this.$refs.requirementAddDialog.show();
      });
    },
    editRequirementInline(req) {
      if (!req) return;
      this.editingRequirementId = req.id;
      this.$refs.requirementAddDialog.setData({ type: this.reqToFormModel(req) });
      this.$refs.requirementAddDialog.show();
    },
    cancelRequirementInline() {
      this.editingRequirementId = null;
      if (this.pendingRequirementResolve) {
        this.pendingRequirementResolve(null);
        this.pendingRequirementResolve = null;
      }
    },
    // For object-select key types, the loaded lookup gives the full object (id + title)
    // so the form's autocomplete and the leaf label can show a name instead of a raw id.
    keyLookup(type) {
      if (type === 'GROUP_MEMBER') return this.groupsById;
      if (type === 'PACKET') return this.packetsById;
      if (type === 'PERMISSION_LEVEL_SB' || type === 'PROPERTY_SB') return this.bundlesById;
      return null;
    },
    resolveKey(req) {
      if (req.key == null) return null;
      const lookup = this.keyLookup(req.type);
      if (!lookup) return req.key;
      const item = lookup[req.key];
      if (!item) return req.key;
      return item.name ?? item.title ?? req.key;
    },
    resolveKeyObject(req) {
      const lookup = this.keyLookup(req.type);
      if (!lookup) return req.key;
      return lookup[req.key] ?? { id: req.key };
    },
    reqToFormModel(req) {
      const model = { type: req.type, operator: req.operator };
      if (req.key !== undefined && req.key !== null) {
        model.key = this.resolveKeyObject(req);
      }
      if (req.value !== undefined && req.value !== null) {
        const isLevel = req.type === 'PERMISSION_LEVEL' || req.type === 'PERMISSION_LEVEL_SB';
        model.value = isLevel ? Number(req.value) : req.value;
      }
      return model;
    },
    saveRequirement() {
      return this.editingRequirementId ? this.updateRequirement() : this.addRequirement();
    },
    async updateRequirement() {
      const data = this.$refs.requirementAddDialog.getData().type;
      data.requirement_set_id = this.requirement_set_id;
      if (data.key && data.key.id) {
        data.key = data.key.id;
      }
      if (data.key && (data.type === 'PERMISSION_LEVEL' || data.type === 'PROPERTY')) {
        delete data.key;
      }

      (await openapi).requirements_editRequirement(this.editingRequirementId, data)
        .then(async () => {
          await this.fetchRequirements();
          this.editingRequirementId = null;
          this.$refs.requirementAddDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.editSuccess'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.requirementAddDialog.setError(err);
        });
    },
    async addRequirement() {
      const data = this.$refs.requirementAddDialog.getData().type;
      data.requirement_set_id = this.requirement_set_id;
      if (data.key && data.key.id) {
        data.key = data.key.id;
      }
      if (data.key && (data.type === 'PERMISSION_LEVEL' || data.type === 'PROPERTY')) {
        delete data.key;
      }

      const existingIds = new Set((this.requirements || []).map((r) => r.id));
      (await openapi).requirements_createRequirement(null, data)
        .then(async () => {
          await this.fetchRequirements();
          // Resolve the inline promise before closeAndReset(): closing emits 'cancel'
          // (-> cancelRequirementInline), which would otherwise resolve it with null first.
          const created = (this.requirements || []).find((r) => !existingIds.has(r.id));
          if (this.pendingRequirementResolve) {
            this.pendingRequirementResolve(created || null);
            this.pendingRequirementResolve = null;
          }
          this.$refs.requirementAddDialog.closeAndReset();
          this.$notify({
            title: this.$t('_messages.addSuccess'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.requirementAddDialog.setError(err);
        });
    },
    async openEditRequirementSetDialog(reqSet) {
      await this.$refs.requirementSetEditDialog.show(reqSet);
      this.$refs.requirementSetEditForm.setData(reqSet);
      this.requirement_set_id = reqSet.id;
      await this.fetchRequirements().then(() => {
        this.logicTree = this.apiToTree(reqSet.formula);
      });
    },
    async editRequirementSet() {
      this.$refs.requirementSetEditForm.loading = true;
      const reqSet = this.$refs.requirementSetEditDialog.getItem();
      (await openapi)
        .requirements_editRequirementSet(reqSet.id, this.$refs.requirementSetEditForm.getData())
        .then(() => {
          this.fetchData();
          this.$refs.requirementSetEditForm.loading = false;
          this.$notify({
            title: this.$t('_messages.editSuccess'),
            type: 'success',
          });
        })
        .catch((err) => {
          this.$refs.requirementSetEditForm
            .setError(err);
          this.$refs.requirementSetEditForm.loading = false;
        });
    },
    openDeleteRequirementSetDialog(reqSet) {
      this.$refs.requirementSetDeleteConfirmationDialog.show(reqSet);
    },
    async deleteRequirementSet(reqSet) {
      (await openapi).requirements_deleteRequirementSet(reqSet.id).then(() => {
        this.fetchData();
        this.$refs.requirementSetDeleteConfirmationDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.requirementSetDeleteConfirmationDialog.setError(err);
      });
    },
    apiToTree(apiFormula) {
      if (!Array.isArray(apiFormula) || apiFormula.length === 0) {
        return { connector: '&', children: [] };
      }
      const operands = [];
      const connectors = [];
      apiFormula.forEach((item) => {
        if (Array.isArray(item) && item.length === 1 && (item[0] === '&' || item[0] === '|')) {
          connectors.push(item[0]);
        } else {
          operands.push(this.apiToNode(item));
        }
      });
      if (operands.length === 1) {
        const only = operands[0];
        return only.children ? only : { connector: '&', children: [only] };
      }
      const uniform = connectors.every((c) => c === connectors[0]);
      if (uniform) {
        return { connector: connectors[0] || '&', children: operands };
      }
      let node = { connector: connectors[0], children: [operands[0], operands[1]] };
      for (let i = 2; i < operands.length; i += 1) {
        node = { connector: connectors[i - 1], children: [node, operands[i]] };
      }
      return node;
    },
    apiToNode(item) {
      if (Array.isArray(item) && item.length === 1 && !Array.isArray(item[0])) {
        return { requirementId: item[0] };
      }
      return this.apiToTree(item);
    },
    treeToApi(group) {
      const arr = [];
      group.children.forEach((child, i) => {
        if (i > 0) arr.push([group.connector]);
        arr.push(child.children ? this.treeToApi(child) : [child.requirementId]);
      });
      return arr;
    },
    pruneTree(group) {
      const children = [];
      group.children.forEach((child) => {
        if (child.children) {
          const pruned = this.pruneTree(child);
          if (pruned.children.length > 0) children.push(pruned);
        } else if ((this.requirements || []).find((r) => r.id === child.requirementId)) {
          children.push(child);
        }
      });
      return { connector: group.connector, children };
    },
    collectIds(group, set) {
      group.children.forEach((child) => {
        if (child.children) this.collectIds(child, set);
        else set.add(child.requirementId);
      });
    },
    onLogicChange(tree) {
      this.logicTree = tree;
      this.saveLogic();
    },
    async saveLogic() {
      this.logicLoading = true;
      this.formulaMsg = null;
      const pruned = this.pruneTree(this.logicTree);
      const formula = pruned.children.length > 0 ? this.treeToApi(pruned) : null;
      const referenced = new Set();
      this.collectIds(pruned, referenced);
      const reqSet = this.$refs.requirementSetEditDialog.getItem();
      try {
        await (await openapi).requirements_editRequirementSet(reqSet.id, { formula });
        const orphans = (this.requirements || []).filter((r) => !referenced.has(r.id));
        if (orphans.length > 0) {
          await Promise.all(orphans.map(async (r) => {
            await (await openapi).requirements_deleteRequirement(r.id);
          }));
          await this.fetchRequirements();
        }
      } catch (err) {
        this.formulaMsg = err.response?.data?.detail || this.utils.formatErrorMessage(err);
      } finally {
        this.logicLoading = false;
      }
    },
    async testRequirementSetAgainstUser() {
      this.testResult = null;
      (await openapi).requirements_testRequirementSet(
        {
          user_id: this.testUser, uuid: this.requirement_set_id,
        },
      )
        .then((res) => {
          this.testResult = res.data;
          this.formulaMsg = null;
        }).catch((err) => {
          this.formulaMsg = this.utils.formatErrorMessage(err);
        });
    },
  },
};

</script>

<style scoped>
@media (min-width: 960px) {
  .req-manage-col {
    border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-left: 24px;
  }
}
</style>
