import { create } from "zustand";

export const useLogJoinStore = create((set) => ({
  isLogin: true, 
  toggleForm: () => set((state) => ({ isLogin: !state.isLogin })),
}));