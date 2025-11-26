// src/store/ProductStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "../data/JacksonDetail";

export const useProductStore = create(
  persist((set, get) => ({
    /* ----------------------------- 상품 로딩 ----------------------------- */

    items: [],

    onFetchItems: async () => {
      const list = get().items;
      if (list.length > 0) return; // 이미 로딩되었으면 종료
      set({ items: products });
    },

    /* ----------------------------- 검색 기능 ----------------------------- */

    searchWord: "",
    setSearchWord: (word) => set({ searchWord: word }),
    clearSearch: () => set({ searchWord: "" }),

    isSearchOpen: false,
    openSearch: () => set({ isSearchOpen: true, searchWord: "" }),
    closeSearch: () => set({ isSearchOpen: false }),

    // 최근 검색어
    recentSearch: JSON.parse(localStorage.getItem("recentSearch") || "[]"),

    addRecentSearch: (word) =>
      set((state) => {
        const updated = [
          word,
          ...state.recentSearch.filter((w) => w !== word),
        ].slice(0, 5);

        localStorage.setItem("recentSearch", JSON.stringify(updated));
        return { recentSearch: updated };
      }),

    clearRecentSearch: () => {
      localStorage.removeItem("recentSearch");
      set({ recentSearch: [] });
    },

    deleteOneRecentSearch: (word) =>
      set((state) => {
        const updated = state.recentSearch.filter((w) => w !== word);
        localStorage.setItem("recentSearch", JSON.stringify(updated));
        return { recentSearch: updated };
      }),

    hyphenphone : (value) => {
    if (!value) return "";
    const num = String(value).replace(/\D/g, "");
    if (num.length < 4) return num;
    if (num.length < 7) return num.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    return num.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  },
  
    /* ----------------------------- 장바구니 ----------------------------- */

    cartItems: [],
    cartCount: 0,

    // 장바구니 추가
    onAddToCart: (product) => {
      const cart = get().cartItems;

      // 동일 옵션 상품 탐색
      const existing = cart.find(
        (item) =>
          item.id === product.id &&
          item.sheet?.title === product.sheet?.title &&
          item.size?.id === product.size?.id &&
          item.color?.id === product.color?.id &&
          (item.add?.id ?? null) === (product.add?.id ?? null)
      );

      let updated;

      if (existing) {
        // 동일 상품 옵션 → 수량만 추가
        updated = cart.map((item) =>
          item.id === product.id &&
          item.sheet?.title === product.sheet?.title &&
          item.size?.id === product.size?.id &&
          item.color?.id === product.color?.id &&
          (item.add?.id ?? null) === (product.add?.id ?? null)
            ? { ...item, qty: item.qty + product.qty }
            : item
        );
      } else {
        // 새로운 상품 추가
        updated = [
          ...cart,
          {
            ...product,
            qty: product.qty,
            checked: false,
            cartId: `${product.id}-${product.sheet?.title}-${
              product.size?.id
            }-${product.color?.id}-${product.add?.id || "none"}`,
          },
        ];
      }

      set({
        cartItems: updated,
        cartCount: updated.length,
      });
    },
    onClearCart: () =>
      set({
        cartItems: [],
        cartCount: 0,

        // usedPoint: 0,
      }),

    /* ----------------------------- 장바구니 옵션 변경 ----------------------------- */

    onOptionChange: (cartId, newSheet, newColor, newSize, newOption) => {
      let updatedCart = get().cartItems.map((item) => {
        if (item.cartId !== cartId) return item;

        // "없음" 선택 시 null 처리
        const addOption = newOption === "없음" ? null : newOption;

        return {
          ...item,
          sheet: newSheet ?? item.sheet,
          color: newColor ?? item.color,
          size: newSize ?? item.size,
          add: addOption ?? item.add,
          qty: item.qty, // qty는 그대로 유지
        };
      });

      // 중복 옵션 병합
      const mergedCart = [];
      updatedCart.forEach((item) => {
        const id = mergedCart.findIndex(
          (m) =>
            m.id === item.id &&
            m.sheet?.title === item.sheet?.title &&
            m.size?.id === item.size?.id &&
            m.color?.id === item.color?.id &&
            (m.add?.id ?? null) === (item.add?.id ?? null)
        );
        if (id > -1) mergedCart[id].qty += item.qty;
        else mergedCart.push({ ...item });
      });

      // 총 가격 계산
      const total = mergedCart.reduce((acc, item) => {
        const sizePrice = item.size?.price || 0;
        const addPrice = item.add?.price || 0; // add가 null이면 0
        return acc + (sizePrice + addPrice) * item.qty;
      }, 0);

      set({
        cartItems: mergedCart,
        cartCount: mergedCart.length,
        totalPrice: total,
      });
    },

    /* ----------------------------- 수량 변경 ----------------------------- */

    onItemPlus: (item) => {
      set({
        cartItems: get().cartItems.map((i) =>
          i.cartId === item.cartId ? { ...i, qty: i.qty + 1 } : i
        ),
      });
    },

    onItemMinus: (item) => {
      set({
        cartItems: get().cartItems.map((i) =>
          i.cartId === item.cartId ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        ),
      });
    },

    /* ----------------------------- 체크박스 ----------------------------- */

    onCheckCart: (cartId) => {
      set({
        cartItems: get().cartItems.map((item) =>
          item.cartId === cartId ? { ...item, checked: !item.checked } : item
        ),
      });
    },

    /* ----------------------------- 상품 삭제 ----------------------------- */

    onRemoveCart: (target) => {
      const updated = get().cartItems.filter(
        (item) =>
          !(
            item.id === target.id &&
            item.sheet?.title === target.sheet?.title &&
            item.size?.id === target.size?.id &&
            item.color?.id === target.color?.id &&
            (item.add?.id ?? null) === (target.add?.id ?? null)
          )
      );

      set({
        cartItems: updated,
        cartCount: updated.length,
      });
    },
    /* ------------------------- 장바구니 선택 항목 ------------------------- */

    // 선택된 아이템
    getSelectedItems: () => {
      const checkout = get().checkoutItems;
      const cart = get().cartItems;

      // 디테일에서 바로 결제하기 → checkoutItems 사용
      if (checkout.length > 0) return checkout;

      // 장바구니에서 결제하기 → checked 된 아이템 사용
      return cart.filter((item) => item.checked);
    },

    // 단일 아이템 가격
    getItemTotal: (item) => {
      if (!item) return 0;
      const size = item.size?.price || 0;
      const add = item.add?.price || 0;
      return (size + add) * item.qty;
    },

    // 선택된 상품 총합
    getSelectedTotalPrice: () => {
      const items = get().getSelectedItems();
      return items.reduce((sum, item) => {
        const size = item.size?.price || 0;
        const add = item.add?.price || 0;
        return sum + (size + add) * item.qty;
      }, 0);
    },

    // 즉시할인(세일)
    getItemSalePrice: () => {
      const items = get().getSelectedItems();
      return items.reduce((sum, item) => {
        if (!item.sale) return sum;
        const price = (item.size?.price || 0) + (item.add?.price || 0);
        return sum + price * item.qty * item.sale;
      }, 0);
    },

    /* ---------------------------- 결제 및 계산 ---------------------------- */

    //결제창 바로 넘어가기
    checkoutItems: [],
    setCheckoutItems: (items) => set({ checkoutItems: items }),
    resetCheckoutItems: () => set({ checkoutItems: [] }),
    // 총 쿠폰 할인금액
    getCouponDiscount: () => {
      const { selectedCoupon } = get();
      return selectedCoupon?.price || 0;
    },

    // 총 할인금액 = 즉시할인 + 쿠폰
    getTotalDiscount: () => {
      return get().getItemSalePrice() + get().getCouponDiscount();
    },

    // 최종 결제 금액
    getFinalPayment: () => {
      const { getSelectedTotalPrice, getTotalDiscount, usedPoint } = get();

      return getSelectedTotalPrice() - getTotalDiscount() - usedPoint;
    },

    /* ---------------------------- 적립금 ---------------------------- */

    getsavePoint: () => {
      const total = get().getSelectedTotalPrice();
      return Math.floor(total * 0.001);
    },

    usedPoint: 0,

    // 포인트 검증
    validatePoint: (input) => {
      const { myPoint } = get();
      let num = Number(input);

      if (!num) return 0;
      if (num > myPoint) num = myPoint;
      if (num < 1000) return 0;

      return num;
    },

    setUsedPoint: (v) => set({ usedPoint: v }),
    resetUsedPoint: () => set({ usedPoint: 0 }),

    // 현재 보유 포인트
    myPoint: 1000,

    // 포인트 업데이트 (결제 후)
    updateMyPoint: (used, saved) =>
      set((state) => ({
        myPoint: state.myPoint - used + saved,
      })),

    /* ---------------------------- 요청사항 ---------------------------- */

    isReqOpen: false,
    setIsReqOpen: (v) => set({ isReqOpen: v }),
    toggleReqOpen: () => set((state) => ({ isReqOpen: !state.isReqOpen })),

    isCustomInput: false,
    setIsCustomInput: (v) => set({ isCustomInput: v }),

    reqText: "",
    setReqText: (v) => set({ reqText: v }),

    reqOptions: [
      { id: "opt1", label: "부재 시 경비실에 맡겨주세요" },
      { id: "opt2", label: "부재 시 택배함에 놓아주세요" },
      { id: "opt3", label: "배송 전에 연락 부탁드립니다" },
    ],

    /* ---------------------------- 쿠폰 ---------------------------- */

    coupons: [
      { id: "1", text: "Welcome 신규 회원 쿠폰", price: 10000 },
      { id: "2", text: "겨울맞이 할인 쿠폰", price: 20000 },
    ],

    selectedCoupon: null,
    openCoupon: null,

    onSelectopenCoupon: (c) => set({ openCoupon: c }),

    applyCoupon: () =>
      set((state) => ({
        selectedCoupon: state.openCoupon,
        openCoupon: null,
      })),

    cancelCoupon: () => set({ selectedCoupon: null, openCoupon: null }),

    /* ---------------------------- 결제수단 ---------------------------- */

    selectedMethod: "",
    setSelectedMethod: (m) => set({ selectedMethod: m }),

    selectedMethodBtn: null,
    setSelectedMethodBtn: (btn) => set({ selectedMethodBtn: btn }),

    simpleOpt: [
      {
        id: "naver",
        label: "네이버페이",
        img: "/images/pay-naver.png",
        activeimg: "/images/pay-naver-active.png",
      },
      {
        id: "kakao",
        label: "카카오페이",
        img: "/images/pay-kakao.png",
        activeimg: "/images/pay-kakao-active.png",
      },
      {
        id: "samsung",
        label: "삼성페이",
        img: "/images/pay-samsung.png",
        activeimg: "/images/pay-samsung-active.png",
      },
      {
        id: "toss",
        label: "토스페이",
        img: "/images/pay-toss.png",
        activeimg: "/images/pay-toss-active.png",
      },
    ],

    /* ---------------------------- 주문 로직 ---------------------------- */

    orderList: [],

    onAddOrder: () => {
      const { checkoutItems, cartItems } = get();

      // 단독결제 있으면 그걸 우선 사용, 아니면 장바구니에서 checked 된 것만
      const baseItems =
        checkoutItems && checkoutItems.length > 0
          ? checkoutItems
          : cartItems.filter((item) => item.checked);

      set({ orderList: baseItems });
    },

    processPayment: () => {
      const { usedPoint, getsavePoint, updateMyPoint } = get();
      const saved = getsavePoint();
      updateMyPoint(usedPoint, saved);
    },

    resetPaymentState: () =>
      set({
        selectedCoupon: null,
        openCoupon: null,
        usedPoint: 0,
        selectedMethod: "",
        selectedMethodBtn: null,
        reqText: "",
        isReqOpen: false,
        isCustomInput: false,
      }),

    orders: [],

    saveOrder: () => {
      const {
        getSelectedTotalPrice,
        getItemSalePrice,
        getCouponDiscount,
        getFinalPayment,
        getsavePoint,
        selectedMethod,
        selectedMethodBtn,
        orderList,
      } = get();

      const order = {
        orderId: Date.now(),
        orderDate: new Date().toLocaleString(),
        items: orderList,
        productPrice: getSelectedTotalPrice(),
        salePrice: getItemSalePrice(),
        couponDiscount: getCouponDiscount(),
        savePoint: getsavePoint(),
        finalPayment: getFinalPayment(),
        paymentMethod: selectedMethodBtn || selectedMethod,
      };

      set((state) => ({
        orders: [...state.orders, order],
      }));
    },
  }))
);
