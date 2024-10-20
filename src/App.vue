<template>
  <div id="app">
    <header class="nav-panel">
      <button @click="openModal" type="button" class="nav-panel__btn">
        Создать
      </button>
      <button @click="openEditModal" type="button" class="nav-panel__btn">
        Редактировать
      </button>
    </header>
    <div v-if="isShowModal" class="modal-wrapper">
      <div class="modal">
        <div class="modal__modal-header">
          <span> Модальное окно </span>
          <img
            @click="closeModal"
            @keydown.enter="closeModal"
            src="/icons/crossIcon.svg"
            alt="cross icon"
            class="cross-icon"
            tabindex="0"
          />
        </div>
        <div class="modal__modal-content">
          <div v-for="item in data" :key="item.id" class="inputs_container">
            <span> Поле ввода № {{ item.id }} </span>
            <input
              v-model="item.value"
              placeholder="Введите текст"
              type="text"
              aria-label="text_input"
              class="inputs_container__input"
            />
          </div>
        </div>
        <div class="modal__action-btns">
          <button @click="saveData" type="button" class="action-btn">
            Сохранить
          </button>
          <button @click="closeModal" type="button" class="action-btn">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      initialData: [
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
        { id: 4, value: '' },
        { id: 5, value: '' },
      ],
      isShowModal: false,
    };
  },
  computed: {
    ...mapState({
      storeData: (state) => state.storeData,
    }),
  },
  methods: {
    ...mapMutations(['resetData', 'setData']),
    ...mapActions(['loadData', 'sendData']),
    async openEditModal() {
      await this.loadData();
      this.data = JSON.parse(JSON.stringify(this.storeData));
      this.isShowModal = true;
    },
    openModal() {
      this.data = JSON.parse(JSON.stringify(this.initialData));
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    async saveData() {
      await this.sendData(this.data);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
  background-color: #345360;
}

.nav-panel {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border: 1px solid black;
  background-color: #327693;

  &__btn {
    width: 150px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 2px;
    background-color: #218ebd;
    color: white;
    cursor: pointer;
  }
}

.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 500px;
  border: 1px solid black;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background-color: whitesmoke;

  .modal {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      padding: 10px;
      border-bottom: 1px solid black;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: #a8a8a8;

      .cross-icon {
        cursor: pointer;
      }
    }

    &__modal-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;

      .inputs_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
        gap: 5px;

        &__input {
          padding: 10px;
        }
      }
    }

    &__action-btns {
      display: flex;
      gap: 2px;
      padding: 2px;

      .action-btn {
        width: 100%;
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #218ebd;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
