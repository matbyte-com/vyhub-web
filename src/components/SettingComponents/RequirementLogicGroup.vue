<template>
  <div
    class="req-logic-group pa-2"
    :class="{ 'req-logic-group--nested': !isRoot }"
  >
    <div class="d-flex align-center mb-1">
      <v-btn-toggle
        :model-value="modelValue.connector"
        density="compact"
        variant="outlined"
        color="primary"
        mandatory
        divided
        @update:model-value="setConnector"
      >
        <v-btn
          value="&"
          size="small"
        >
          {{ $t('_requirement.matchAll') }}
        </v-btn>
        <v-btn
          value="|"
          size="small"
        >
          {{ $t('_requirement.matchAny') }}
        </v-btn>
      </v-btn-toggle>
      <v-spacer />
      <v-btn
        v-if="!isRoot"
        icon="mdi-close"
        size="x-small"
        variant="text"
        @click="$emit('remove')"
      />
    </div>

    <div
      v-if="modelValue.children.length === 0"
      class="text-disabled text-caption px-2 py-3"
    >
      {{ $t('_requirement.noConditions') }}
    </div>

    <template
      v-for="(child, index) in modelValue.children"
      :key="index"
    >
      <div
        v-if="index > 0"
        class="text-caption font-weight-bold text-primary py-1 pl-2"
      >
        {{ connectorLabel }}
      </div>

      <RequirementLogicGroup
        v-if="isGroup(child)"
        :model-value="child"
        :requirements="requirements"
        :create-requirement="createRequirement"
        :edit-requirement="editRequirement"
        :resolve-key="resolveKey"
        @update:model-value="updateChild(index, $event)"
        @remove="removeChild(index)"
      />

      <div
        v-else
        class="d-flex align-center req-leaf pa-2 mb-1"
      >
        <template v-if="reqById(child.requirementId)">
          <v-icon class="mr-2">
            {{ icon(child.requirementId) }}
          </v-icon>
          <span>{{ label(child.requirementId) }}</span>
        </template>
        <span
          v-else
          class="text-error font-italic"
        >
          {{ $t('_requirement.missingRequirement') }}
        </span>
        <v-spacer />
        <v-btn
          v-if="editRequirement && reqById(child.requirementId)"
          icon="mdi-pencil"
          size="x-small"
          variant="text"
          @click="editRequirement(reqById(child.requirementId))"
        />
        <v-btn
          icon="mdi-close"
          size="x-small"
          variant="text"
          @click="removeChild(index)"
        />
      </div>
    </template>

    <div
      class="d-flex flex-wrap mt-2"
      style="gap: 8px;"
    >
      <v-btn
        size="small"
        variant="tonal"
        color="primary"
        prepend-icon="mdi-plus"
        :loading="adding"
        @click="addCondition"
      >
        {{ $t('_requirement.addCondition') }}
      </v-btn>
      <v-btn
        size="small"
        variant="text"
        prepend-icon="mdi-plus"
        @click="addGroup"
      >
        {{ $t('_requirement.addGroup') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { requirementIcon, requirementLabel } from '@/services/requirementDisplay';
import { useUtils } from '@/services/useUtils';

export default {
  name: 'RequirementLogicGroup',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    requirements: {
      type: Array,
      default: () => [],
    },
    createRequirement: {
      type: Function,
      default: null,
    },
    editRequirement: {
      type: Function,
      default: null,
    },
    resolveKey: {
      type: Function,
      default: null,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'remove'],
  data() {
    return {
      utils: useUtils().data().utils,
      adding: false,
    };
  },
  computed: {
    connectorLabel() {
      return this.modelValue.connector === '|' ? 'OR' : 'AND';
    },
  },
  methods: {
    isGroup(node) {
      return node && Array.isArray(node.children);
    },
    reqById(id) {
      return this.requirements.find((r) => r.id === id);
    },
    icon(id) {
      const req = this.reqById(id);
      return req ? requirementIcon(req) : 'mdi-help-circle-outline';
    },
    label(id) {
      const req = this.reqById(id);
      if (!req) return '';
      const keyName = this.resolveKey ? this.resolveKey(req) : null;
      return requirementLabel(req, this.utils.formatDate, keyName);
    },
    emitUpdate(group) {
      this.$emit('update:modelValue', group);
    },
    setConnector(connector) {
      this.emitUpdate({ ...this.modelValue, connector });
    },
    updateChild(index, child) {
      const children = this.modelValue.children.slice();
      children[index] = child;
      this.emitUpdate({ ...this.modelValue, children });
    },
    removeChild(index) {
      const children = this.modelValue.children.slice();
      children.splice(index, 1);
      this.emitUpdate({ ...this.modelValue, children });
    },
    async addCondition() {
      if (!this.createRequirement) return;
      this.adding = true;
      try {
        const req = await this.createRequirement();
        if (req) {
          const children = this.modelValue.children.slice();
          children.push({ requirementId: req.id });
          this.emitUpdate({ ...this.modelValue, children });
        }
      } finally {
        this.adding = false;
      }
    },
    addGroup() {
      const children = this.modelValue.children.slice();
      children.push({ connector: '&', children: [] });
      this.emitUpdate({ ...this.modelValue, children });
    },
  },
};
</script>

<style scoped>
.req-logic-group--nested {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.req-leaf {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}
</style>
