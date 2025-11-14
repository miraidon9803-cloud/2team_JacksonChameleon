// src/store/ProductStore.js
import { create } from "zustand";
import { products } from "../data/JacksonDetail";

export const useProductStore = create((set, get) => ({

  // 상품 저장
  items: [],

  onFetchItems: async () => {
    const currentItems = get().items;
    if (currentItems.length > 0) return;
    set({ items: products });
  },

calculateTotalPrice: () => {
  const { size, addOption, quantity } = get().selectedOptions;

  const sizePrice = size?.price || 0;     
  const addPrice = addOption?.price || 0;

  const total = (sizePrice + addPrice) * quantity;
  return total;
},


  selectedOptions: {
    sheetType: null,
    size: null,
    color: null,
    addOption: null,
  },

  setSelectedOption: (key, value) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [key]: value,
      },
    })),

  resetSelectedOptions: () =>
    set({
      selectedOptions: {
        sheetType: null,
        size: null,
        color: null,
        addOption: null,
      },
    }),
}));
