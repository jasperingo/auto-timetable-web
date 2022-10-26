<script setup lang="ts">
const emit = defineEmits(["noClicked", "yesClicked"]);

const no = () => emit("noClicked");

const yes = () => emit("yesClicked");
</script>

<template>
  <div class="base-form">
    <p class="mb-4">Are you sure you want to log out?</p>

    <ul class="flex gap-x-4">
      <li>
        <button
          @click="no"
          class="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-500"
        >
          Cancel
        </button>
      </li>
      <li>
        <button
          @click="yes"
          class="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-500"
        >
          Confirm
        </button>
      </li>
    </ul>
  </div>
</template>
