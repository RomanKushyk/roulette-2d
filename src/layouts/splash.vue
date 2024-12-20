<template>
  <transition name="fade">
    <div v-if="appState === AppState.splash" id="splash">
      <img
        class="logo"
        :src="Logo"
        alt="Roulette"
      />

      <h1 class="title">Roulette</h1>

      <h2 class="subtitle">Interactive mini-game</h2>

      <button
        class="start"
        @click="onStart"
      >
        Start
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import Logo from '~/assets/images/logo-roulette.png';
  import { AppState } from '~/interfaces/enums';

  const appStore = useAppStore();
  const { appState } = storeToRefs(appStore);

  const onStart = () => {
    appStore.setAppState(AppState.game);
    appStore.toggleLoading(true);
  };
</script>

<style scoped lang="scss">
  #splash {
    @include absTopLeft(0, 0);
    @include rectangle(100dvw, var(--viewport-height));
    @include flexBox(column, center, center, 16px);
    background: linear-gradient(152.97deg, #202020 41.57%, #303030 106.09%);

    & > .logo {
      @include square(min(35dvw, 20dvh));
    }

    & > .title {
      @include textWithoutFName(2.2rem, 135%);
      color: #fff;
    }

    & > .subtitle {
      @include textWithoutFName(1.4rem, 135%);
      color: #fff;
    }

    & > .start {
      @include text('Lilita One', 1.5rem, 400, 100%);
      padding: 8px 16px;
      border: 1px solid #fff;
      border-radius: 8px;
      background: transparent;
      color: #fff;
      cursor: pointer;

      &:hover {
        background: #fff;
        color: #000;
      }
    }
  }
</style>
