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
        :resources="[WheelTexture, PointerTexture]"
        @resolved="onResolved"
      >
        <sprite
          :texture="WheelTexture"
          :x="wheelX"
          :y="wheelY"
          :width="wheelSize"
          :height="wheelSize"
          :anchor="0.5"
          :rotation="rotation"
        />

        <sprite
          :texture="PointerTexture"
          :x="wheelX"
          :y="wheelY"
          :width="wheelSize * 0.64"
          :height="wheelSize * 0.64"
          :anchor="0.5"
        />
      </Loader>
    </Application>
  </section>
</template>

<script setup lang="ts">
  import { type ApplicationInst, onTick } from 'vue3-pixi';
  import WheelTexture from 'assets/images/roulette-wheel.png';
  import PointerTexture from 'assets/images/roulette-pointer.png';

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

  const resize = () => {
    if (!containerRef.value) return;

    containerRect.value = containerRef.value.getBoundingClientRect();
    wheelSize.value = Math.min(containerRect.value.width, containerRect.value.height);
    wheelX.value = wheelSize.value / 2;
    wheelY.value = wheelSize.value / 2;

    if (!appRef.value) return;

    appRef.value.app.renderer.resize(wheelSize.value, wheelSize.value);
  };

  const onResolved = () => {
    console.log('---- resolved ----');
  };

  onMounted(async () => {
    attachListeners();
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
