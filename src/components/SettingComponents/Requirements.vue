<template>
 <div>
   <SettingTitle docPath="/guide/requirements">
     {{ $t('_settings.requirements') }}
   </SettingTitle>
   <DialogForm :form-schema="requirementAddForm" ref="requirementAddDialog"
               @submit="addRequirement" :title="$t('_requirement.addRequirement')"
               icon="mdi-approximately-equal">
   </DialogForm>
   <DialogForm :form-schema="requirementSetAddForm" ref="requirementSetAddDialog"
               :title="$t('settings.addRequirementSet')" icon="mdi-greater-than-or-equal"
               @submit="addRequirementSet"/>
   <DeleteConfirmationDialog ref="requirementSetDeleteConfirmationDialog"
                             @submit="deleteRequirementSet" />
   <DeleteConfirmationDialog ref="requirementDeleteConfirmationDialog"
                             @submit="deleteRequirement" />
   <!-- Edit Requirement Sets Dialog -->
   <Dialog ref="requirementSetEditDialog" :title="$t('settings.editRequirementSet')"
           :max-width="1500">
     <h3 class="display-h3 mt-5">{{ $t('general') }}</h3>
     <gen-form ref="requirementSetEditForm" :form-schema="requirementSetAddForm"
               @submit="editRequirementSet"/>
     <v-divider class="mt-5"/>
     <h3 class="display-h3 mt-5">{{ $t('requirements') }}</h3>
     <DataTable :headers="requirementHeaders" :items="requirements">
       <template v-slot:item.hId="{ item }">
         {{ requirements.findIndex((i) => i.id === item.id) }}
       </template>
       <template v-slot:item.type="{ item }">
         {{ $t(`_requirement.types.${item.type}`) }}
       </template>
       <template v-slot:item.value="{ item }">
         {{ getValue(item) }}
       </template>
       <template v-slot:item.actions="{ item }">
         <div class="text-right">
           <v-btn outlined color="primary" small disabled
                  @click="openEditRequirementSetDialog(item)" class="mr-1">
             <v-icon>
               mdi-pencil
             </v-icon>
           </v-btn>
           <v-btn outlined color="error"
                  small @click="openDeleteRequirementDialog(item)">
             <v-icon>
               mdi-delete
             </v-icon>
           </v-btn>
         </div>
       </template>
       <template v-slot:footer-right>
         <v-btn color="success"
                @click="openRequirementAddDialog($refs.requirementSetEditDialog.getItem())"
                outlined>
           <v-icon left>mdi-plus</v-icon>
           <span>{{ $t('settings.addRequirement') }}</span>
         </v-btn>
       </template>
     </DataTable>
     <v-divider class="mt-5"/>
     <h3 class="display-h3 mt-5">{{ $t('settings.logicFormula') }}</h3>
     <p>{{ $t('example') }} ID & (ID | ID) <br/>
       {{ $t('settings.formulaSymbolOr') }}<br/>
       {{ $t('settings.formulaSymbolAnd') }}</p>
     <v-text-field v-model="formula" label="Formula"></v-text-field>
     <v-btn @click="validateFormula" :disabled="!formula" :loading="formulaBtnLoading"
            class="primary">
       <v-icon v-if="formulaScss" large color="success">mdi-check</v-icon>
       <span v-else>{{ $t('settings.editFormula') }}</span>
     </v-btn>
     <v-row v-if="formulaMsg != null">
       <v-col cols="12" class="mt-4">
         <v-alert
           type="error"
         >
           {{ $t(formulaMsg) }}
         </v-alert>
       </v-col>
     </v-row>
   </Dialog>
   <!-- Real Component -->
   <v-row>
     <v-col cols="12" class="mt-4">
       <v-alert
         type="warning"
       >
         {{ $t('settings.formulaBeta') }}
       </v-alert>
     </v-col>
   </v-row>
   <DataTable
     :headers="headers"
     :items="requirementSets">
     <template v-slot:item.actions="{ item }">
       <div class="text-right">
         <v-btn outlined color="primary" small
                @click="openEditRequirementSetDialog(item)" class="mr-1">
           <v-icon>
             mdi-pencil
           </v-icon>
         </v-btn>
         <v-btn outlined color="error" small @click="openDeleteRequirementSetDialog(item)">
           <v-icon>
             mdi-delete
           </v-icon>
         </v-btn>
       </div>
     </template>
     <template v-slot:footer-right>
       <v-btn color="success" @click="$refs.requirementSetAddDialog.show()" outlined>
         <v-icon left>mdi-plus</v-icon>
         <span>{{ $t('settings.addRequirementSet') }}</span>
       </v-btn>
     </template>
   </DataTable>
 </div>
</template>

<script>
import RequirementAddForm from '@/forms/RequirementAddForm';
import RequirementSetAddForm from '@/forms/RequirementSetAddForm';
import DialogForm from '@/components/DialogForm.vue';
import Dialog from '@/components/Dialog.vue';
import DataTable from '@/components/DataTable.vue';
import GenForm from '@/components/GenForm.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';

