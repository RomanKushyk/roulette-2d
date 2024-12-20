import type { Modal } from '~/interfaces/enums';

export interface ModalData {
  title: string;
  text: string;
  image?: string;
}

export type ModalsData = Record<Modal, ModalData>;
