<script setup lang="ts">
import type { WebserviceGenericErrorResponse } from "@/models/web-service-error-response";
import ReloadIcon from "vue-material-design-icons/Refresh.vue";
import { computed } from "vue";

const emit = defineEmits(["retry"]);

const props = withDefaults(
  defineProps<{
    error: any;
    hasAction?: boolean;
  }>(),
  {
    hasAction: true,
  }
);

const code = computed(() => {
  if (props.error instanceof Error) {
    return 500;
  } else {
    return (props.error as WebserviceGenericErrorResponse).status;
  }
});

const message = computed(() => {
  if (props.error instanceof Error) {
    return props.error.message;
  } else {
    return (props.error as WebserviceGenericErrorResponse).error;
  }
});

const onRetry = () => emit("retry");
</script>

<template>
  <div class="p-4 rounded-lg border text-center">
    <div class="font-bold text-red-700 mb-4 text-2xl">{{ code }}</div>
    <div class="font-bold mb-4">{{ message }}</div>
    <button
      v-if="hasAction ?? true"
      @click="onRetry"
      class="mx-auto bg-white flex items-center gap-x-2 p-2 border rounded-lg hover:bg-green-200"
    >
      <ReloadIcon class="block" />
      <span>Retry</span>
    </button>
  </div>
</template>
