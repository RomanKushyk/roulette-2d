<template>
  <div class="header-container">
    <img
      :src="Logo"
      alt=""
      class="logo"
      @click="onLogoClick"
    />

    <div class="title">Roulette</div>

    <div class="menu-wrapper">
      <button
        :class="['menu-button', { active: menuOpen }]"
        @click="onMenuClick"
      />

      <transition name="fade">
        <Menu v-if="menuOpen" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Logo from '~/assets/images/logo-roulette.png';
  import { AppState } from '~/interfaces/enums';

  const appStore = useAppStore();
  const { menuOpen } = storeToRefs(appStore);

  const onLogoClick = () => {
    appStore.setAppState(AppState.splash);
  };

  const onMenuClick = () => {
    appStore.toggleMenu();
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

    & > .menu-wrapper {
      @include flexBox(row, center, center);
      position: relative;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;

      & > .menu-button {
      position: relative;
      height: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: url('~/assets/icons/menu-bar.png') center / 70% no-repeat, #333;
      transition: transform 0.3s ease;

      &.active {
        transform: rotate(90deg);
      }
    }
    }
  }
</style>
