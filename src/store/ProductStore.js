import { create } from "zustand";
import { products } from "../data/JacksonDetail"

export const useProductStore =create((set,get)=>({
  //상품을 저장할 배열
  items: [],

  onFetchItems: async()=>{
    const currentItems =get().items;
    if (currentItems.length>0) return;
    set ({items:products})
  }
}))