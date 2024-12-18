import { defineStore } from 'pinia';
import { Modal } from '~/interfaces/enums';

interface State {
  appState: 'loading' | 'splash' | 'home' | 'game' | 'gameover' | 'leaderboard';
  activeModal: Modal | null;
  debug: boolean;
  isLandscape: boolean;
}

interface Actions {
  setAppState(state: State['appState']): void;
  showModal(modal: Modal): void;
  hideModal(): void;
  setDebug(debug: State['debug']): void;
  setIsLandscape(isLandScape: State['isLandscape']): void;
}

export const useAppStore = defineStore<'app', State, {}, Actions>('app', {
  state: () => ({
    appState: 'loading',
    activeModal: null,
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
    setDebug(debug) {
      this.debug = debug;
    },
    setIsLandscape(isLandScape) {
      this.isLandscape = isLandScape;
    }
  }
});
