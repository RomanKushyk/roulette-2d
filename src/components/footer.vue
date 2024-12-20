<template>
  <div class="footer-content">
    <div class="footer-text">© 2024 Roulette</div>
  </div>
</template>

<script setup lang="ts">
  import Logo from '~/assets/images/logo-roulette.png';
  import { AppState } from '~/interfaces/enums';

  const appStore = useAppStore();
  const { appState } = storeToRefs(appStore);
</script>

<style scoped lang="scss"></style>
