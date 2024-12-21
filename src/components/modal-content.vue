<template>
  <article
    class="modal-content"
  >
    <div class="img-container">
      <img
        :src="image"
        :alt="title"
        class="illustration"
      />
    </div>

    <p
      v-for="row in text"
      :key="row"
      class="paragraph"
    >
      {{ row }}
    </p>
  </article>
</template>

<script setup lang="ts">
  import { modalsData } from '~/mocks/modals-data';

  const appStore = useAppStore();
  const { activeModal } = storeToRefs(appStore);
  const title = ref<string>('');
  const text = ref<string[]>([]);
  const image = ref<string | undefined>();

  const getModalData = () => {
    if (!activeModal.value) return;

    title.value = modalsData[activeModal.value].title;
    text.value = modalsData[activeModal.value].text.split('\n');
    image.value = modalsData[activeModal.value].image;
  };

  onMounted(() => {
    getModalData();
  });

  watch(activeModal, () => {
    getModalData();
  });
</script>

<style scoped lang="scss">
  .modal-content {
    @include flexBox(column, flex-start, flex-start, 1rem);
    //@include rectangle(35dvw, auto);
    max-width: 500px;
    padding: 1rem 0;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: start;
    overflow-y: auto;

    & > .img-container {
      @include rectangle(100%, auto);
      @include flexBox(column, center, center);

      & > .illustration {
        width: 40%;
        min-width: 150px;
        aspect-ratio: 1;
        object-fit: cover;
      }
    }

    & > .paragraph {
      @include text('Rubik', 1rem, 300, 135%);
      text-align: justify;
    }
  }
</style>
