<script setup lang="ts">
import HomeHeader from "@/components/utils/HomeHeader.vue";

const emit = defineEmits(["onFormSubmit"]);

const onSubmit = () => emit("onFormSubmit");
</script>

<template>
  <main>
    <div class="h-screen lg:flex lg:items-center">
      <section class="h-full lg:w-1/2 flex flex-col">
        <HomeHeader />
        <div class="flex-grow flex items-center justify-center">
          <form
            method="POST"
            @submit.prevent="onSubmit"
            class="w-full mx-2 py-8 px-4 border rounded-lg my-4 lg:w-96"
          >
            <slot></slot>
          </form>
        </div>
      </section>

      <section class="hidden h-full w-1/2 lg:block">
        <img
          width="300"
          height="500"
          alt="People in a meeting"
          src="@/assets/images/staffs.jpg"
          class="w-full h-full"
        />
      </section>
    </div>
  </main>
</template>
