<template>
  <section
    ref="containerRef"
    class="roulette"
  >
    <Application
      ref="appRef"
      :background-alpha="0.5"
    >
      <Loader
        :resources="[RouletteTexture]"
        @resolved="onResolved"
      >
        <sprite
          :texture="RouletteTexture"
          :x="wheelX"
          :y="wheelY"
          :width="wheelSize"
          :height="wheelSize"
          :anchor="0.5"
          :rotation="rotation"
        />
      </Loader>
    </Application>
  </section>
</template>

<script setup lang="ts">
  import { type ApplicationInst, onTick } from 'vue3-pixi';
  import RouletteTexture from 'assets/images/roulette-wheel.png';
  import { Texture } from 'pixi.js';

  const appStore = useAppStore();

  const containerRef = ref<null | HTMLElement>(null);
  const containerRect = ref<null | DOMRect>(null);
  const wheelSize = ref<number>(0);
  const wheelX = ref<number>(0);
  const wheelY = ref<number>(0);
  const appRef = ref<null | ApplicationInst>(null);
  const rotation = ref<number>(0);

  const attachListeners = () => {
    window.addEventListener('resize', resize);
  };

  const detachListeners = () => {
    window.removeEventListener('resize', resize);
  };

  const init = () => {
    if (!appRef.value || !containerRef.value) return;
  };

  const resize = () => {
    if (!appRef.value || !containerRef.value) return;

    containerRect.value = containerRef.value.getBoundingClientRect();
    wheelSize.value = Math.min(containerRect.value.width, containerRect.value.height) * 0.85;
    wheelX.value = wheelSize.value / 2;
    wheelY.value = wheelSize.value / 2;

    appRef.value.app.renderer.resize(wheelSize.value, wheelSize.value);
  };

  const onResolved = () => {
    console.log('---- resolved ----');
  };

  onMounted(async () => {
    attachListeners();
    init();
    resize();
  });

  onTick(() => {
    rotation.value += 0.01;
  });

  onBeforeUnmount(() => {
    detachListeners();
  });
</script>

<style scoped lang="scss">
  .roulette {
    @include stretchedRectangle;
    @include flexBox(column, center, center);
    background-color: #8080807f;
  }
</style>
