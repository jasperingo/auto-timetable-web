<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <main>
    <div class="container">
      <div>Welcome {{ userStore.userId }}</div>
    </div>
  </main>
</template>
