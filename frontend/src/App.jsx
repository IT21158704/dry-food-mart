import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';
import UserProfile from './pages/common/UserProfile';


import Guest from './pages/guest/Guest';
import GuestHotdeals from './pages/guest/Hotdeals';
import GuestReview from './pages/guest/Review';

import CustomerCart from './pages/customer/Cart';
import CustomerOrders from './pages/customer/Orders';
import CustomerStore from './pages/customer/Store';

import SupplierHome from './pages/SupplierManager/Home';

import InventoryHome from './pages/InventoryManager/Home';

import OrderHome from './pages/OrderManager/Home';

import Home from './pages/admin/Home';
import ManageUsers from './pages/admin/ManageUsers';
import Newsfeed from './pages/guest/Newsfeed';

import NewsHome from './pages/NewsManager/Home';
import InventoryAddItems from './pages/InventoryManager/AddItems';
import ManageNewsFeed from './pages/admin/ManageNewsFeed';

import DelveryHome from './pages/DeliveryManager/Home';

import DriverHome from './pages/Driver/Home';

import StoreItems from './pages/store/Items';
import ItemPage from './pages/store/ItemPage';
import AddDriver from './pages/DeliveryManager/AddDriver';

import Checkout from './pages/customer/Checkout';
import News from './pages/guest/News';
import AddNews from './pages/NewsManager/AddNews';
import ManageAddress from './pages/customer/ManageAddress';
import ManageStaff from './pages/StaffManager/ManageStaff';
import Salary from './pages/StaffManager/Salary';
import Ratings from './pages/Driver/Ratings';
import OrderGoods from './pages/SupplierManager/OrderGoods';
import InventoryItems from './pages/SupplierManager/InventoryItems';
import FeedbackHome from './pages/FeedbackManager/Home';


export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Dashboard />}>
            <Route path='/' element={<Guest />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Guest />} />
            <Route path='items' element={<StoreItems />} />
            <Route path='review' element={<GuestReview />} />
            <Route path='hotdeals' element={<GuestHotdeals />} />
            <Route path='newsfeed' element={<Newsfeed />} />
            <Route path='news/:id' element={<News />} />
            <Route path='itempage/:id' element={<ItemPage />} />
          </Route>

          <Route path='/admin' element={<Dashboard />}>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='managers' element={<ManageUsers />} />
            <Route path='newsMng' element={<ManageNewsFeed />} />
          </Route>

          <Route path='/customer' element={<Dashboard />}>
            <Route path='' element={<Guest />} />
            <Route path='home' element={<Guest />} />
            <Route path='cart' element={<CustomerCart />} />
            <Route path='orders' element={<CustomerOrders />} />
            <Route path='store' element={<StoreItems />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='review' element={<GuestReview />} />
            <Route path='newsfeed' element={<Newsfeed />} />
            <Route path='news/:id' element={<News />} />
            <Route path='itempage/:id' element={<ItemPage />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='address' element={<ManageAddress />} />
          </Route>

          <Route path='/inventory' element={<Dashboard />}>
          <Route path='add-item' element={<InventoryAddItems />} />
            <Route path='' element={<InventoryHome />} />
            <Route path='home' element={<InventoryHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/staff' element={<Dashboard />}>
            <Route path='' element={<ManageStaff />} />
            <Route path='home' element={<ManageStaff />} />
            <Route path='salary' element={<Salary />} />
          </Route>

          <Route path='/order' element={<Dashboard />}>
            <Route path='' element={<OrderHome />} />
            <Route path='home' element={<OrderHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/supplier' element={<Dashboard />}>
            <Route path='' element={<SupplierHome />} />
            <Route path='home' element={<SupplierHome />} />
            <Route path='OrderGoods' element={<OrderGoods />} />
            <Route path='items' element={<InventoryItems />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/news' element={<Dashboard />}>
            <Route path='' element={<NewsHome />} />
            <Route path='home' element={<NewsHome />} />
            <Route path='addnews' element={<AddNews />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/feedback' element={<Dashboard />}>
            <Route path='' element={<FeedbackHome />} />
            <Route path='home' element={<FeedbackHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/delivery' element={<Dashboard />}>
            <Route path='' element={<DelveryHome />} />
            <Route path='home' element={<DelveryHome />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='/delivery/addDriver' element={<AddDriver />} />
          </Route>

          <Route path='/driver' element={<Dashboard />}>
            <Route path='' element={<DriverHome />} />
            <Route path='home' element={<DriverHome />} />
            <Route path='ratings' element={<Ratings />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>
        </Routes>
        {/* <StickyFooter /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}