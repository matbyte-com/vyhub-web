<template>
  <div>
    <!-- TODO Label Not Working -->
    <span class="text-subtitle-1">{{ label }}</span>
    <v-combobox
      ref="autocomplete"
      :model-value="command"
      label="Enter command"
      :custom-filter="filterOptions"
      :items="options"
      hide-no-data
      @blur="autocompleteOpen = false"
      @update:model-value="onAutocompleteChange"
      @update:search="handleSearch"
    />
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount, defineProps, computed } from "vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  statefulLayout: {
    type: Object,
    required: true,
  },
});

const autocomplete = ref(null);
const command = ref('');
const options = ['{username}', '{map}'];
const autocompleteOpen = ref(false);

// Get the bounds of the current template variable being edited
const getCurrentTemplateBounds = () => {
  if (!autocomplete.value) return null;

  const input = autocomplete.value.$el.querySelector('input');
  const cursorPos = input.selectionStart;
  const fullText = input.value || '';

  // Find the opening brace before cursor
  const textBeforeCursor = fullText.slice(0, cursorPos);
  const lastOpenBraceIndex = textBeforeCursor.lastIndexOf('{');

  if (lastOpenBraceIndex === -1) return null;

  // Find the closing brace after the opening brace
  const textAfterOpen = fullText.slice(lastOpenBraceIndex);
  const nextCloseBraceIndex = textAfterOpen.indexOf('}');

  // If we found both braces, return the bounds
  if (nextCloseBraceIndex !== -1) {
    return {
      start: lastOpenBraceIndex,
      end: lastOpenBraceIndex + nextCloseBraceIndex + 1,
      current: textAfterOpen.slice(1, nextCloseBraceIndex)
    };
  }

  // If no closing brace, return bounds up to cursor
  return {
    start: lastOpenBraceIndex,
    end: cursorPos,
    current: textBeforeCursor.slice(lastOpenBraceIndex + 1)
  };
};

const filterOptions = (item, queryText, itemText) => {
  if (!autocomplete.value) return false;

  const input = autocomplete.value.$el.querySelector('input');
  const cursorPos = input.selectionStart;
  const textBeforeCursor = input.value.slice(0, cursorPos);
  const lastOpenBraceIndex = textBeforeCursor.lastIndexOf('{');

  if (lastOpenBraceIndex !== -1) {
    const query = textBeforeCursor.slice(lastOpenBraceIndex + 1).toLowerCase();
    return item.toLowerCase().includes(query);
  }
  return false;
};

const handleSearch = (searchInput) => {
  // Keep the original input value
  const input = autocomplete.value.$el.querySelector('input');
  if (input) {
    input.value = command.value;
  }
};

const onAutocompleteChange = (newValue) => {
  if (!autocomplete.value) return;

  const input = autocomplete.value.$el.querySelector('input');
  const bounds = getCurrentTemplateBounds();

  if (!bounds || !options.includes(newValue)) {
    // If it's not a selection from our options, just update normally
    command.value = newValue;
    return;
  }

  // Remove the braces from the selected option
  const selectedValue = newValue.replace(/[{}]/g, '');

  // Get the current input value (not the v-model value)
  const currentInputValue = input.value;

  // Reconstruct the command with the new template variable
  const newCommand =
    currentInputValue.slice(0, bounds.start) +
    '{' + selectedValue + '}' +
    currentInputValue.slice(bounds.end);

  // Update the command
  command.value = newCommand;
};

onBeforeMount(() => {
  command.value = props.node.data;
});

// Watch for changes to `content`
watch(command, (newValue) => {
  // Call the input method whenever content changes
  props.statefulLayout.input(props.node, newValue);
})
</script>
