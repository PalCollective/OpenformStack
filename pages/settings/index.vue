<template>
  <div>
    <UTabs
      v-model="selectedTab"
      :items="tabs"
      :ui="{ list: { width: 'w-60' } }"
    >
      <template #settings="{ item }">
        <div class="text-black">Settings</div>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    slot: "settings",
    label: "Settings",
  }
];

const route = useRoute();
const router = useRouter();

const selectedTab = computed({
  get() {
    const index = tabs.findIndex((item) => item.label === route.query.tab);
    if (index === -1) {
      return 0;
    }
    return index;
  },
  set(value) {
    router.replace({
      query: { tab: tabs[value].label },
    });
  },
});
</script>

<style scoped></style>
