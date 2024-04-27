<template>
  <div class="lg:px-40 lg:py-20 p-10">
    <div class="border border-gray-200 dark:border-gray-700 rounded">
      <div class="flex items-center justify-between">
        <div
          class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-xl"
        >
          Users
        </div>
        <div
          class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
        >
          <UInput v-model="query" placeholder="Search user..." class="mr-2" />
          <UButton
            icon="i-heroicons-user-plus-20-solid"
            label="Add User"
            :loading="loading"
            @click="
              userActionPopup = true;
              isEdit = false;
              selectedUser = {};
            "
          />
        </div>
      </div>
      <UTable :rows="rows" :columns="columns" :loading="loading">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <div class="flex items-center justify-between px-3 py-3.5">
        <div
          class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-md"
        >
          Total {{ users.length ?? 0 }} user(s)
        </div>
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="users.length"
        />
      </div>
    </div>

    <UModal v-model="deleteConfirmation" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2
              class="text-base text-md font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Delete
            </h2>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="deleteConfirmation = false"
            />
          </div>

          <div class="flex text-gray-600 dark:text-white mt-4">
            Are you sure you want to delete this User ?
          </div>
        </template>

        <template #footer>
          <div class="flex items-center justify-end">
            <UButton
              class="mr-2"
              label="No"
              variant="outline"
              @click="deleteConfirmation = false"
            />
            <UButton
              color="red"
              label="Yes"
              :loading="loading"
              @click="handleDelete"
            />
          </div>
        </template>
      </UCard>
    </UModal>

    <USlideover v-model="userActionPopup" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800 h-full w-full',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2
              class="font-semibold leading-6 text-gray-900 dark:text-white text-lg"
            >
              {{ isEdit ? "Edit" : "Add" }} User
            </h2>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="
                userActionPopup = false;
                isEdit = false;
              "
            />
          </div>
        </template>

        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-6">
          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >First name</label
            >
            <div class="mt-2">
              <UInput v-model="selectedUser.firstname" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Last name</label
            >
            <div class="mt-2">
              <UInput v-model="selectedUser.lastname" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <UInput v-model="selectedUser.email" type="email" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="phone"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone</label
            >
            <div class="mt-2">
              <UInput v-model="selectedUser.phone" type="number" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <UInput v-model="selectedUser.username" />
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-end fixed right-0 bottom-0 p-4">
            <UButton
              class="mr-2"
              label="Cancel"
              variant="outline"
              @click="
                userActionPopup = false;
                isEdit = false;
              "
            />
            <UButton label="Save" :loading="loading" @click="handleSave" />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";

definePageMeta({
  layout: "auth",
});

const toast = useToast();
const { getUsers, removeUser, addUser, updateUser } = useUserStore();
const deleteConfirmation = ref(false);
const userActionPopup = ref(false);
const selectedUser = ref();
const isEdit = ref(false);
const columns = [
  {
    key: "_uuid",
    label: "ID",
  },
  {
    key: "firstname",
    label: "Firstname",
    sortable: true,
  },
  {
    key: "lastname",
    label: "Lastname",
    sortable: true,
  },
  {
    key: "username",
    label: "Username",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "phone",
    label: "Phone",
    sortable: true,
  },
  {
    key: "actions",
  },
];
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isEdit.value = true;
        userActionPopup.value = true;
        selectedUser.value = row;
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        deleteConfirmation.value = true;
        selectedUser.value = row;
      },
    },
  ],
];
const { loading, users } = storeToRefs(useUserStore());

const page = ref(1);
const pageCount = 5;
const query = ref("");

const filteredRows = computed(() => {
  if (!query.value) {
    return users.value;
  }

  return users.value.filter((user) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});
const rows = computed(() => {
  return filteredRows.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const handleDelete = async () => {
  const data = await removeUser(selectedUser.value?._uuid);
  if (data && data._uuid) {
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "User Deleted Successfully!",
      timeout: 3000,
    });
  } else {
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "Error: Failed to delete user.",
      color: "red",
      timeout: 3000,
    });
  }
  query.value = "";
  deleteConfirmation.value = false;
};

const handleSave = async () => {
  let response;
  if (isEdit.value) {
    response = await updateUser([selectedUser.value]);
  } else {
    response = await addUser([selectedUser.value]);
  }
  if (response && (response.items.length || response._uuid)) {
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "User Saved Successfully!",
      timeout: 3000,
    });
    selectedUser.value = {};
  } else {
    toast.add({
      icon: "i-heroicons-check-circle",
      title: "Error: Failed to perform operation on user(s).",
      color: "red",
      timeout: 3000,
    });
  }
  userActionPopup.value = false;
  query.value = "";
  await getUsers();
};

onMounted(async () => {
  await getUsers();
});
</script>
