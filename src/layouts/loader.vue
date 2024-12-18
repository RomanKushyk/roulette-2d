<template>
  <div
    id="loader"
    @click="appStore.setAppState('home')"
  >
    Loading...
  </div>
</template>

<script setup lang="ts">
  const appStore = useAppStore();
</script>

<style scoped lang="scss">
  #loader {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    z-index: 100;
    background-color: #0f0;
  }
</style>
