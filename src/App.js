import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProductDetails from './pages/ProductDetails';
import MyPage from './pages/MyPage';
import Map from './pages/Map';
import About from './pages/About';
import CareService from './pages/CareService';
import CS from './pages/CS';
import Main from './pages/Main';
import Notice from './pages/Notice';
import NoticeDetails from './pages/NoticeDetails';
import SamplingService from './pages/SamplingService';
import Service from './pages/Service';
import Search from './pages/Search';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import Sellection from './pages/Sellection';

import ShopingBags from './pages/ShopingBags';
import Community from './pages/Community';
import Collections from './pages/Collections';
import ShopAll from './pages/ShopAll';
import ShopChair from './pages/ShopChair';
import ShopTable from './pages/ShopTable';
import ShopSofa from './pages/ShopSofa';
import ShopLighting from './pages/ShopLighting';
import InkCollection from './pages/InkCollection';
import PebbleCollection from './pages/PebbleCollection';
import ClayCollection from './pages/ClayCollection';
import RoundCollection from './pages/RoundCollection';
import PlatoCollection from './pages/PlatoCollection';
import ShoppingCart from './pages/ShoppingCart';
import LogJoin from './pages/LogJoin';
import Customer from './pages/Customer';
import Shop from './pages/Shop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/main" element={<Main />} />

         <Route path="/shop/all" element={<ShopAll />} />
        <Route path="/shop/chair" element={<ShopChair />} />
        <Route path="/shop/table" element={<ShopTable />} />
        <Route path="/shop/sofa" element={<ShopSofa />} />
        <Route path="/shop/lighting" element={<ShopLighting />} />
        <Route path="/shop" element={<Shop/>}/>
        

        <Route path="/collections/ink" element={<InkCollection />} />
        <Route path="/collections/pebble" element={<PebbleCollection />} />
        <Route path="/collections/clay" element={<ClayCollection />} />
        <Route path="/collections/round" element={<RoundCollection />} />
        <Route path="/collections/plato" element={<PlatoCollection />} />
        <Route path="/collections" element={<Collections />} />

        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/shoppingbags" element={<ShopingBags />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />

  
        <Route path="/logjoin" element={<LogJoin/>}/>
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/samplingservice" element={<SamplingService />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/careservice" element={<CareService />} />
        <Route path="/cs" element={<CS />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/noticedetails" element={<NoticeDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/sellection" element={<Sellection />} />
      </Route>
    </Routes>
  );
}

export default App;
