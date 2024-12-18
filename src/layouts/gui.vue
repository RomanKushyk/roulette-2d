<template>
  <div
    class="gui"
    @click="appStore.showModal(Modal.help)"
  >
    <div class="container">
      <header class="header">Header</header>

      <main class="content">
        <slot />
      </main>

      <footer class="footer">Footer</footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Modal } from '~/interfaces/enums';

  const appStore = useAppStore();
</script>

<style scoped lang="scss">
  .gui {
    @include absTopLeft(0, 0);
    @include rectangle(100dvw, var(--viewport-height));
    padding: 5px;
    background: linear-gradient(152.97deg, #202020 41.57%, #303030 106.09%);
    z-index: 0;

    & > .container {
      @include stretchedRectangle;
      @include flexBox(column, space-between, center);
      @include backgroundImage('assets/images/table-texture.jpg', cover);
      padding: 4px;
      border-radius: 16px;

      & > .header {
        @include flexBox(column, center, center);
        @include rectangle(100%, 5dvh);
        border-radius: 12px;
        background: linear-gradient(153deg, #f0f0f06f 41.57%, #c9c9c96f 106.09%);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }

      & > .content {
        @include flexBox(column, center, center);
        width: 100%;
        flex: 1;
      }

      & > .footer {
        @include flexBox(column, center, center);
        @include rectangle(100%, 10dvh);
        border-radius: 12px;
        background: linear-gradient(-27deg, #f0f0f07f 41.57%, #c9c9c97f 106.09%);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
      }
    }
  }
</style>
