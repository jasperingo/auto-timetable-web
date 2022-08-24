<script setup lang="ts">
import HomeHeader from "@/components/utils/HomeHeader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import type { WebserviceGenericErrorResponse } from "@/models/web-service-error-response";

const error: WebserviceGenericErrorResponse = {
  status: 404,
  error: "Page not found",
};
</script>

<template>
  <HomeHeader />
  <main>
    <div class="container py-4">
      <ErrorLoader :error="error" :has-action="false" />
    </div>
  </main>
</template>
