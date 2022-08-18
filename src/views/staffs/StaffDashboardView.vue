<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <div>Welcome {{ userStore.userId }}</div>
</template>
