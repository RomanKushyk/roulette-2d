<template>
  <div class="header-container">
    <img
      :src="Logo"
      alt=""
      class="logo"
      @click="onLogoClick"
    />

    <div class="title">Roulette</div>

    <button
      class="menu-button"
      @click="onMenuClick"
    >
      <transition name="fade">
        <Menu v-if="showMenu" />
      </transition>
    </button>
  </div>
</template>

<script setup lang="ts">
  import Logo from '~/assets/images/logo-roulette.png';
  import { AppState } from '~/interfaces/enums';

  const appStore = useAppStore();
  const showMenu = ref<boolean>(false);

  const onLogoClick = () => {
    appStore.setAppState(AppState.splash);
  };

  const onMenuClick = () => {
    showMenu.value = !showMenu.value;
  };
</script>

<style scoped lang="scss">
  .header-container {
    @include stretchedRectangle;
    @include flexBox(row, space-between, center);
    padding: 5px;

    & > .logo {
      height: 100%;
      aspect-ratio: 1;
    }

    & > .title {
      @include textWithoutFName(24px, 700, 100%);
      letter-spacing: 2px;
      color: #000;
    }

    & > .subtitle {
      font-size: 16px;
      font-weight: 400;
      color: #fff;
    }

    & > .menu-button {
      position: relative;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: url('~/assets/icons/menu-bar.png') center / 70% no-repeat, #333;
    }
  }
</style>
