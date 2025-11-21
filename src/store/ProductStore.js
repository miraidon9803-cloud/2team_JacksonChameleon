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

      //장바구니 금액
      //선택된 아이템 배열 구하기
      getSelectedItems: () => {
        const { cartItems } = get();
        return cartItems.filter(item => item.checked);
      },

      //한 아이템 가격
      getItemTotal: (item) => {
        if (!item) return 0;

        const sizePrice = item.size?.price || 0;
        const addPrice = item.add?.price || 0;
        return (sizePrice + addPrice) * item.qty;
      },

      //선택된 총 제품가격
      getSelectedTotalPrice: () => {
        const { getSelectedItems, getItemTotal } = get();
        const selected = getSelectedItems();
        if (selected.length === 0) return 0;

        return selected.reduce((sum, item) => {
          return sum + getItemTotal(item);
        }, 0)
      },

      //선택된 제품 기준 할인된 금액
      getItemSalePrice: () => {
        const { getSelectedItems, getItemTotal } = get();
        const selected = getSelectedItems();
        if (selected.length === 0) return 0;

        return selected.reduce((sum, item) => {
          if (!item.sale) return sum;

          const basePrice = getItemTotal(item)

          const saleRate = item.sale;
          const discount = basePrice * saleRate;

          return sum + discount;
        }, 0);
      },

      //적립금
      getsavePoint: () =>{
        const {getSelectedTotalPrice} = get();
        const totalPrice = getSelectedTotalPrice();
        return totalPrice* 0.001
      },

      //옵션 변경하기
      selectedOptions: { sheetType: null, size: null, color: null, addOption: null },

      onOptionChange: (cartId, newColor, newSize, newOption) => {
        let updatedCart = get().cartItems.map((item) => {
          if (item.cartId !== cartId) return item;

          // "없음" 선택 시 null 처리
          const addOption = newOption === "없음" ? null : newOption;

          return {
            ...item,
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
              ((m.add?.id ?? null) === (item.add?.id ?? null))
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

        set({ cartItems: mergedCart, cartCount: mergedCart.length, totalPrice: total });
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
          id: "1",
          text: "Welcome 신규 회원 축하 쿠폰",
          type: "number",
          price: 10000,
          status: "사용가능"
        },
        {
          id: "2",
          text: "겨울맞이 이벤트 쿠폰",
          type: "number",
          price: 20000,
          status: "사용가능"
        },

      ],

      //쿠폰선택
      selectedCoupon: null,     // 최종 적용된 쿠폰
      tempCoupon: null,         // 팝업에서 임시 선택된 쿠폰

      onSelectTempCoupon: (coupon) => set({ tempCoupon: coupon }),

      applyCoupon: () =>
        set((state) => ({
          selectedCoupon: state.tempCoupon,
        })),

      cancelCoupon: () =>
        set({
          selectedCoupon: null,
          tempCoupon: null,
        }),
      //
      finalPrice: 0,

      selectedCoupon: null,
      onSelectCoupon: (coupon) => set({ selectedCoupon: coupon }),

      onFinalPrice: () => {
        const { totalPrice, selectedCoupon, } = get();
        let final = totalPrice;
        if (selectedCoupon) {
          final = (totalPrice - selectedCoupon.price)
        }
        set({
          finalPrice: final
        })
      },


      finPrice: () => {
        const carts = get().cartItems;
        const selected = carts.filter((item) => item.checked);

        if (selected.length === 0) return 0;

        return selected.reduce((sum, item) => {
          const sizePrice = item.size?.price || 0;
          const addPrice = item.add?.price || 0;
          const itemTotal = (sizePrice + addPrice) * item.qty;
          return sum + itemTotal;
        }, 0);
      },



      onFinalPrice: () => {
        const { selectedCoupon, finPrice } = get();

        const selectedTotal = finPrice();

        let final = selectedTotal;

        if (selectedCoupon) {
          final = Math.max(0, selectedTotal - selectedCoupon.price);
        }

        set({ finalPrice: final });
      },

      //주문항목을 저장할 변수
      orderList: [],

      //주문하기
      onAddOrder: () => {
        const { cartItems, orderList } = get()
        const checkItems = cartItems.filter((item) => item.checked === true)
        set({
          orderList: checkItems,
          selectedCoupon: null

        })
        console.log("오더", checkItems, orderList);
        console.log("카트?", cartItems);
      },

      //주문완료
      // onOrderFin: ()=>{
      //      const { orderList, finalPrice } = get()

      //   const newOrder = {
      //     id: new Date().toString(),
      //     date: new Date().toLocaleString(),
      //     items: [...orderList],
      //     totalPrice: finalPrice,
      //     status: "결제완료"
      //   }
      // }
    }))


)