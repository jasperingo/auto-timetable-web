<script setup lang="ts">
import { computed, ref } from "vue";

const emit = defineEmits(["update:modelValue", "validityChange"]);

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  modelValue: string;
  required?: boolean;
  minlength?: number;
}>();

const showPassword = ref(false);

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
      @input="onInput"
      :type="inputType"
      :value="modelValue"
      :minlength="minlength"
      :required="required ?? true"
      class="p-2 border border-green-700 rounded-lg outline-none w-full focus:border-2 disabled:bg-gray-200"
    />
    <div v-if="type === 'password'">
      <input
        type="checkbox"
        v-model="showPassword"
        id="-show-password-input"
        class="accent-green-700"
      />
      <label for="-show-password-input" class="text-sm">
        {{ showPasswordInputLabel }}
      </label>
    </div>
  </div>
</template>
