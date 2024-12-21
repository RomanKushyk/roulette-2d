<template>
  <div
    class="gui"
  >
    <div class="container">
      <header class="header">
        <slot name="header" />
      </header>

      <main class="content">
        <slot />
      </main>

      <footer class="footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .gui {
    @include stretchedRectangle;
    position: relative;
    padding: 5px;
    background: linear-gradient(152.97deg, #202020 41.57%, #303030 106.09%);
    z-index: 0;

    & > .container {
      @include stretchedRectangle;
      @include flexBox(column, space-between, center, 16px);
      @include backgroundImage('assets/images/table-texture.jpg', cover);
      padding: 16px;
      border-radius: 16px;

      & > .header,
      & > .footer {
        @include flexBox(column, center, center);
        @include rectangle(100%, max(5dvh, 50px));
        border-radius: max(5dvh, 50px);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);

        &.header {
          background: linear-gradient(153deg, #f0f0f06f 41.57%, #c9c9c96f 106.09%);
        }

        &.footer {
          @include rectangle(100%, max(20dvh, 250px));
          background: linear-gradient(-27deg, #f0f0f07f 41.57%, #c9c9c97f 106.09%);
        }
      }

      & > .content {
        display: block;
        flex: 1;
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
      }
    }
  }
</style>
