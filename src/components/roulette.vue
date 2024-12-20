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
  const startTime = ref<number | null>(null);
  const currentSpeed = ref<number>(0);

  const startAnimation = () => {
    stopAnimation();

    startTime.value = null;
    currentSpeed.value = 0;
    rotation.value = rotation.value % 360;

    const maxSpeed = getRandomSpeed(props.minSpeed, props.maxSpeed);
    const accelerationTime = props.accelerationDuration;
    const constantSpeedTime = props.constantSpeedDuration;
    const decelerationTime = props.decelerationDuration;
    const totalDuration = accelerationTime + constantSpeedTime + decelerationTime;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

    const animate = (time: number) => {
      if (startTime.value === null) {
        startTime.value = time;
      }

      const elapsed = time - startTime.value;

      if (elapsed <= accelerationTime) {
        const t = elapsed / accelerationTime;
        currentSpeed.value = maxSpeed * easeOut(t);
      } else if (elapsed <= accelerationTime + constantSpeedTime) {
        currentSpeed.value = maxSpeed;
      } else if (elapsed <= totalDuration) {
        const decelerationElapsed = elapsed - accelerationTime - constantSpeedTime;
        const t = decelerationElapsed / decelerationTime;
        currentSpeed.value = maxSpeed * (1 - easeOut(t));
      } else {
        currentSpeed.value = 0;
        stopAnimation();
        emit('spin-end', getSector(rotation.value, props.sectors || 37) + 1);
        return;
      }

      rotation.value += (currentSpeed.value * (16.67 / 1000));

      animationFrameId.value = requestAnimationFrame(animate);
    };

    animationFrameId.value = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);

      animationFrameId.value = null;
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
