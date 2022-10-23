<script setup lang="ts">
withDefaults(
  defineProps<{
    headItems: string[];
    items: any[];
    keyName?: string;
  }>(),
  {
    keyName: "id",
  }
);
</script>

<template>
  <div class="border py-8 px-4 rounded-lg">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th
              v-for="headItem of headItems"
              :key="headItem"
              class="border text-left p-2"
            >
              {{ headItem }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of items" :key="item[keyName]">
            <slot :item="item"></slot>
          </tr>

          <tr v-if="items.length === 0">
            <td
              class="border p-8 text-center font-bold"
              :colspan="headItems.length"
            >
              No item
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
