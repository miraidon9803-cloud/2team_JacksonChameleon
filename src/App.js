import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Layout from "./components/Layout";

import MyPage from "./pages/MyPage";
import Map from "./pages/Map";

import CareService from "./pages/CareService";
import CS from "./pages/CS";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
// import NoticeDetails from "./pages/NoticeDetails";
import SamplingService from "./pages/SamplingService";
import Service from "./pages/Service";
import Search from "./pages/Search";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import Sellection from "./pages/Sellection";

import Community from "./pages/Community";
import Collections from "./pages/Collections";
// import ProductList from './components/ProductList';
// import ShopChair from './pages/ShopChair';
// import ShopTable from './pages/ShopTable';
// import ShopSofa from './pages/ShopSofa';
// import ShopLighting from './pages/ShopLighting';
import InkCollection from "./pages/InkCollection";
import PebbleCollection from "./pages/PebbleCollection";
import ClayCollection from "./pages/ClayCollection";
import RoundCollection from "./pages/RoundCollection";
import PlatoCollection from "./pages/PlatoCollection";
import ShoppingCart from "./pages/ShoppingCart";
import LogJoin from "./pages/LogJoin";
import Customer from "./pages/Customer";
import Shop from "./pages/Shop";
import About from "./pages/About";
import AboutStory from "./pages/AboutStory";
import Brand from "./pages/Brand";
import ShopDetailTop from "./pages/ShopDetailTop";
import Store from "./pages/Store";
import Cleaning from "./pages/Cleaning";
import Sample from "./pages/Sample";
import OrderDetail from "./pages/OrderDetail";
import Checkout from "./pages/Checkout";
import { useEffect } from "react";
import NoticeId from "./components/NoticeId";
import NoticePage from "./pages/NoticePage";
import AboutStoryDetail from "./components/AboutStoryDetail";


function App() {
  const initAuth = useAuthStore((state) => state.initAuth);
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/main" element={<Main />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/all" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/shop/:category/:subcate" element={<Shop />} />
        <Route path="/shop/product/:id" element={<ShopDetailTop />} />

        <Route path="/collections/Ink" element={<InkCollection />} />
        <Route path="/collections/pebble" element={<PebbleCollection />} />
        <Route path="/collections/clay" element={<ClayCollection />} />
        <Route path="/collections/round" element={<RoundCollection />} />
        <Route path="/collections/plato" element={<PlatoCollection />} />
        <Route path="/collections" element={<Collections />} />


        <Route path="/service" element={<Service />} />
        <Route path="/service/sample" element={<Sample />} />
        <Route path="/service/cleaning" element={<Cleaning />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/customer" element={<Customer />} />

        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/orderdetail" element={<OrderDetail />} />

        <Route path="/about/brand" element={<Brand />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/story" element={<AboutStory />} />
        <Route path="/about/story/:id" element={<AboutStoryDetail />} />

        <Route path="/map" element={<Store />} />

        <Route path="/logjoin" element={<LogJoin />} />

        <Route path="/samplingservice" element={<SamplingService />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community/store" element={<Map />} />
        <Route path="/careservice" element={<CareService />} />
        <Route path="/cs" element={<CS />} />
        <Route path="/community/notice" element={<Notice />} />
        {/* <Route path="/noticedetails" element={<NoticeDetails />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/search" element={<Search />} />

        <Route path="/notfound" element={<NotFound />} />
        <Route path="/sellection" element={<Sellection />} />

        <Route path="/notice/1/special" element={<NoticeId />} />
        <Route path="/notice/:id" element={<NoticePage />} />

        <Route path="/fefefe" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
