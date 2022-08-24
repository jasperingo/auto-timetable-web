<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import BigLoader from "./components/loaders/BigLoader.vue";
import ErrorLoader from "./components/loaders/ErrorLoader.vue";

const error = ref(false);
const loading = ref(false);
const errorObj = ref<Error | null>(null);

const router = useRouter();

router.beforeEach(() => {
  error.value = false;
  errorObj.value = null;
  loading.value = true;
});

router.beforeResolve(() => {
  loading.value = false;
});

router.onError((err) => {
  error.value = true;
  errorObj.value = err;
  loading.value = false;
});

const retry = () => window.location.reload();
</script>

<template>
  <main
    v-if="loading || error"
    class="h-screen flex border items-center justify-center"
  >
    <BigLoader v-if="loading" />
    <ErrorLoader v-else-if="error" :error="errorObj" @retry="retry" />
  </main>
  <RouterView v-else />
</template>

<style>
@import "@/assets/css/base.css";
@import "vue-toastification/dist/index.css";
</style>
