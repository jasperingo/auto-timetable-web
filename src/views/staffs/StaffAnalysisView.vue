<script setup lang="ts">
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import AnalysisItem from "@/components/utils/AnalysisItem.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useAnalysisRead } from "@/composables/analysis/analysis-read-composable";

const { isLoading, isError, data, error, refetch } = useAnalysisRead();
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Analysis" />

      <BigLoader v-if="isLoading" />

      <ErrorLoader v-else-if="isError" :error="error" @retry="refetch" />

      <ul v-else class="flex flex-wrap gap-y-2">
        <AnalysisItem title="Courses" :value="data?.data.courses" />
        <AnalysisItem title="Departments" :value="data?.data.departments" />
        <AnalysisItem title="Halls" :value="data?.data.halls" />
        <AnalysisItem title="Staffs" :value="data?.data.staffs" />
        <AnalysisItem title="Students" :value="data?.data.students" />
        <AnalysisItem title="Timetables" :value="data?.data.timetables" />
      </ul>
    </div>
  </main>
</template>
