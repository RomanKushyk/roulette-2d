<template>
  <NuxtPage />
</template>

<script setup lang="ts">
  const appStore = useAppStore();

  const attachListeners = () => {
    window.addEventListener('resize', handleResize);
    window.matchMedia('(orientation: portrait)').addEventListener('change', onOrientationChange);
  };

  const detachListeners = () => {
    window.removeEventListener('resize', handleResize);
    window.matchMedia('(orientation: portrait)').removeEventListener('change', onOrientationChange);
  };

  const handleResize = () => {
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  };

  const onOrientationChange = (e: MediaQueryListEvent) => {
    appStore.setIsLandscape(!e.matches);
  };

  onMounted(async () => {
    attachListeners();
    handleResize();
  });

  onBeforeUnmount(() => {
    detachListeners();
  });
</script>
