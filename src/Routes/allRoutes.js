import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//Home
import Home from "../pages/OurPages/Home";

//MobileHome
import MobileHome from "../pages/OurPages/MobileHome";

//All categories
import Categories from "../pages/OurPages/Categories";

//All Attributes
import Attributes from "../pages/OurPages/Attributes";

//All Catalogs
import Catalogs from "../pages/OurPages/Catalogs";
import CatalogDetails from "../pages/OurPages/Catalogs/CatalogDetails";

//All Vendors
import Vendors from "../pages/OurPages/Vendors";
import VendorDetails from "../pages/OurPages/Vendors/VendorDetails";

//All Vendors Payments
import VendorPayments from "../pages/OurPages/VendorPayments";

//Tax
import TaxSlab from "../pages/OurPages/TaxSlab";

//Notice
import Notice from "../pages/OurPages/Notice";

//Reviews
import Reviews from "../pages/OurPages/Reviews";

//Our Page Support Ticket
import Support from "../pages/OurPages/Support/ListView/index";
import SupportTicketDetails from "../pages/OurPages/Support/TicketsDetails/index";

//Notification
import Notification from "../pages/OurPages/Notification";

//Products
import Products from "../pages/OurPages/Products";
import ProductDetail from "../pages/OurPages/Products/ProductDetail";

//Orders
import Orders from "../pages/OurPages/Orders";
import OrderDetail from "../pages/OurPages/Orders/OrderDetail";

//Customer
import Customer from "../pages/OurPages/Customer/index";
import CustomerDetail from "../pages/OurPages/Customer/CustomerDetail";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
//pages
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//Charts

import PrivecyPolicy from "../pages/Pages/PrivacyPolicy";
import TermsCondition from "../pages/Pages/TermsCondition";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import Profile from "../../src/pages/OurPages/profile/Profile";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/home", component: <Home /> },
  { path: "/mobileHome", component: <MobileHome /> },

  //Profile
  { path: "/profile", component: <Profile /> },

  { path: "/categories", component: <Categories /> },
  { path: "/attributes", component: <Attributes /> },
  //vendors
  { path: "/vendors", component: <Vendors /> },
  { path: "/vendors/view-details/:_id", component: <VendorDetails /> },

  { path: "/vendorPayments", component: <VendorPayments /> },
  { path: "/taxSlab", component: <TaxSlab /> },
  { path: "/notice", component: <Notice /> },
  { path: "/reviews", component: <Reviews /> },
  { path: "/notification", component: <Notification /> },
  //Catalog
  { path: "/catalogs", component: <Catalogs /> },
  { path: "/catalogs/details/:_id", component: <CatalogDetails /> },

  //product
  { path: "/products", component: <Products /> },
  { path: "/products/:_id", component: <ProductDetail /> },

  //order
  { path: "/orders", component: <Orders /> },
  { path: "/orders/:_id", component: <OrderDetail /> },

  //Customer
  { path: "/customer", component: <Customer /> },
  { path: "/customer/:_id", component: <CustomerDetail /> },
  ,
  // Our Page  Support Ticket
  { path: "/support", component: <Support /> },
  { path: "/support/:_id", component: <SupportTicketDetails /> },

  //old alll Routes
  { path: "/index", component: <DashboardEcommerce /> },



  { path: "/pages-privacy-policy", component: <PrivecyPolicy /> },
  { path: "/pages-terms-condition", component: <TermsCondition /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },


  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
