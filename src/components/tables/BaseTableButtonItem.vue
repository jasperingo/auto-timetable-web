<script setup lang="ts">
import SmallLoader from "@/components/loaders/SmallLoader.vue";

withDefaults(
  defineProps<{
    text: string | number;
    loading: boolean;
    positive?: boolean;
  }>(),
  {
    positive: true,
  }
);

const emit = defineEmits(["buttonClicked"]);

const onClick = () => emit("buttonClicked");
</script>

<template>
  <td class="border p-2">
    <SmallLoader v-if="loading" />
    <button
      v-else
      @click="onClick"
      class="block w-fit py-2 px-4 text-center text-white font-bold rounded-lg"
      :class="
        positive
          ? 'bg-green-700 hover:bg-green-500'
          : 'bg-red-700 hover:bg-red-500'
      "
    >
      {{ text }}
    </button>
  </td>
</template>
