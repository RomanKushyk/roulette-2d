import { defineStore } from 'pinia';
import { AppState, Modal } from '~/interfaces/enums';

interface State {
  appState: AppState;
  activeModal: Modal | null;
  loading: boolean;
  selectedNumber: number | null;
  debug: boolean;
  isLandscape: boolean;
}

interface Actions {
  setAppState(state: State['appState']): void;
  showModal(modal: Modal): void;
  hideModal(): void;
  toggleLoading(value?: State['loading']): void;
  setSelectedNumber(number: State['selectedNumber']): void;
  setDebug(debug: State['debug']): void;
  setIsLandscape(isLandScape: State['isLandscape']): void;
}

export const useAppStore = defineStore<'app', State, {}, Actions>('app', {
  state: () => ({
    appState: AppState.splash,
    activeModal: null,
    loading: true,
    selectedNumber: null,
    debug: false,
    isLandscape: false
  }),
  actions: {
    setAppState(state) {
      this.appState = state;
    },
    showModal(modal) {
      this.activeModal = modal;
    },
    hideModal() {
      this.activeModal = null;
    },
    toggleLoading(value) {
      this.loading = value !== undefined ? value : !this.loading;
    },
    setSelectedNumber(number) {
      this.selectedNumber = number;
    },
    setDebug(debug) {
      this.debug = debug;
    },
    setIsLandscape(isLandScape) {
      this.isLandscape = isLandScape;
    }
  }
});
