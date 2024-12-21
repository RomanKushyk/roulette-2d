<template>
  <div class="footer-container">
    <div class="content">
      <div class="result">
        {{ Number.isFinite(selectedNumber) ? selectedNumber : spins ? '✦ Fate turns ✦' : 'None' }}
      </div>

      <button
        class="spin-button"
        @click="startSpin"
      >
        Spin
      </button>
    </div>

    <div class="credits">
      © 2024 Roulette
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    spinFn:(() => void) | null;
  }>();

  const appStore = useAppStore();
  const { selectedNumber } = storeToRefs(appStore);
  const spins = ref<boolean>(false);

  const startSpin = () => {
    spins.value = true;

    appStore.toggleMenu(false);
    appStore.setSelectedNumber(null);

    if (props.spinFn) {
      props.spinFn();
    }
  };
</script>

<style scoped lang="scss">
  .footer-container {
    @include stretchedRectangle;
    @include flexBox(column, center, center);
    padding: 5px;

    & > .content {
      @include flexBox(column, center, center, 15px);
      flex: 1;

      & > .result {
        @include textWithoutFName(1.5rem, 700, 100%);
        letter-spacing: 2px;
      }

      & > .spin-button {
        @include text('Lilita One', 2rem, 700, 100%);
        letter-spacing: 2px;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        background: #333;
        color: #fff;
        cursor: pointer;
      }
    }

    & > .credits {
      @include textWithoutFName(0.8rem, 400, 100%);
      letter-spacing: 2px;
    }
  }
</style>
