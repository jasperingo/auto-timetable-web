<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import UserIcon from "vue-material-design-icons/AccountCircle.vue";
import DashboardTopNavLink from "@/components/utils/DashboardTopNavLink.vue";
import { ref } from "vue";
import { useStaffDashboardNavItems } from "@/composables/utils/staff-dashboard-nav-items-composable";
import DashboardNavLink from "@/components/utils/DashboardNavLink.vue";

const showNav = ref(false);
const showTopNav = ref(false);

const navItems = useStaffDashboardNavItems();

const toggleNav = () => (showNav.value = !showNav.value);
const toggleTopNav = () => (showTopNav.value = !showTopNav.value);
</script>

<template>
  <header class="py-4 border-b">
    <div class="container">
      <div class="flex gap-x-4 items-center">
        <button
          @click="toggleNav"
          class="bg-green-700 p-0.5 rounded-lg hover:bg-green-500 lg:hidden"
        >
          <MenuIcon class="block text-green-200" />
        </button>

        <img
          width="25"
          height="25"
          alt="FUTO logo"
          src="@/assets/images/futo-logo.png"
        />

        <h1 class="text-green-700 font-bold text-xl sr-only md:not-sr-only">
          <RouterLink to="/">Auto Timetable</RouterLink>
        </h1>

        <div class="flex-grow relative text-right">
          <button
            @click="toggleTopNav"
            class="block float-right rounded-lg hover:bg-green-200 lg:flex lg:gap-x-2 lg:items-center lg:px-2"
          >
            <UserIcon :size="30" class="block text-green-700" />
            <span class="font-bold hidden lg:block">Jasper Anelechukwu</span>
          </button>

          <ul
            :class="{ hidden: !showTopNav }"
            class="w-fit shadow-lg rounded-lg absolute top-full right-0 bg-white"
          >
            <DashboardTopNavLink
              href="/staff/profile"
              text="Profile"
              @link-clicked="toggleTopNav"
            />
            <DashboardTopNavLink
              href=""
              text="Update password"
              @link-clicked="toggleTopNav"
            />
            <DashboardTopNavLink
              href=""
              text="Log out"
              @link-clicked="toggleTopNav"
            />
          </ul>
        </div>
      </div>
    </div>
  </header>

  <nav
    :class="{ hidden: !showNav }"
    class="fixed w-3/4 h-full pb-16 overflow-auto bg-white border-r-2 lg:block lg:w-72"
  >
    <ul class="py-4">
      <DashboardNavLink
        v-for="navItem in navItems"
        :key="navItem.text"
        :item="navItem"
        @link-clicked="toggleNav"
      />
    </ul>
  </nav>

  <div class="lg:ml-72">
    <RouterView />
  </div>
</template>
