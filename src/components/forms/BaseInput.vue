<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const emit = defineEmits(["update:modelValue", "validityChange"]);

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    type?: string;
    error?: string;
    modelValue: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
  }>(),
  {
    required: true,
  }
);

const showPassword = ref(false);

const input = ref<HTMLInputElement | null>(null);

onMounted(() => emit("validityChange", input.value?.validity));

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  } else {
    return props.type ?? "text";
  }
});

const showPasswordInputLabel = computed(() =>
  showPassword.value ? " Hide password" : " Show password"
);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("validityChange", target.validity);
};
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="block">{{ label }}</label>

    <input
      :id="id"
      ref="input"
      @input="onInput"
      :type="inputType"
      :value="modelValue"
      :min="min"
      :max="max"
      :minlength="minlength"
      :maxlength="maxlength"
      :required="required"
      class="p-2 border border-green-700 rounded-lg outline-none w-full bg-white focus:border-2 disabled:bg-gray-200"
    />

    <div v-if="type === 'password'">
      <input
        type="checkbox"
        v-model="showPassword"
        :id="`-show-password-for-${id}`"
        class="accent-green-700"
      />
      <label :for="`-show-password-for-${id}`" class="text-sm">
        {{ showPasswordInputLabel }}
      </label>
    </div>

    <div class="text-red-700 text-sm">{{ error }}</div>
  </div>
</template>
