<template>
  <div
    class="flex justify-between border border-gray-200 dark:border-gray-700 relative rounded-t-md p-4 border-b-0 not-prose bg-indigo-50 dark:bg-gray-900"
  >
    <div
      type="button"
      class="flex items-center gap-1.5 group focus-visible:outline-primary border-transparent"
      id="headlessui-disclosure-button-noN50rUSPsY_3"
      aria-expanded="false"
      aria-controls="headlessui-disclosure-panel-noN50rUSPsY_4"
      data-headlessui-state=""
    >
      <span class="text-md/6 font-semibold truncate">Dashboard</span>
    </div>

    <ul class="flex items-center">
      <li class="relative">
        <NuxtLink
          exact-active-class="text-primary"
          class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
          to="/dashboard/users"
          >Users</NuxtLink
        >
      </li>
    </ul>

    <div class="flex items-center">
      <UTooltip text="Logout">
        <UButton
          icon="i-heroicons-arrow-right-end-on-rectangle"
          size="sm"
          color="gray"
          variant="ghost"
          :trailing="false"
          @click.prevent="logout"
        />
      </UTooltip>
      <UTooltip :text="isDark ? 'Light' : 'Dark'">
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click.prevent="isDark = !isDark"
        />
      </UTooltip>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { computed } from "vue";

const colorMode = useColorMode();
const toast = useToast();
const router = useRouter();
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

const logout = () => {
  toast.add({
    id: "logout",
    icon: "i-heroicons-check-circle",
    title: "Logout Successfully!",
    timeout: 3000,
  });
  logUserOut();
  router.push("/login");
};
</script>
