<script setup lang="ts">
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import ExaminationHallTableRow from "@/components/tables/ExaminationHallTableRow.vue";
import ExaminationInvigilatorTableRow from "@/components/tables/ExaminationInvigilatorTableRow.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useExaminationRead } from "@/composables/timetables/examination-read-composable";
import { useRoute } from "vue-router";

const HALL_HEAD_ITEMS = [
  "S/N",
  "Number of students",
  "Hall name",
  "Hall department name",
];

const INVIGILATOR_HEAD_ITEMS = [
  "S/N",
  "Staff title",
  "Staff first name",
  "Staff last name",
];

const route = useRoute();

const { isLoading, isError, data, error, refetch } = useExaminationRead(
  route.params.id[0]
);
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Examination" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <div v-else>
        <div class="shadow p-4 rounded-lg text-xl mb-4">
          Examination for the course {{ data?.data.course.title }} ({{
            data?.data.course.code
          }}) will hold on {{ data?.data.startAt }} for
          {{ data?.data.numberOfStudents }} students, and it will last for
          {{ data?.data.duration }} hours
        </div>

        <BaseTable
          caption="Halls"
          :head-items="HALL_HEAD_ITEMS"
          :items="data?.data.halls ?? []"
          v-slot="{ item }"
        >
          <ExaminationHallTableRow :item="item" />
        </BaseTable>

        <BaseTable
          caption="Invigilators"
          :head-items="INVIGILATOR_HEAD_ITEMS"
          :items="data?.data.invigilators ?? []"
          v-slot="{ item }"
        >
          <ExaminationInvigilatorTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
