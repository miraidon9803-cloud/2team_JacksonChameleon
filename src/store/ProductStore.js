// src/store/ProductStore.js
import { create } from "zustand";
import { products } from "../data/JacksonDetail";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
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


      //장바구니 
      cartItems: [],
      totalPrice: 0,
      cartCount: 0,

      //메서드
      //장바구니에 추가
      onAddToCart: (product) => {
        const cart = get().cartItems;

        const existing = cart.find((item) =>
          item.id === product.id &&
          item.sheet?.title === product.sheet?.title &&
          item.size?.id === product.size?.id &&
          item.color?.id === product.color?.id &&
          item.add?.id === product.add?.id
        );

        let updateCart;
        if (existing) {
          updateCart = cart.map((item) =>
            item.id === product.id &&
              item.sheet?.title === product.sheet?.title &&
              item.size?.id === product.size?.id &&
              item.color?.id === product.color?.id &&
              item.add?.id === product.add?.id
              ? { ...item, qty: item.qty + product.qty }
              : item
          );
        } else {
          updateCart = [...cart, {
            ...product,
            checked: false,
            cartId: `${product.id}-${product.sheet?.title}-${product.size?.id}-${product.color?.id}-${product.add?.id || "none"}`
          }];

        }



        // alert('장바구니에 추가되었습니다!');

        // 총금액
        let total = 0;
        updateCart.forEach((item) => {
          const sizePrice = item.size?.price || 0;
          const addPrice = item.add?.price || 0;
          const itemTotal = (sizePrice + addPrice) * item.qty;
          total += itemTotal;
        });

        set({
          cartItems: updateCart,
          cartCount: updateCart.length,
          totalPrice: total
        });
      },
      onCheckCart: (cartId) => {
        const carts = get().cartItems;

        //체크박스 토글
        const updateCart = carts.map((cart) =>
          cart.cartId === cartId ? { ...cart, checked: !cart.checked } : cart
        );

        set({ cartItems: updateCart });
        // console.log(updateCart);
      },
      //장바구니삭제
      onRemoveCart: (product) => {
        const cart = get().cartItems;
        const updateCart = cart.filter((item) => !
          (item.id === product.id &&
            item.sheet?.title === product.sheet?.title &&
            item.size?.id === product.size?.id &&
            item.color?.id === product.color?.id &&
            item.add?.id === product.add?.id
          ));
        let total = 0;
        updateCart.forEach((item) => {
          total += (item.size?.price + item.add?.price) * item.qty
        })
        set({
          cartItems: updateCart,
          cartCount: updateCart.length,
          totalPrice: total
        })
      },

      //장바구니 수량추가
      onItemPlus: (product) => {
        const cart = get().cartItems;
        const updateCart = cart.map((item) => (
          item.id === product.id &&
            item.sheet?.title === product.sheet?.title &&
            item.size?.id === product.size?.id &&
            item.color?.id === product.color?.id &&
            item.add?.id === product.add?.id ?
            { ...item, qty: item.qty + 1 } : item
        ));
        let total = 0;
        updateCart.forEach((item) => {
          total += (item.size?.price + item.add?.price) * item.qty
        })
        set({
          cartItems: updateCart,
          cartCount: updateCart.length,
          totalPrice: total
        })
      },

      //장바구니 수량제거
      onItemMinus: (product) => {
        const cart = get().cartItems;
        const updateCart = cart.map((item) => (
          item.id === product.id &&
            item.sheet?.title === product.sheet?.title &&
            item.size?.id === product.size?.id &&
            item.color?.id === product.color?.id &&
            item.add?.id === product.add?.id ?
            { ...item, qty: Math.max(1, item.qty - 1) } : item
        ));
        let total = 0;
        updateCart.forEach((item) => {
          total += (item.size?.price + item.add?.price) * item.qty
        })
        set({
          cartItems: updateCart,
          cartCount: updateCart.length,
          totalPrice: total
        })
      },

      isReqOpen: false,
      setIsReqOpen: () =>
        set((state) => ({
          isReqOpen: !state.isReqOpen
        })),

      isCustomInput: false,
      setIsCustomInput: (v) => set({ isCustomInput: v }),

      reqText: '',
      setReqText: (v) => set({ reqText: v }),

      reqOptions: [
        { id: 'opt1', label: '부재 시 경비실에 맡겨주세요', type: 'preset' },
        { id: 'opt2', label: '부재 시 택배함에 놓아주세요', type: 'preset' },
        { id: 'opt3', label: '배송 전에 연락 부탁드립니다', type: 'preset' },
      ],


      selectedMethod: '',
      setSelectedMethod: (m) => set({ selectedMethod: m }),

      selectedMethodBtn: null,
      setSelectedMethodBtn: (btn) => set({ selectedMethodBtn: btn }),

      simpleOpt: [
        { id: 'naver', label: '네이버페이', img: '/images/pay-naver.png', activeimg: '/images/pay-naver-active.png' },
        { id: 'kakao', label: '카카오페이', img: '/images/pay-kakao.png', activeimg: '/images/pay-kakao-active.png' },
        { id: 'samsung', label: '삼성페이', img: '/images/pay-samsung.png', activeimg: '/images/pay-samsung-active.png' },
        { id: 'toss', label: '토스페이', img: '/images/pay-toss.png', activeimg: '/images/pay-toss-active.png' },
      ],


      //쿠폰을 저장할 변수
      coupons: [
        {
          id: "Welcome",
          text: "Welcome 신규 회원 축하 쿠폰",
          type: "number",
          price: 10000
        }
      ],

      //
      finalPrice: 0,
      //선택된 쿠폰체크
      selectedCoupon: null,
      selectedCoupon: null,
      onSelectCoupon: (coupon) => set({ selectedCoupon: coupon }),
      onFinalPrice: () => {
        const { totalPrice, selectedCoupon } = get();
        let final = totalPrice;
        if (selectedCoupon) {
          final = (totalPrice - selectedCoupon.price)
        }
        set({
          finalPrice: final
        })
      },

      orderList: [],
      //주문하기
      onAddOrder: () => {
        const { cartItems, orderList, finalPrice } = get()

        // const newOrder = {
        //   id: new Date().toString(),
        //   date: new Date().toLocaleString(),
        //   items: [...cartItems],
        //   totalPrice: finalPrice,
        //   status: "결제완료"
        // }
        const checkItems = cartItems.filter((item) => item.checked === true)
        set({
          orderList: checkItems,
          selectedCoupon: null

        })
        console.log("오더", checkItems, orderList);
        console.log("카트?", cartItems);
      }



    }))


)