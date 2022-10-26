import type { StaffAuth } from "@/models/staff-auth-model";
import type { Staff } from "@/models/staff-model";
import type { StudentAuth } from "@/models/student-auth-model";
import type { Student } from "@/models/student-model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userId = ref(0);
  const staff = ref<Staff | null>(null);
  const student = ref<Student | null>(null);
  const accessToken = ref<string | null>(null);

  const clearStore = () => {
    userId.value = 0;
    staff.value = null;
    accessToken.value = null;
  };

  const setStaffAuth = (auth: StaffAuth) => {
    userId.value = auth.staffId;
    accessToken.value = auth.accessToken;
  };

  const setStudentAuth = (auth: StudentAuth) => {
    userId.value = auth.studentId;
    accessToken.value = auth.accessToken;
  };

  const setStaff = (s: Staff) => {
    staff.value = s;
  };

  const setStudent = (s: Student) => {
    student.value = s;
  };

  return {
    userId,
    staff,
    student,
    accessToken,
    setStaffAuth,
    setStudentAuth,
    setStaff,
    setStudent,
    clearStore,
  };
});
