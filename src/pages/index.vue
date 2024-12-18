<template>
  <NuxtLayout name="gui">
    <component :is="Roulette" />
  </NuxtLayout>

  <NuxtLayout name="overlay" :title="'Title'">
    <div :style="{ width: '200px', height: '200px', color: 'white' }">
      loading...
    </div>
  </NuxtLayout>
</template>

<script setup>
  import Roulette from '~/components/roulette.vue';

  const appStore = useAppStore();

  const { appState } = storeToRefs(appStore);

  watch(appState, (newAppState) => {
    console.log('appState:', newAppState);
  });
</script>

<style scoped lang="scss"></style>
