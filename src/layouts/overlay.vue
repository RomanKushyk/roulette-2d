<template>
  <transition name="fade">
    <div
      v-if="overlayVisible"
      :class="['overlay', { fullscreen: allowFullscreen }]"
    >
      <transition name="fade-slide">
        <div
          v-show="contentVisible"
          class="container"
          :style="{ width, height }"
        >
          <div class="header">
            <h3
              v-if="name"
              class="title"
            >
              {{ name }}
            </h3>

            <button
              class="close"
              title="Close"
              @click="close"
            />
          </div>

          <div class="content">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAppStore } from '~/stores/app-store';
  import { modalsData } from '~/mocks/modals-data';

  const props = defineProps<{
    allowFullscreen?: boolean;
    width?: string;
    height?: string;
    title?: string;
  }>();

  const appStore = useAppStore();
  const { activeModal } = storeToRefs(appStore);
  const overlayVisible = ref<boolean>(!!activeModal.value);
  const contentVisible = ref<boolean>(!!activeModal.value);
  const name = ref<string>('');

  const close = () => {
    appStore.hideModal();
  };

  watch(activeModal, (value) => {
    if (value) {
      name.value = props.title || modalsData[value].title;
      overlayVisible.value = true;
      requestAnimationFrame(() => {
        contentVisible.value = true;
      });
    } else {
      contentVisible.value = false;
      setTimeout(() => {
        overlayVisible.value = false;
      }, 300);
    }
  });
</script>

<style scoped lang="scss">
  .overlay {
    @include overlay(100dvw, var(--viewport-height));
    @include flexBox(column, center, center);
    padding: max(100px, 16vh) max(20px, 10vw);
    background: linear-gradient(0deg, #2020207f 41.57%, #1010107f 106.09%);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 100;

    &.fullscreen {
      padding: 0;
    }

    & > .container {
      @include flexBox(column, space-between, center);
      position: relative;
      border-radius: 16px;
      background: linear-gradient(0deg, #252525 41.57%, #101010 106.09%);
      overflow: hidden;

      & > .header {
        @include flexBox(row, space-between, center, 20px);
        @include rectangle(100%, auto);
        padding: min(15px, 4vw);
        border-bottom: 1px solid #ffffff2f;

        & > .title {
          color: #fff;
          font-size: min(1.2em, 4vw);
        }

        & > .close {
          @include circle(min(22px, 5vw));
          margin-left: auto;
          color: #fff;
          cursor: pointer;
          background: url('assets/icons/close.png') center / 40% no-repeat, #f0f0f05f;
        }
      }

      & > .content {
        @include flexBox(column, center, center);
        min-width: 100%;
        flex: 1;
        position: relative;
        padding: min(15px, 4vw);
        overflow: hidden;
      }
    }
  }
</style>
