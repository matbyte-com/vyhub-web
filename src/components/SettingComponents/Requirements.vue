<template>
 <div>
   <DialogForm :form-schema="requirementAddForm" ref="requirementAddDialog"
               @updated="updateConditionalForm" @submit="addRequirement">
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
   {{ requirements }}
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
      requirementSets: null,
      requirements: null,
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
      (await openapi).requirements_getRequirements().then((rsp) => {
        this.requirements = rsp.data;
      });
    },
    updateConditionalForm(test) {
      console.log(test);
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
    async addRequirement() {
      const data = {
        ...this.$refs.requirementAddDialog.getData(),
        ...this.$refs.requirementAddDialogConditional.getData(),
      };
      if (data.type === 'DATE') {
        data.value = [data.begin, data.end];
      }
      (await openapi).requirements_createRequirement(null, data)
        .then(() => {
          this.fetchData();
          this.$refs.requirementAddDialog.closeAndReset();
          this.$refs.requirementAddDialogConditional.cancelForm();
        }).catch((err) => {
          this.$refs.requirementAddDialog.setErrorMessage(err.response.data.detail);
        });
    },
  },
};

</script>

<style scoped>

</style>
