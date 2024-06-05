import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

//? LOGIN API
export const postLogin = (data) =>
  api.create(`${url.BASE_URL}/vendor/auth/login`, data);

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

export const addAttributes = (data) =>
  api.create(`${url.BASE_URL}/admin/attributes`, data);
export const getAttributes = (data) =>
  api.get(`${url.BASE_URL}/admin/attributes`);
export const getAttributeById = (data) =>
  api.get(`${url.BASE_URL}/admin/attributes/${data}`);
export const updateAttributeById = (data, id) =>
  api.put(`${url.BASE_URL}/admin/attributes/${id}`, data);
export const deleteAttributeById = (data) =>
  api.delete(`${url.BASE_URL}/admin/attributes/${data}`);

//categories
export const getCategoriesData = (data) =>
  api.get(`${url.BASE_URL}/vendor/categories`);
export const addCategoriesData = (data) =>
  api.create(`${url.BASE_URL}/admin/categories`, data);
export const editGetCategoriesData = (data) =>
  api.get(`${url.BASE_URL}/admin/categories/${data}`);
export const updateCategoryById = (data, id) =>
  api.put(`${url.BASE_URL}/admin/categories/${id}`, data);
export const deleteCategoryById = (data) =>
  api.delete(`${url.BASE_URL}/admin/categories/${data}`);

//Notification
export const postNotification = (data) =>
  api.create(`${url.BASE_URL}/vendor/notification`, data);
export const getNotification = (data) =>
  api.get(`${url.BASE_URL}/vendor/notification`);
export const deleteNotificationById = (data) =>
  api.delete(`${url.BASE_URL}/vendor/notification/${data}`);

//Notice
export const postNotice = (data) =>
  api.create(`${url.BASE_URL}/vendor/notice`, data);
export const getNotice = (data) => api.get(`${url.BASE_URL}/vendor/notice`);
export const deleteNoticeById = (data) =>
  api.delete(`${url.BASE_URL}/vendor/notice/${data}`);

//vendor payments
export const getVendorPaymentsData = (data) =>
  api.get(`${url.BASE_URL}/admin/vendor/list/payments`);
export const postVendorPaymentsData = (data) =>
  api.put(`${url.BASE_URL}/admin/vendor/payments/update`, data);
export const changeVendorStatusData = (data) =>
  api.put(`${url.BASE_URL}/admin/vendor/update/status`, data);

//All Vendors
export const getAllVendorsApi = () => api.get(`${url.BASE_URL}/admin/vendor`);
export const addVendorData = (data) =>
  api.create(`${url.BASE_URL}/admin/vendor`, data);
export const getVendorByIdData = (id) =>
  api.get(`${url.BASE_URL}/admin/vendor/editdata/${id}`);
export const updateVendorByIdData = (data) =>
  api.put(`${url.BASE_URL}/admin/vendor`, data);

//get vendor details by id
export const getVendorDetailsApi = (id) =>
  api.get(`${url.BASE_URL}/admin/vendor/details/${id}`);

export const getVendorRevenueChartApi = (data) =>
  api.create(`${url.BASE_URL}/admin/vendor/chartdata`, data);

//fileUploads
export const addFiles = (data) =>
  api.create(`${url.BASE_URL}/vendor/media/single`, data);

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// Calendar
// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = (event) => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event) => api.put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event) =>
  api.delete(url.DELETE_EVENT, { headers: { event } });

//product
export const getAllProductData = () => api.get(`${url.BASE_URL}/vendor/product`);

// Chat
// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId) =>
  api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message) =>
  api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

// MailBox
//get Mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

// delete Mail
export const deleteMail = (forId) =>
  api.delete(url.DELETE_MAIL, { headers: { forId } });

// Ecommerce
// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);

// delete Product
export const deleteProducts = (product) =>
  api.delete(url.DELETE_PRODUCT + "/" + product);

// add Products
export const addNewProduct = (product) =>
  api.create(url.ADD_NEW_PRODUCT, product);

