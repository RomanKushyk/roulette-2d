<template>
  <transition name="fade-zoom">
    <div
      v-if="loading"
      id="loader"
    >
      <div class="roulette" />

      <p class="text">
        Loading...
      </p>
    </div>
  </transition>
</template>

<script setup lang="ts">
  const appStore = useAppStore();
  const { loading } = storeToRefs(appStore);
</script>

<style scoped lang="scss">
  #loader {
    @include absTopLeft(0, 0);
    @include rectangle(100dvw, var(--viewport-height));
    @include flexBox(column, center, center, 15px);
    pointer-events: auto;
    background-color: #022;
    z-index: 100;

    .roulette {
      position: relative;
      width: min(20dvw, 10dvh);
      aspect-ratio: 1;
      border-radius: 160px;
      background-image: radial-gradient(
          closest-side,
          #022 44%,
          #fff 45% 47%,
          transparent 48% 61%,
          #fff 62% 64%,
          #022 65% 95%,
          #fff 96% 97%,
          #022 100%
        ),
        repeating-conic-gradient(red 0deg 7deg, #fff 8deg 9deg, black 10deg 17deg, #fff 18deg 19deg, red 20deg);
      animation: roulette 8s infinite linear;

      @keyframes roulette {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 30%;
        aspect-ratio: 1;
        background-image: radial-gradient(#fff 20%, transparent 21%),
          linear-gradient(transparent 45%, #fff 46% 54%, transparent 55%),
          linear-gradient(90deg, transparent 45%, #fff 46% 54%, transparent 55%);
        animation: rouletteCenter 1s infinite linear;

        @keyframes rouletteCenter {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 10%;
        width: 10%;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: #fff;
        transform-origin: 50% 450%;
        animation: rouletteBall 2s infinite linear;

        @keyframes rouletteBall {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(0%);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(0%);
          }
        }
      }
    }

    .text {
      font-family: "Lilita One", serif;
      color: #fff;
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
</style>
