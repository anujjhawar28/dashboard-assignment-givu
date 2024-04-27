<template>
  <ClientOnly>
    <div
      class="flex justify-between border border-gray-200 dark:border-gray-700 relative rounded-t-md p-4 border-b-0 not-prose bg-indigo-50 dark:bg-gray-900"
    >
      <button
        type="button"
        class="flex items-center gap-1.5 group w-full focus-visible:outline-primary border-transparent"
        id="headlessui-disclosure-button-noN50rUSPsY_3"
        aria-expanded="false"
        aria-controls="headlessui-disclosure-panel-noN50rUSPsY_4"
        data-headlessui-state=""
      >
        <span class="text-md/6 font-semibold truncate">Dashboard</span>
      </button>
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
    </div>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