// update Products
export const updateProduct = (product) =>
  api.update(url.UPDATE_PRODUCT + "/" + product._id, product);

// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);

// add Order
export const addNewOrder = (order) => api.create(url.ADD_NEW_ORDER, order);

// update Order
export const updateOrder = (order) =>
  api.update(url.UPDATE_ORDER + "/" + order._id, order);

// delete Order
export const deleteOrder = (order) =>
  api.delete(url.DELETE_ORDER + "/" + order);

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addNewCustomer = (customer) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer) =>
  api.update(url.UPDATE_CUSTOMER + "/" + customer._id, customer);

// delete Customers
export const deleteCustomer = (customer) =>
  api.delete(url.DELETE_CUSTOMER + "/" + customer);

// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);

// Project
// get Project list
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);

// add Task
export const addNewTask = (task) => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = (task) =>
  api.update(url.UPDATE_TASK + "/" + task._id, task);

// delete Task
export const deleteTask = (task) => api.delete(url.DELETE_TASK + "/" + task);

// Kanban Board
export const getTasks = () => api.get(url.GET_TASKS);
export const addNewTasks = (card) => api.create(url.ADD_TASKS, card);
export const updateTasks = (card) => api.put(url.UPDATE_TASKS, card);
export const deleteTasks = (card) =>
  api.delete(url.DELETE_TASKS, { headers: { card } });

// CRM
// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);

// add Contact
export const addNewContact = (contact) =>
  api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact) =>
  api.update(url.UPDATE_CONTACT + "/" + contact._id, contact);

// delete Contact
export const deleteContact = (contact) =>
  api.delete(url.DELETE_CONTACT + "/" + contact);

// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);

// add Companies
export const addNewCompanies = (company) =>
  api.create(url.ADD_NEW_COMPANIES, company);

// update Companies
export const updateCompanies = (company) =>
  api.update(url.UPDATE_COMPANIES + "/" + company._id, company);

// delete Companies
export const deleteCompanies = (company) =>
  api.delete(url.DELETE_COMPANIES + "/" + company);

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Leads
export const getLeads = () => api.get(url.GET_LEADS);

// add Lead
export const addNewLead = (lead) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
export const updateLead = (lead) =>
  api.update(url.UPDATE_LEAD + "/" + lead._id, lead);

// delete Lead
export const deleteLead = (lead) => api.delete(url.DELETE_LEAD + "/" + lead);

// Crypto
// Transation
export const getTransationList = () => api.get(url.GET_TRANSACTION_LIST);

// Order List
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

// Invoice
//get Invoice
export const getInvoices = () => api.get(url.GET_INVOICES);

// add Invoice
export const addNewInvoice = (invoice) =>
  api.create(url.ADD_NEW_INVOICE, invoice);

// update Invoice
export const updateInvoice = (invoice) =>
  api.update(url.UPDATE_INVOICE + "/" + invoice._id, invoice);

// delete Invoice
export const deleteInvoice = (invoice) =>
  api.delete(url.DELETE_INVOICE + "/" + invoice);

// Support Tickets
// Tickets
export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);

// add Tickets
export const addNewTicket = (ticket) => api.create(url.ADD_NEW_TICKET, ticket);

// delete Tickets
export const deleteTicket = (ticket) =>
  api.delete(url.DELETE_TICKET + "/" + ticket);

// Audiences Metrics
export const getAllAudiencesMetricsData = () =>
  api.get(url.GET_ALLAUDIENCESMETRICS_DATA);
export const getMonthlyAudiencesMetricsData = () =>
  api.get(url.GET_MONTHLYAUDIENCESMETRICS_DATA);
export const getHalfYearlyAudiencesMetricsData = () =>
  api.get(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA);
export const getYearlyAudiencesMetricsData = () =>
  api.get(url.GET_YEARLYAUDIENCESMETRICS_DATA);

