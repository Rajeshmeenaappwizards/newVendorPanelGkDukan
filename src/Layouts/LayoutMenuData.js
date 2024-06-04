import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isMobileHome, setIsMobileHome] = useState(false);
  const [isOrders, setIsOrders] = useState(false);
  const [isCategories, setIsCategories] = useState(false);
  const [isAttributes, setIsAttributes] = useState(false);
  const [isVendors, setIsVendors] = useState(false);
  const [isVendorPayments, setIsVendorPayments] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isTaxSlab, setIsTaxSlab] = useState(false);
  const [isNotice, setIsNotice] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isReviews, setIsReviews] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isProducts, setIsProducts] = useState(false);
  const [isCatalogs, setIsCatalogs] = useState(false);

  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  //Calender
  const [isCalender, setCalender] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Home") {
      setIsHome(false);
    }
    if (iscurrentState !== "Orders") {
      setIsOrders(false);
    }
    if (iscurrentState !== "Customer") {
      setIsCustomer(false);
    }
    if (iscurrentState !== "Categories") {
      setIsCategories(false);
    }
    if (iscurrentState !== "Catalogs") {
      setIsCatalogs(false);
    }
    if (iscurrentState !== "Attributes") {
      setIsAttributes(false);
    }
    if (iscurrentState !== "Vendors") {
      setIsVendors(false);
    }
    if (iscurrentState !== "VendorPayments") {
      setIsVendorPayments(false);
    }
    if (iscurrentState !== "TaxSlab") {
      setIsTaxSlab(false);
    }
    if (iscurrentState !== "Notice") {
      setIsNotice(false);
    }
    if (iscurrentState !== "Reviews") {
      setIsReviews(false);
    }
    if (iscurrentState !== "Support") {
      setIsSupport(false);
    }
    if (iscurrentState !== "Notification") {
      setIsNotification(false);
    }
    if (iscurrentState !== "Products") {
      setIsProducts(false);
    }

    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isHome,
    isMobileHome,
    isOrders,
    isCategories,
    isAttributes,
    isVendors,
    isVendorPayments,
    isTaxSlab,
    isNotice,
    isNotification,
    isReviews,
    isSupport,
    isCatalogs,

    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    //All New Code
    {
    label: "Menu",
    isHeader: true,
  },
  {
    id: "dashboard",
    label: "Dashboards",
    icon: "ri-dashboard-line",
    link: "/#",
    stateVariables: isDashboard,
    click: function (e) {
      e.preventDefault();
      setIsDashboard(!isDashboard);
      setIscurrentState("Dashboard");
      updateIconSidebar(e);
    },
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: "ri-store-2-line",
    link: "/vendors",
    stateVariables: isVendors,
    click: function (e) {
      e.preventDefault();
      setIsVendors(!isVendors);
      setIscurrentState("vendors");
      updateIconSidebar(e);
    },
  },
  {
    id: "vendorPayments",
    label: "Vendor Payments",
    icon: "ri-money-dollar-circle-line",
    link: "/vendorPayments",
    stateVariables: isVendorPayments,
    click: function (e) {
      e.preventDefault();
      setIsVendorPayments(!isVendorPayments);
      setIscurrentState("vendorPayments");
      updateIconSidebar(e);
    },
  },
  {
    id: "orders",
    label: "Orders",
    icon: "ri-file-list-3-line",
    link: "/orders",
    stateVariables: isOrders,
    click: function (e) {
      e.preventDefault();
      setIsOrders(!isOrders);
      setIscurrentState("orders");
      updateIconSidebar(e);
    },
  },
  {
    id: "customer",
    label: "Customer",
    icon: "ri-user-3-line",
    link: "/customer",
    stateVariables: isCustomer,
    click: function (e) {
      e.preventDefault();
      setIsCustomer(!isCustomer);
      setIscurrentState("customer");
      updateIconSidebar(e);
    },
  },
  {
    id: "catalogs",
    label: "Catalogs",
    icon: "ri-book-line",
    link: "/catalogs",
    stateVariables: isCatalogs,
    click: function (e) {
      e.preventDefault();
      setIsCatalogs(!isCatalogs);
      setIscurrentState("catalogs");
      updateIconSidebar(e);
    },
  },
  {
    id: "products",
    label: "Products",
    icon: "ri-price-tag-3-line",
    link: "/products",
    stateVariables: isProducts,
    click: function (e) {
      e.preventDefault();
      setIsProducts(!isProducts);
      setIscurrentState("products");
      updateIconSidebar(e);
    },
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "ri-star-line",
    link: "/reviews",
    stateVariables: isReviews,
    click: function (e) {
      e.preventDefault();
      setIsReviews(!isReviews);
      setIscurrentState("reviews");
      updateIconSidebar(e);
    },
  },
  {
    id: "support",
    label: "Support",
    icon: "ri-customer-service-line",
    link: "/support",
    stateVariables: isSupport,
    click: function (e) {
      e.preventDefault();
      setIsSupport(!isSupport);
      setIscurrentState("support");
      updateIconSidebar(e);
    },
  },
  {
    id: "categories",
    label: "All Categories",
    icon: "ri-folders-line",
    link: "/categories",
    stateVariables: isCategories,
    click: function (e) {
      e.preventDefault();
      setIsCategories(!isCategories);
      setIscurrentState("categories");
      updateIconSidebar(e);
    },
  },
  {
    id: "attributes",
    label: "All Attributes",
    icon: "ri-price-tag-line",
    link: "/attributes",
    stateVariables: isAttributes,
    click: function (e) {
      e.preventDefault();
      setIsAttributes(!isAttributes);
      setIscurrentState("attributes");
      updateIconSidebar(e);
    },
  },
  {
    id: "taxSlab",
    label: "Tax Slab",
    icon: "ri-percent-line",
    link: "/taxSlab",
    stateVariables: isTaxSlab,
    click: function (e) {
      e.preventDefault();
      setIsTaxSlab(!isTaxSlab);
      setIscurrentState("taxSlab");
      updateIconSidebar(e);
    },
  },
  {
    id: "home",
    label: "Web Home",
    icon: "ri-home-line",
    link: "/home",
    stateVariables: isHome,
    click: function (e) {
      e.preventDefault();
      setIsHome(!isHome);
      setIscurrentState("Home");
      updateIconSidebar(e);
    },
  },
  {
    id: "mobileHome",
    label: "Mobile Home",
    icon: "ri-smartphone-line",
    link: "/mobileHome",
    stateVariables: isMobileHome,
    click: function (e) {
      e.preventDefault();
      setIsMobileHome(!isMobileHome);
      setIscurrentState("mobileHome");
      updateIconSidebar(e);
    },
  },
  {
    id: "notice",
    label: "Notice",
    icon: "ri-notification-line",
    link: "/notice",
    stateVariables: isNotice,
    click: function (e) {
      e.preventDefault();
      setIsNotice(!isNotice);
      setIscurrentState("notice");
      updateIconSidebar(e);
    },
  },
  {
    id: "notification",
    label: "Notifications",
    icon: "ri-notification-3-line",
    link: "/notification",
    stateVariables: isNotification,
    click: function (e) {
      e.preventDefault();
      setIsNotification(!isNotification);
      setIscurrentState("notification");
      updateIconSidebar(e);
    },
  },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
