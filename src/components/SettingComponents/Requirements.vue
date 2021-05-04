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
   <v-btn @click="$refs.requirementAddDialog.show()">
     Add
   </v-btn>
 </div>
</template>

<script>
import RequirementAddForm from '@/forms/RequirementAddForm';
import RequirementAddFormConditional from '@/forms/RequirementAddFormConditional';
import DialogForm from '@/components/DialogForm.vue';
import GenForm from '@/components/GenForm.vue';

export default {
  name: 'Requirements',
  components: { GenForm, DialogForm },
  data() {
    return {
      requirementAddForm: RequirementAddForm.returnForm(),
      requirementAddFormConditional: null,
    };
  },
  beforeMount() {
    // this.returnForm();
  },
  methods: {
    returnForm() {
      RequirementAddForm.returnForm().then((form) => {
        this.requirementAddForm = form;
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
  },
};

</script>

<style scoped>

</style>