// Users by Device
export const getTodayDeviceData = () => api.get(url.GET_TODAYDEVICE_DATA);
export const getLastWeekDeviceData = () => api.get(url.GET_LASTWEEKDEVICE_DATA);
export const getLastMonthDeviceData = () =>
  api.get(url.GET_LASTMONTHDEVICE_DATA);
export const getCurrentYearDeviceData = () =>
  api.get(url.GET_CURRENTYEARDEVICE_DATA);

// Audiences Sessions by Country
export const getTodaySessionData = () => api.get(url.GET_TODAYSESSION_DATA);
export const getLastWeekSessionData = () =>
  api.get(url.GET_LASTWEEKSESSION_DATA);
export const getLastMonthSessionData = () =>
  api.get(url.GET_LASTMONTHSESSION_DATA);
export const getCurrentYearSessionData = () =>
  api.get(url.GET_CURRENTYEARSESSION_DATA);

// Dashboard CRM

// Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () =>
  api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () =>
  api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () =>
  api.get(url.GET_CURRENTYEARBALANCE_DATA);

// Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);

export const getDashboardData = (data) =>
  api.create(`${url.BASE_URL}${url.GET_DASHBOARD_DATA_BY_DATE}`, data);
export const getRevenueChartDashboardApi = (data) =>
  api.create(`${url.BASE_URL}/admin/dashboard/chartdata`, data);
export const getDashboardProductData = (data) =>
  api.create(
    `${url.BASE_URL}/admin/dashboard/best-selling-products?page=${data.page}&limit=5`,
    data
  );
export const getTopVendorsData = (data) =>
  api.create(`${url.BASE_URL}/admin/dashboard/top-vendors`, data);
export const getRecentOrderData = () =>
  api.get(`${url.BASE_URL}/admin/dashboard/recent-orders`);
export const getTopCategories = () =>
  api.get(`${url.BASE_URL}/admin/dashboard/top-categories`);

export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () =>
  api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);

//Web and Mobile Home
export const postWebData = (data) =>
  api.create(`${url.BASE_URL}/admin/home`, data);
export const getWebData = () => api.get(`${url.BASE_URL}/admin/home`);

export const postMobileData = (data) =>
  api.create(`${url.BASE_URL}/admin/mobile/home`, data);
export const getMobileData = () => api.get(`${url.BASE_URL}/admin/mobile/home`);

export const postParantCategoriesData = (data) =>
  api.create(`${url.BASE_URL}/admin/header`, data);
export const getParantCategoriesData = () =>
  api.get(`${url.BASE_URL}/admin/header`);

//options
export const getOptionsDataApi = (data, name) =>
  api.get(`${url.BASE_URL}/admin/selectoption/vendor`, data);

export const getCustomerOptionsDataApi = (data, name) =>
  api.get(`${url.BASE_URL}/admin/selectoption/customer`, data);

// Catalog
export const getCatalogData = (data) =>
  api.get(`${url.BASE_URL}${url.GET_CATALOG}`, data);

export const getSingleCatalogData = (id) =>
  api.get(`${url.BASE_URL}${url.GET_SINGLE_CATALOG}/${id}`);

export const getCatalogListByStatus = (status) =>
  api.get(`${url.BASE_URL}${url.GET_CATALOG}/${status}`);

export const editCatalogProductApi = (data) =>
  api.put(`${url.BASE_URL}/vendor/product`, data);

export const editCatalogDataApi = (data) =>
  api.put(`${url.BASE_URL}/vendor/catalog`, data);

export const AddCatalogProductDataApi = (data) =>
  api.create(`${url.BASE_URL}/vendor/product`, data);

export const AddCatalogApi = (data) =>
  api.create(`${url.BASE_URL}/vendor/catalog`, data);

export const getCatalogProductByIdApi = (id) =>
  api.get(`${url.BASE_URL}/vendor/product/editdata/${id}`);

export const deleteCatalogProductByIdApi = (id) =>
  api.delete(`${url.BASE_URL}/vendor/product/${id}`);

