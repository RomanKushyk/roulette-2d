<template>
  <section
    ref="containerRef"
    class="roulette"
  >
    <Application
      ref="appRef"
      :background-alpha="0"
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
  import { type ApplicationInst } from 'vue3-pixi';
  import WheelTexture from 'assets/images/roulette-wheel.png';
  import PointerTexture from 'assets/images/roulette-pointer.png';
  import { getRandomSpeed, getSector } from '~/utils/math';

  const emit = defineEmits<{
    load: [];
    'spin-end': [sector: number];
  }>();
  const props = defineProps<{
    accelerationDuration: number;
    constantSpeedDuration: number;
    decelerationDuration: number;
    minSpeed?: number;
    maxSpeed?: number;
    sectors?: number;
    startSpinFnGetter: (fn: () => void) => void;
  }>();

  const containerRef = ref<null | HTMLElement>(null);
  const containerRect = ref<null | DOMRect>(null);
  const wheelSize = ref<number>(0);
  const wheelX = ref<number>(0);
  const wheelY = ref<number>(0);
  const appRef = ref<null | ApplicationInst>(null);
  const rotation = ref<number>(0);
  const animationFrameId = ref<number | null>(null);
  const elapsedTime = ref<number>(0);
  const currentSpeed = ref<number>(0);

  const startAnimation = () => {
    const maxSpeed = getRandomSpeed(props.minSpeed || 0.2, props.maxSpeed || 1);
    const decelerationTime = props.decelerationDuration;
    const constantSpeedTime = props.constantSpeedDuration;
    const accelerationTime = props.accelerationDuration;

    const accelerationEndTime = accelerationTime;
    const constantSpeedEndTime = accelerationTime + constantSpeedTime;

    elapsedTime.value = 0;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

    const animate = (time: number) => {
      if (!elapsedTime.value) {
        elapsedTime.value = time;
      }

      const delta = time - elapsedTime.value;
      elapsedTime.value = time;

      if (elapsedTime.value <= accelerationEndTime) {
        const t = elapsedTime.value / accelerationTime;
        currentSpeed.value = maxSpeed * easeOut(t);
      } else if (elapsedTime.value <= constantSpeedEndTime) {
        currentSpeed.value = maxSpeed;
      } else {
        const decelerationElapsed = elapsedTime.value - constantSpeedEndTime;
        const t = Math.min(decelerationElapsed / decelerationTime, 1);
        currentSpeed.value = maxSpeed * (1 - easeOut(t));
      }

      if (currentSpeed.value > 0) {
        rotation.value += (currentSpeed.value * delta) / 30; // Плавне обертання
        animationFrameId.value = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId.value!);
        emit('spin-end', getSector(rotation.value, props.sectors || 37) + 1);
      }
    };

    animationFrameId.value = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
    }
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
    emit('load');
  };

  onMounted(() => {
    props.startSpinFnGetter(startAnimation);
    window.addEventListener('resize', resize);
    resize();
  });

  onBeforeUnmount(() => {
    stopAnimation();
    window.removeEventListener('resize', resize);
  });
</script>

<style scoped lang="scss">
  .roulette {
    @include stretchedRectangle;
    @include flexBox(column, center, center);
  }
</style>
