<template>
  <dialog-form :form-schema="userMembershipEditForm"
               title-icon="mdi-account-group"
               :title="$t('_membership.labels.edit')"
               ref="editMembershipDialog"
               @submit="editUserMembership"/>
</template>

<script>
import DialogForm from '../DialogForm.vue';
import UserMembershipEditForm from '../../forms/UserMembershipEditForm';
import openapi from '../../api/openapi';

export default {
  name: 'MembershipEditDialog',
  components: {
    DialogForm,
  },
  data() {
    return {
      membership: '',
      userMembershipEditForm: UserMembershipEditForm,
    };
  },
  methods: {
    show(membership) {
      this.membership = membership;
      this.$refs.editMembershipDialog.show();
      this.$refs.editMembershipDialog.setData(membership);
    },
    async editUserMembership() {
      const data = this.$refs.editMembershipDialog.getData();
      (await openapi).user_editMembership(this.membership.id, data).then(() => {
        this.$refs.editMembershipDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editMembershipDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
