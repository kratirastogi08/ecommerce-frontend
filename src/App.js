import React from 'react'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import WebFont from "webfontloader";
import Header from './component/layout/Header/Header'
import { useEffect,useState } from 'react'
import './App.css'
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/Productetails';
import Products from './component/Product/Products';
import LoginSignUp from './component/User/LoginSignUp'
import Cart from "./component/Cart/Cart";
import Profile from './component/User/Profile'
import UpdateProfile from './component/User/UpdateProfile'
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import UpdatePassword from "./component/User/UpdatePassword";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderSuccess from './component/Cart/OrderSuccess';
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";

const App=()=>{
  const { isAuthenticated, user } = useSelector((state) => state.user);
 const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/payment/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
    console.log("u",stripeApiKey)
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
      
    })
    store.dispatch(loadUser());
    getStripeApiKey();
    
  },[]);

    return(<Router>
        <Header></Header>
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route path="/process/payment" element={
          <ProtectedRoute user={user}>
            <Payment></Payment>
          </ProtectedRoute> }></Route></Routes>
        </Elements>
      )}
         <Routes>
           <Route path="/" element={<Home></Home>}></Route>
           <Route path="/home" element={<Home></Home>}></Route>
           <Route path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
           <Route path="/products" element={<Products></Products>}></Route>
           <Route path="/cart" element={<Cart></Cart>}></Route>
           <Route path="/products/:keyword" element={<Products></Products>}></Route>
           <Route path="/order/:id" element={
           <ProtectedRoute user={user}>
             <OrderDetails></OrderDetails>
           </ProtectedRoute>
           }>
         </Route>
           <Route path="/account" element={
           <ProtectedRoute user={user}>
             <Profile></Profile>
           </ProtectedRoute>
           }>
         </Route>
         <Route path='/me/update' element={
           <ProtectedRoute user={user}>
           <UpdateProfile></UpdateProfile>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/shipping' element={
           <ProtectedRoute user={user}>
           <Shipping></Shipping>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/order/confirm' element={
           <ProtectedRoute user={user}>
           <ConfirmOrder></ConfirmOrder>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/password/update' element={
           <ProtectedRoute user={user}>
           <UpdatePassword></UpdatePassword>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/orders' element={
           <ProtectedRoute user={user}>
           <MyOrders></MyOrders>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/success' element={
           <ProtectedRoute user={user}>
           <OrderSuccess></OrderSuccess>
         </ProtectedRoute>
         }>
          </Route>
           <Route path="/login" element={<LoginSignUp></LoginSignUp>}></Route>
           <Route  path="/password/forgot" element={<ForgotPassword></ForgotPassword>} />

        <Route  path="/password/reset/:token" element={<ResetPassword></ResetPassword>} />
        <Route path='/admin/dashboard' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <Dashboard></Dashboard>
         </ProtectedRoute>
         }>
          </Route>

          <Route path='/admin/products' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <ProductList></ProductList>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/admin/product' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <NewProduct></NewProduct>
         </ProtectedRoute>
         }>
          </Route>

          <Route path='/admin/product/:id' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <UpdateProduct></UpdateProduct>
         </ProtectedRoute>
         }>
          </Route>

          <Route path='/admin/orders' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <OrderList></OrderList>
         </ProtectedRoute>
         }>
          </Route>
        
          <Route path='/admin/order/:id' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <ProcessOrder></ProcessOrder>
         </ProtectedRoute>
         }>
          </Route>

          <Route path='/admin/users' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <UsersList></UsersList>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/admin/user/:id' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <UpdateUser></UpdateUser>
         </ProtectedRoute>
         }>
          </Route>
          <Route path='/admin/reviews' element={
           <ProtectedRoute isAdmin={true} user={user}>
           <ProductReviews></ProductReviews>
         </ProtectedRoute>
         }>
          </Route>
         </Routes>
        <Footer></Footer>
    </Router>)
}
export default App