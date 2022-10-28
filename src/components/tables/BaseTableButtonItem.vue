<script setup lang="ts">
withDefaults(defineProps<{ text: string | number; positive: boolean }>(), {
  positive: true,
});

const emit = defineEmits(["buttonClicked"]);

const onClick = () => emit("buttonClicked");
</script>

<template>
  <td class="border p-2">
    <button
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
