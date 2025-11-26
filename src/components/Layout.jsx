import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SearchPopup from "./SearchPopup";
import { useProductStore } from "../store/ProductStore";

const Layout = () => {
  const { isSearchOpen, closeSearch } = useProductStore();
  const location = useLocation();

  // 경로가 바뀔 때마다 검색 팝업 닫기
  useEffect(() => {
    if (isSearchOpen) {
      closeSearch();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      {isSearchOpen && <SearchPopup />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
