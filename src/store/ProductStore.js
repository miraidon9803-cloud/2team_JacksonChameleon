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

  // 검색어
  searchWord: "",
  setSearchWord: (word) => set({ searchWord: word }),
  clearSearch: () => set({ searchWord: "" }),

  // 검색창 ON/OFF
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true, searchWord: "" }),
  closeSearch: () => set({ isSearchOpen: false }),

  // 최근 검색어 기능 추가
  recentSearch: JSON.parse(localStorage.getItem("recentSearch") || "[]"),

  addRecentSearch: (word) =>
    set((state) => {
      const updated = [
        word,
        ...state.recentSearch.filter((w) => w !== word)
      ].slice(0, 5); // 최대 5개 유지

      localStorage.setItem("recentSearch", JSON.stringify(updated));
      return { recentSearch: updated };
    }),

  clearRecentSearch: () => {
    localStorage.removeItem("recentSearch");
    set({ recentSearch: [] });
  },

  deleteOne: (word) =>
    set((state) => {
      const updated = state.recentSearch.filter((w) => w !== word);
      localStorage.setItem("recentSearch", JSON.stringify(updated));
      return { recentSearch: updated };
    }),

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
