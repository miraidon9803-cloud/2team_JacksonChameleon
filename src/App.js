import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LogJoin from './components/LogJoin';
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
import Shop from './pages/Shop';
import ShopingBags from './pages/ShopingBags';
import Community from './pages/Community';
import Collections from './pages/Collections';






function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
       <Route path = '/shoppingbags' element={<ShopingBags/>}/>
      <Route path='/community' element={<Community/>}/>
      <Route path='/logjoin' element={<LogJoin/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/productdetails' element={<ProductDetails/>}/>
      <Route path='/samplingService' element={<SamplingService/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path='/map' element={<Map/>}/>
      <Route path ='/about' element={<About/>}/>
      <Route path='/careservice' element={<CareService/>}/>
      <Route path='/cs' element={<CS/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/notice' element={<Notice/>}/>
      <Route path ='/noticedetails' element={<NoticeDetails/>}/>
      <Route path ='/payment' element={<Payment/>}/>
      <Route path ='/service' element={<Service/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path ='/notfound' element={<NotFound/>}/>
      <Route path='/sellection' element={<Sellection/>}/>
      <Route path='/collections' element={<Collections/>}/>
     

      
     </Route>
    </Routes>
  );
}

export default App;