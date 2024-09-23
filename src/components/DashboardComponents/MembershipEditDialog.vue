<template>
  <dialog-form
    ref="editMembershipDialog"
    :form-schema="userMembershipEditForm"
    icon="mdi-account-group"
    :title="$t('_membership.labels.edit')"
    @submit="editUserMembership"
  >
    <template #end-after>
      <ConfirmationDialog
        ref="endMembershipConfirmation"
        :btn-text="$t('_membership.labels.endMembership')"
        @submit="endMembership"
      />
      <v-btn
        color="error"
        variant="text"
        variant="outlined"
        :disabled="!membership.active"
        @click="$refs.endMembershipConfirmation.show()"
      >
        <v-icon start>
          mdi-stop-circle
        </v-icon>
        <span>
          {{ $t('_membership.labels.endMembership') }}
        </span>
      </v-btn>
    </template>
  </dialog-form>
</template>

<script>
import DialogForm from '../DialogForm.vue';
import UserMembershipEditForm from '../../forms/UserMembershipEditForm';
import openapi from '../../api/openapi';
import ConfirmationDialog from '../ConfirmationDialog.vue';

export default {
  name: 'MembershipEditDialog',
  components: {
    ConfirmationDialog,
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
        this.$emit('submit');
      }).catch((err) => {
        this.$refs.editMembershipDialog.setError(err);
      });
    },
    async endMembership() {
      (await openapi).user_endMembership(this.membership.id).then(() => {
        this.$refs.endMembershipConfirmation.closeAndReset();
        this.$refs.editMembershipDialog.closeAndReset();
        this.$emit('submit');
      }).catch((err) => {
        this.$refs.endMembershipConfirmation.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
