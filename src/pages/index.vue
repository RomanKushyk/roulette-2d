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
  import Logo from '~/assets/images/logo-roulette.png';
  import MenuBar from '~/assets/icons/menu-bar.png';
  import Close from '~/assets/icons/close.png';
  import Help from '~/assets/icons/question.png';
  import LeaderBoard from '~/assets/icons/table.png';
  import Creator from '~/assets/icons/creator.png';
  import RouletteWheel from '~/assets/images/roulette-wheel.png';
  import Innovator from '~/assets/images/innovator.png';
  import Leaderboard from '~/assets/images/leaderboard.png';
  import WheelTexture from 'assets/images/roulette-wheel.png';
  import PointerTexture from 'assets/images/roulette-pointer.png';
  import TableTexture from 'assets/images/table-texture.jpg';

  import Roulette from '~/components/roulette.vue';
  import ModalContent from '~/components/modal-content.vue';
  import { sectorsMap } from '~/constants/sectors-map';
  import { AppState } from '~/interfaces/enums';
  import { useImgPreload } from '~/utils/nuxt';

  const appStore = useAppStore();

  useImgPreload([
    Logo,
    MenuBar,
    Close,
    Help,
    LeaderBoard,
    Creator,
    RouletteWheel,
    Innovator,
    Leaderboard,
    WheelTexture,
    PointerTexture,
    TableTexture
  ]).then(() => {
    appStore.toggleLoading(false);
  });

  const { appState } = storeToRefs(appStore);
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
