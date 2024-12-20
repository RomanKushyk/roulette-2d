<template>
  <NuxtLayout
    v-if="appState === AppState.game"
    name="gui"
  >
    <template #header>
      <Header />
    </template>

    <template #default>
      <Roulette
        :acceleration-duration="1000"
        :constant-speed-duration="5000"
        :deceleration-duration="10000"
        :sectors="37"
        :min-speed="5"
        :max-speed="10"
        :start-spin-fn-getter="getStartSpinFn"
        @load="onLoad"
        @spin-end="onSpinEnd"
      />
    </template>

    <template #footer>
      <Footer :spin-fn="startSpinFn" />
    </template>
  </NuxtLayout>

  <NuxtLayout name="splash" />

  <NuxtLayout name="overlay">
    <component :is="ModalContent" />
  </NuxtLayout>

  <NuxtLayout name="loading" />
</template>

<script setup lang="ts">
  import Roulette from '~/components/roulette.vue';
  import ModalContent from '~/components/modal-content.vue';
  import { sectorsMap } from '~/constants/sectors-map';
  import { AppState } from '~/interfaces/enums';

  const appStore = useAppStore();

  const { appState, activeModal } = storeToRefs(appStore);
  const startSpinFn = ref<(() => void) | null>(null);

  const getStartSpinFn = (fn: () => void) => {
    startSpinFn.value = fn;
  };

  const onLoad = () => {
    appStore.toggleLoading(false);
  };

  const onSpinEnd = (sector: number) => {
    appStore.setSelectedNumber(sectorsMap[sector]);
  };
</script>

<style scoped lang="scss"></style>