export default {
  name: 'Requirements',
  components: {
    SettingTitle,
    DeleteConfirmationDialog,
    GenForm,
    DialogForm,
    DataTable,
    Dialog,
  },
  data() {
    return {
      requirementAddForm: RequirementAddForm.returnForm(),
      requirementSetAddForm: RequirementSetAddForm,
      requirement_set_id: null,
      requirementSets: null,
      requirements: null,
      headers: [
        { text: this.$t('name'), value: 'name' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      requirementHeaders: [
        { text: 'ID', value: 'hId' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('_requirement.requirementOperator'), value: 'operator' },
        { text: this.$t('key'), value: 'key' },
        { text: this.$t('value'), value: 'value' },
        {
          text: this.$t('actions'), value: 'actions', sortable: false, align: 'right',
        },
      ],
      formula: null,
      formulaMsg: null,
      formulaBtnLoading: null,
      formulaScss: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).requirements_getRequirementSets().then((rsp) => {
        this.requirementSets = rsp.data;
      });
    },
    async fetchRequirements() {
      (await openapi).requirements_getRequirementSet(this.requirement_set_id).then((rsp) => {
        this.requirements = rsp.data.requirements;
      });
    },
    async addRequirementSet() {
      const data = this.$refs.requirementSetAddDialog.getData();
      (await openapi).requirements_createRequirementSet(null, data)
        .then(() => {
          this.fetchData();
          this.$refs.requirementSetAddDialog.closeAndReset();
          this.$notify({
            title: this.$t('_requirement.messages.addedSet'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.requirementSetAddDialog.setErrorMessage(err.response.data.detail);
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

      (await openapi).requirements_createRequirement(null, data)
        .then(() => {
          this.fetchData();
          this.fetchRequirements();
          this.$refs.requirementAddDialog.closeAndReset();
          this.$notify({
            title: this.$t('_requirement.messages.addedRequirement'),
            type: 'success',
          });
        }).catch((err) => {
          this.$refs.requirementAddDialog.setErrorMessage(err.response.data.detail);
        });
    },
    async openEditRequirementSetDialog(reqSet) {
      await this.$refs.requirementSetEditDialog.show(reqSet);
      this.requirement_set_id = reqSet.id;
      await this.fetchRequirements();
    },
    async openRequirementAddDialog(reqSet) {
      await this.$refs.requirementAddDialog.setData({});
      await this.$refs.requirementAddDialog.show();
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
            title: this.$t('_requirement.messages.editedRequirement'),
            type: 'success',
          });
        })
        .catch((err) => {
          this.$refs.requirementSetEditForm
            .setErrorMessage(err.response.data.detail);
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
          title: this.$t('_requirement.messages.deletedSet'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.requirementSetDeleteConfirmationDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openDeleteRequirementDialog(requirement) {
      this.$refs.requirementDeleteConfirmationDialog.show(requirement);
    },
    async deleteRequirement(requirement) {
      (await openapi).requirements_deleteRequirement(requirement.id).then(() => {
        this.fetchRequirements();
        this.$refs.requirementDeleteConfirmationDialog.closeAndReset();
        this.$notify({
          title: this.$t('_requirement.messages.deletedRequirement'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.requirementDeleteConfirmationDialog.setErrorMessage(err.response.data.detail);
      });
    },
    getValue(item) {
      if (item.type === 'DATE') {
        return this.utils.formatDate(item.value);
      } return item.value;
    },
    async editFormula(formula) {
      const reqSet = this.$refs.requirementSetEditDialog.getItem();
      (await openapi)
        .requirements_editRequirementSet(reqSet.id, { formula }).then(() => {
          this.formulaBtnLoading = false;
          this.formulaScss = true;
          setTimeout(() => { this.formulaScss = false; }, 5000);
          this.$notify({
            title: this.$t('_requirement.messages.editedFormula'),
            type: 'success',
          });
        }).catch((err) => {
          this.formulaBtnLoading = false;
          this.formulaMsg = err.response.data.detail;
        });
    },
    validateFormula() {
      this.formulaBtnLoading = true;
      let res = null;
      try {
        res = this.validateF(this.formula.replace(/ /g, ''));
        this.editFormula(res);
      } catch (e) {
        if (e instanceof TypeError) {
          this.formulaMsg = 'settings.formulaTypeError';
        } else {
          this.formulaMsg = 'settings.formulaError';
        }
        console.log(e);
        this.formulaBtnLoading = false;
      }
    },
    validateF(s) {
      // push groups of parenthesis, numbers or operators to array
      let substring = '';
      let parenthesisCount = 0;
      const arrayToCheck = [];
      for (let j = 0; j < s.length; j += 1) {
        switch (true) {
          case s[j] === '(':
            parenthesisCount += 1;
            break;
          case s[j] === ')':
            parenthesisCount -= 1;
            break;
          default:
        }
        substring += s[j];
        if (parenthesisCount === 0 && s[j] === ')') {
          arrayToCheck.push(substring);
          substring = '';
        } else if (parenthesisCount === 0 && s[j] !== ')') {
          if (s[j] === '&' || s[j] === '|') {
            if (substring.length > 1) {
              arrayToCheck.push(substring.substring(0, substring.length - 1));
            }
            substring = '';
            arrayToCheck.push(s[j]);
          }
        }
      }
      if (substring.length > 0) {
        arrayToCheck.push(substring);
      }
      // Evaluate IDs, Operators and also recursion
      const res = [];
      arrayToCheck.forEach((t) => {
        switch (true) {
          case /(\(.+?\))/.test(t):
            res.push(this.validateF(t.substring(1, t.length - 1)));
            break;
          case /(\d+)|(\(\d+\))/.test(t):
            res.push([this.requirements[t].id]);
            break;
          case /(&|\|)/.test(t):
            res.push([t]);
            break;
          default:
            throw new Error(`Error While Parsing ${t}`);
        }
      });
      return res;
    },
  },
};

</script>

<style scoped>

</style>
