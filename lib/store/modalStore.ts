import { create } from "zustand";

interface ModalState {
  modalType: string | null;
  props: any;
}

interface ModalActions {
  openModal: (modalType: string, props?: any) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState & ModalActions>((set) => ({
  modalType: null,
  props: {},
  openModal: (modalType, props) => set({ modalType, props }),
  closeModal: () => set({ modalType: null, props: {} }),
}));

export default useModalStore;
