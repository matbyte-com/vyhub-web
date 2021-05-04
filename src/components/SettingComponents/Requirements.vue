<template>
 <div>
   <DialogForm :form-schema="requirementAddForm" ref="requirementAddDialog"
               @updated="updateConditionalForm">
     <template slot="type-after">
       <gen-form v-if="requirementAddFormConditional"
                 ref="requirementAddDialogConditional"
                 :form-schema="requirementAddFormConditional" :hide-buttons="true"/>
     </template>
   </DialogForm>
   <DialogForm :form-schema="requirementSetAddForm" ref="requirementSetAddDialog"
               @submit="addRequirementSet"/>
   <v-btn @click="$refs.requirementAddDialog.show()">
     Add
   </v-btn>
   <v-btn @click="$refs.requirementSetAddDialog.show()">
     Add Set
   </v-btn>
   {{ requirementSets }}
 </div>
</template>

<script>
import RequirementAddForm from '@/forms/RequirementAddForm';
import RequirementAddFormConditional from '@/forms/RequirementAddFormConditional';
import RequirementSetAddForm from '@/forms/RequirementSetAddForm';
import DialogForm from '@/components/DialogForm.vue';
import GenForm from '@/components/GenForm.vue';
import openapi from '@/api/openapi';

export default {
  name: 'Requirements',
  components: { GenForm, DialogForm },
  data() {
    return {
      requirementAddForm: RequirementAddForm.returnForm(),
      requirementAddFormConditional: null,
      requirementSetAddForm: RequirementSetAddForm,
      requirementSets: null
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
    updateConditionalForm() {
      if (this.$refs.requirementAddDialog.getData().type) {
        const { type } = this.$refs.requirementAddDialog.getData();
        this.requirementAddFormConditional = RequirementAddFormConditional.returnForm(type);
        if (this.$refs.requirementAddDialogConditional) {
          this.$refs.requirementAddDialogConditional
            .setData({ operator: RequirementAddForm.types[type][1][0] });
        }
      }
    },
    async addRequirementSet() {
      const data = this.$refs.requirementSetAddDialog.getData();
      (await openapi).requirements_createRequirementSet(null, data)
        .then(() => {
          this.fetchData();
          this.$refs.requirementSetAddDialog.closeAndReset();
        }).catch((err) => {
          this.$refs.requirementSetAddDialog.setErrorMessage(err.response.data.detail);
        });
    },
  },
};

</script>

<style scoped>

</style>
