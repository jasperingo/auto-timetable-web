<script setup lang="ts"></script>

<template>
  <div class="lg:flex lg:justify-between lg:gap-x-20">
    <div class="lg:w-1/2">
      <slot name="left"></slot>
    </div>
    <div class="lg:w-1/2">
      <slot name="right"></slot>
    </div>
  </div>
</template>
