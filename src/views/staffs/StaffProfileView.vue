<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseDLItem from "@/components/utils/BaseDLItem.vue";
import { useUserStore } from "@/stores/user";
import type { Staff } from "@/models/staff-model";

const userStore = useUserStore();

const staff = userStore.staff as Staff;

const joinDate = new Date(staff.createdAt).toDateString();
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Profile" />
      <dl>
        <BaseDLItem v-if="staff.title" title="Title" :value="staff.title" />
        <BaseDLItem title="First name" :value="staff.firstName" />
        <BaseDLItem title="Last name" :value="staff.lastName" />
        <BaseDLItem title="Staff number" :value="staff.staffNumber" />
        <BaseDLItem title="Role" :value="staff.role" />
        <BaseDLItem
          v-if="staff.department"
          title="Department"
          :value="`${staff.department.name} (${staff.department.code})`"
        />
        <BaseDLItem title="Joined on" :value="joinDate" />
      </dl>
    </div>
  </main>
</template>
