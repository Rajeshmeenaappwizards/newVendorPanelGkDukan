import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

//Attributes
import AttributesSlice from "./attributes/reducer";

//CategorySlice
import CategorySlice from "./categories/reducer";

//vendorPAyments
import VendorPaymentSlice from "./vendorPayment/reducer";



//Invoice
import InvoiceReducer from "./invoice/reducer";

// Home Web and Mobile
import HomeSlice from "./HomeApi/reducer";


// Catalog
import CatalogReducer from "./catalog/reducer";

// Attribute
import AttributeReducer from "./attributes/reducer";

// TaxSlabs
import TaxSlabsReducer from "./TaxSlabs/reducer";

// Orders
import OrdersReducer from "./orders/reducer";

// Customer
import CustomerReducer from "./customer/reducer";

// Our Page supportTicket
import SupportTicketReducer from "./supportTicket/reducer";

// Products
import ProductReducer from "./product/reducer";

// Reviews
import ReviewsReducer from "./reviews/reducer";

// Notice
import NoticeReducer from "./notice/reducer";

// Notification
import NotificationReducer from "./notifications/reducer";
import OptionSlice from "./options/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Invoice: InvoiceReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
  AttributesSlice: AttributesSlice,
  CategorySlice: CategorySlice,
  VendorPaymentSlice: VendorPaymentSlice,
  Catalog: CatalogReducer,
  Attribute: AttributeReducer,
  HomeSlice: HomeSlice,
  TaxSlabs: TaxSlabsReducer,
  Orders: OrdersReducer,
  Customers: CustomerReducer,
  SupportTicket: SupportTicketReducer,
  Products: ProductReducer,
  Reviews: ReviewsReducer,
  Notice: NoticeReducer,
  NotificationReducer: NotificationReducer,
  Option: OptionSlice,
});

export default rootReducer;
