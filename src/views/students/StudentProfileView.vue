<script setup lang="ts">
import SubHeader from "@/components/utils/SubHeader.vue";
import BaseDLItem from "@/components/utils/BaseDLItem.vue";
import { useUserStore } from "@/stores/user";
import type { Student } from "@/models/student-model";

const userStore = useUserStore();

const student = userStore.student as Student;
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Profile" />
      <dl>
        <BaseDLItem title="First name" :value="student.firstName" />
        <BaseDLItem title="Last name" :value="student.lastName" />
        <BaseDLItem
          title="Matricultaion number"
          :value="student.matriculationNumber"
        />
        <BaseDLItem
          title="Session"
          :value="`${student.joinedAt - 1}/${student.joinedAt}`"
        />
        <BaseDLItem
          title="Department"
          :value="`${student.department.name} (${student.department.code})`"
        />
      </dl>
    </div>
  </main>
</template>
