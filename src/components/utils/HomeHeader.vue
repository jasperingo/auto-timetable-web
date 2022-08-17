<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="py-4 border">
    <div class="container">
      <div class="flex gap-x-2 items-center justify-center">
        <img
          width="50"
          height="50"
          alt="FUTO logo"
          src="@/assets/images/futo-logo.png"
        />
        <h1 class="text-green-700 font-bold text-2xl">
          <RouterLink to="/">Auto Timetable</RouterLink>
        </h1>
      </div>
    </div>
  </header>
</template>
