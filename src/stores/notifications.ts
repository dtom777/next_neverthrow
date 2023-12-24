import { create } from 'zustand';

type State = {
  isVisible: boolean;
  isErr: boolean;
  showNotification: (payload: { isErr: boolean }) => void;
  hideNotification: () => void;
};

const useStore = create<State>((set) => ({
  isVisible: false,
  isErr: false,
  showNotification: (payload) =>
    set({
      isVisible: true,
      isErr: payload.isErr,
    }),
  hideNotification: () => set({ isVisible: false, isErr: false }),
}));
export default useStore;
