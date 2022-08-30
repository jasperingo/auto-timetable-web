<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["update:modelValue", "validityChange"]);

withDefaults(
  defineProps<{
    id: string;
    label: string;
    error?: string;
    modelValue: string;
    required?: boolean;
    options: {
      value: string | number;
      text: string;
    }[];
  }>(),
  {
    required: true,
  }
);

const input = ref<HTMLSelectElement | null>(null);

onMounted(() => emit("validityChange", input.value?.validity));

const onInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
  emit("validityChange", target.validity);
};
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="block">{{ label }}</label>
    <select
      :id="id"
      ref="input"
      @change="onInput"
      :value="modelValue"
      :required="required ?? true"
      class="p-2 border border-green-700 rounded-lg outline-none w-full bg-white focus:border-2 disabled:bg-gray-200"
    >
      <option value="">Choose one</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="text-red-700 text-sm">{{ error }}</div>
  </div>
</template>
