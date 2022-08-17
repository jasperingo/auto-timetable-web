<script setup lang="ts">
import HomeLoginLink from "../components/utils/HomeLoginLink.vue";
import HomeHeader from "../components/utils/HomeHeader.vue";
</script>

<template>
  <HomeHeader />
  <main>
    <div class="container">
      <section class="lg:flex lg:gap-x-8 lg:items-center">
        <div class="py-8">
          <p class="font-bold text-3xl mb-4 lg:text-3xl">
            An examination timetable application for the Federal University of
            Technology Owerri.
          </p>
          <ul class="flex gap-x-4">
            <HomeLoginLink text="Student login" href="" />
            <HomeLoginLink text="Staff login" href="/staffs/login" />
          </ul>
        </div>
        <div class="py-8">
          <img
            width="300"
            height="500"
            alt="a boy studying"
            src="@/assets/images/home-image.jpg"
            class="rounded-lg w-full lg:w-[60rem] lg:h-[35rem]"
          />
        </div>
      </section>
    </div>
  </main>
</template>
