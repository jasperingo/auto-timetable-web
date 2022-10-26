<script setup lang="ts">
import BaseSelect from "@/components/forms/BaseSelect.vue";
import BigLoader from "@/components/loaders/BigLoader.vue";
import ErrorLoader from "@/components/loaders/ErrorLoader.vue";
import BaseTable from "@/components/tables/BaseTable.vue";
import StaffTableRow from "@/components/tables/StaffTableRow.vue";
import ListFilter from "@/components/utils/ListFilter.vue";
import SubHeader from "@/components/utils/SubHeader.vue";
import { useDepartmentsRead } from "@/composables/departments/departments-read-composable";
import { useStaffsRead } from "@/composables/staffs/staffs-read-composable";
import { useDepartmentsSelectInputOptions } from "@/composables/utils/departments-select-input-options-composable";
import { computed, ref } from "vue";

const HEAD_ITEMS = [
  "S/N",
  "Title",
  "First name",
  "Last name",
  "Staff number",
  "Role",
  "Department",
];

const departmentId = ref("");

const departmentsFetch = useDepartmentsRead();

const departments = useDepartmentsSelectInputOptions(departmentsFetch.data);

const { isLoading, isError, data, error, refetch } =
  useStaffsRead(departmentId);

const refetchAll = () => {
  if (departmentsFetch.isError) {
    departmentsFetch.refetch.value();
  }

  if (isError) {
    refetch.value();
  }
};

const isLoadingAll = computed(
  () => departmentsFetch.isLoading.value || isLoading.value
);

const isErrorAll = computed(
  () => departmentsFetch.isError.value || isError.value
);

const errorAll = computed(() => departmentsFetch.error.value ?? error.value);
</script>

<template>
  <main>
    <div class="container">
      <SubHeader text="Staffs" />

      <BigLoader v-if="isLoadingAll" />

      <ErrorLoader
        @retry="refetchAll"
        :error="errorAll"
        v-else-if="isErrorAll"
      />

      <div v-else>
        <ListFilter>
          <BaseSelect
            label="Department"
            id="department-input"
            :options="departments"
            v-model="departmentId"
          />
        </ListFilter>

        <BaseTable
          :head-items="HEAD_ITEMS"
          :items="data?.data ?? []"
          v-slot="{ item }"
        >
          <StaffTableRow :item="item" />
        </BaseTable>
      </div>
    </div>
  </main>
</template>
