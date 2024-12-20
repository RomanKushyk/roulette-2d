<template>
  <div class="footer-container">
    <div class="content">
      <div class="result">
        {{ selectedNumber ?? 'None' }}
      </div>

      <button
        class="spin-button"
        @click="startSpin"
      >
        Spin
      </button>
    </div>

    <div class="credits">© 2024 Roulette</div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    spinFn: () => void;
  }>();

  const appStore = useAppStore();
  const { selectedNumber } = storeToRefs(appStore);

  const startSpin = () => {
    appStore.setSelectedNumber(null);
    props.spinFn();
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
