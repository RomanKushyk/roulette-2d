<template>
  <NuxtLayout
    v-if="appState === AppState.game"
    name="gui"
  >
    <Roulette
      :acceleration-duration="1000"
      :constant-speed-duration="5000"
      :deceleration-duration="10000"
      :sectors="37"
      :min-speed="0.5"
      :max-speed="1"
      :start-spin-fn-getter="getStartSpinFn"
      @load="onLoad"
      @spin-end="onSpinEnd"
    />
  </NuxtLayout>

  <NuxtLayout name="splash" />

  <NuxtLayout name="overlay">
    <div :style="{ width: '200px', height: '200px', color: 'white' }">loading...</div>
  </NuxtLayout>

  <NuxtLayout name="loading" />
</template>

<script setup lang="ts">
  import Roulette from '~/components/roulette.vue';
  import { sectorsMap } from '~/constants/sectors-map';

  const appStore = useAppStore();

  const { appState } = storeToRefs(appStore);
  const startSpinFn = ref<(() => void) | null>(null);

  const getStartSpinFn = (fn: () => void) => {
    startSpinFn.value = fn;
  };

  const onLoad = () => {
    appStore.toggleLoading(false);

    if (startSpinFn.value) {
      startSpinFn.value();
    }
  };

  const onSpinEnd = (sector: number) => {
    console.log('----- spin-end -----', sector, sectorsMap[sector]);
  };

  watch(appState, (newAppState) => {
    console.log('appState:', newAppState);
  });
</script>

<style scoped lang="scss"></style>