export const getProductAttributeByIdApi = (status) =>
  api.get(`${url.BASE_URL}/vendor/attributes/category/${status}`);


export const addImageCatalog = (data) =>
  api.create(`${url.BASE_URL}/vendor/media/single`, data);

// Attribute
export const getAttributeData = () =>
  api.get(`${url.BASE_URL}${url.GET_ATTRIBUTE}`);

// =====TaxSlabs
export const getTaxSlabsData = () =>
  api.get(`${url.BASE_URL}${url.GET_TAXSLABS}`);

export const addTaxSlabsData = () =>
  api.create(`${url.BASE_URL}${url.ADD_TAXSLABS}`);

export const editTaxSlabsData = (data) =>
  api.put(`${url.BASE_URL}${url.ADD_TAXSLABS}`, data);

// =====TaxSlabs

// ===========Orders
export const getAllOrdersData = (data) =>
  api.get(`${url.BASE_URL}${url.GET_ALL_ORDERS}`, data);

export const getSingleOrderData = (id) =>
  api.get(`${url.BASE_URL}${url.GET_SINGLE_ORDER}/${id}`);

export const getOrdersByStatusData = (status) =>
  api.get(`${url.BASE_URL}${url.GET_ORDERS_BY_STATUS}/${status}`);

export const cancelOrderData = (id) =>
  api.put(`${url.BASE_URL}${url.CANCEL_ORDER}/${id}`);
// ===========Orders

// =============Customer
export const getAllCustomerData = (data) =>
  api.get(`${url.BASE_URL}${url.GET_ALL_CUSTOMER}`, data);

export const getSingleCustomerData = (id) =>
  api.get(`${url.BASE_URL}${url.GET_SINGLE_CUSTOMER}/${id}`);
// =============Customer

// =====Support Ticket
export const getAllSupportTicketList = (data) =>
  api.get(`${url.BASE_URL}${url.GET_ALL_SUPPORT_TICKET}`, data);

export const deleteSupportTicketData = (id) =>
  api.delete(`${url.BASE_URL}${url.DELETE_SUPPORT_TICKET}/${id}`);

export const addSupportTicketData = (data) =>
  api.create(`${url.BASE_URL}${url.ADD_SUPPORT_TICKET}`, data);

export const getSingleSupportTicketData = (id) =>
  api.get(`${url.BASE_URL}${url.ADD_SUPPORT_TICKET}/${id}`);

export const statusUpdateSupportTicketData = (data) =>
  api.put(`${url.BASE_URL}${url.STATUS_UPDATE_SUPPORT_TICKET}`, data);

export const addMessageToSupportTicketData = (data) =>
  api.create(`${url.BASE_URL}${url.ADD_MESSAGE_TO_SUPPORT_TICKET}`, data);
// =====Support Ticket

export const getSupportStatsDataApi = (data) =>
  api.get(`${url.BASE_URL}/vendor/support-ticket/stats/totalstats`, data);

//========= Products
export const getAllProductsData = (data) =>
  api.get(`${url.BASE_URL}${url.GET_ALL_PRODUCTS}`, data);

export const getAllProductsByStatus = (status) =>
  api.get(`${url.BASE_URL}${url.GET_ALL_PRODUCTS_BY_STATUS}/${status}`);

export const getProductData = (data) =>
  api.get(`${url.BASE_URL}/vendor/product/details/${data}`);

export const updateStatusProductData = (data) =>
  api.put(`${url.BASE_URL}/vendor/product/${data.status}`, data);
//======== Products

// Reviews
export const getReviews = () =>
  api.get(`${url.BASE_URL}${url.GET_ALL_REVIEWS}`);
export const postReviews = (data) =>
  api.put(`${url.BASE_URL}/admin/reviews/status`, data);
export const deleteReviews = (data) =>
  api.delete(`${url.BASE_URL}/admin/reviews/${data}`);

// Notices
