<template>
  <div class="menu">
    <div class="header">
      <div class="title">Roulette</div>
    </div>

    <div class="content">
      <div
        v-for="{ name, icon, action } in menuData"
        :key="name"
        class="menu-item"
        @click="action"
      >
        <img
          :src="icon"
          alt="name"
          class="icon"
        />

        <span class="label">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Help from '~/assets/icons/question.png';
import LeaderBoard from '~/assets/icons/table.png';
import Creator from '~/assets/icons/creator.png';
import {Modal} from '~/interfaces/enums';

const appStore = useAppStore();
  const { appState } = storeToRefs(appStore);
  const menuData = ref<{ name: string; icon: string, action: () => void }[]>([
    { name: 'Help', icon: Help, action: appStore.showModal.bind(appStore, Modal.help) },
    { name: 'Leader Board', icon: LeaderBoard, action: appStore.showModal.bind(appStore, Modal.leaderboard) },
    { name: 'Creator', icon: Creator, action: appStore.showModal.bind(appStore, Modal.credits) },
  ]);
</script>

<style scoped lang="scss">
  .menu {
    @include absTopRight(100%, 100%);
    @include flexBox(column, space-between, center);
    aspect-ratio: 1;
    border-radius: 16px;
    background: linear-gradient(0deg, #252525 41.57%, #101010 106.09%);

    & > .header {
      @include flexBox(row, center, center);
      @include rectangle(100%, auto);
      padding: min(15px, 4vw);
      border-bottom: 1px solid #ffffff2f;

      & > .title {
        @include text('Anton', 1rem, 400, 100%);
        letter-spacing: 2px;
        color: #fff;
      }
    }

    & > .content {
      @include flexBox(column, center, center);
      min-width: 100%;
      flex: 1;
      position: relative;
      padding: min(15px, 4vw);

      & > .menu-item {
        @include flexBox(row, flex-start, center, 10px);
        @include rectangle(100%, 30px);
        padding: 4px 14px;
        border-bottom: 2px solid #ffffff2f;

        &:last-child {
          border-bottom: none;
        }

        & > .icon {
          height: 100%;
          aspect-ratio: 1;
        }

        & > .label {
          @include text('Roboto', 1rem, 400, 135%);
          color: #fff;
          white-space: nowrap;
        }
      }
    }
  }
</style>
