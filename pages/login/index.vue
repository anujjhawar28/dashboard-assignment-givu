<template>
  <div
    class="flex border border-gray-200 dark:border-gray-700 relative rounded-t-md p-4 border-b-0 not-prose bg-white dark:bg-gray-900 py-8"
  >
    <div
      class="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 max-w-sm w-full mx-auto"
    >
      <div class="px-4 py-5 sm:p-6">
        <div class="w-full max-w-sm space-y-6">
          <div class="text-center">
            <div class="mb-2 pointer-events-none">
              <span
                class="i-heroicons-lock-closed w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
              ></span>
            </div>
            <p class="text-2xl text-gray-900 dark:text-white font-bold">
              Welcome Log In
            </p>
          </div>
          <div class="gap-y-6 flex flex-col">
            <form class="space-y-6">
              <div>
                <div>
                  <div
                    class="flex content-center items-center justify-between text-sm"
                  >
                    <label
                      for="n6DZYz9WIK7_363"
                      class="block font-medium text-gray-700 dark:text-gray-200"
                      >Email</label
                    >
                  </div>
                </div>
                <div class="mt-1 relative">
                  <div class="relative">
                    <input
                      id="n6DZYz9WIK7_363"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="flex content-center items-center justify-between text-sm"
                >
                  <label
                    for="n6DZYz9WIK7_364"
                    class="block font-medium text-gray-700 dark:text-gray-200"
                    >Password</label
                  ><span class="text-gray-500 dark:text-gray-400"
                    ><a href="/" class="text-primary font-medium"
                      >Forgot password?</a
                    ></span
                  >
                </div>
                <div class="mt-1 relative">
                  <div class="relative">
                    <input
                      id="n6DZYz9WIK7_364"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                  </div>
                </div>
              </div>
              <div
                class="w-full relative overflow-hidden rounded-lg p-4 bg-red-500 dark:bg-red-400 text-white dark:text-gray-900"
              >
                <div class="flex gap-3 items-center">
                  <span
                    class="i-heroicons-information-circle-20-solid"
                    ui="flex-shrink-0 w-5 h-5"
                  ></span>
                  <div class="w-0 flex-1">
                    <p class="text-sm font-medium">Error while log in</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm text-white dark:text-gray-900 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 dark:disabled:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:focus-visible:outline-primary-400 w-full flex justify-center items-center"
              >
                <span>Log In</span>
              </button>
            </form>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            By login, you agree to our
            <NuxtLink to="/login" class="text-primary font-medium"
              >Terms of Service</NuxtLink
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const login = async () => {
  await useFetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      expiresInMins: 30, // optional, defaults to 60
    }),
  }).then(({ data }) => console.log(data.value));
};

onMounted(async () => {});
</script>
