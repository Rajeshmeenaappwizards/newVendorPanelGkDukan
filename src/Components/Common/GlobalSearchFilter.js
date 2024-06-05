import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { formatDate } from "../../helpers/date_helper";
import {
  resetCatalogState,
  setEndDate,
  setStartDate,
} from "../../slices/catalog/reducer";
import { useDispatch } from "react-redux";
import DynamicSelectComponent from "./DynamicSelectComponent";
import {
  getCustomerOptionsData,
  getOptionsData,
} from "../../slices/options/thunk";
import { useSelector } from "react-redux";
import { getGetCategoriesData } from "../../slices/categories/thunk";
import {
  resetOrdersState,
  setEndDateOrder,
  setStartDateOrder,
} from "../../slices/orders/reducer";
import {
  resetProductState,
  setEndDateProduct,
  setStartDateProduct,
} from "../../slices/product/reducer";
import {
  resetSupportState,
  setEndDateSupport,
  setStartDateSupport,
} from "../../slices/supportTicket/reducer";
import {
  resetCustomerState,
  setEndDateCustomer,
  setStartDateCustomer,
} from "../../slices/customer/reducer";

const ProductsGlobalFilter = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const categoriesRes = useSelector(
    (state) => state.CategorySlice.categoriesData
  );

  useEffect(() => {
    if (categoriesRes && categoriesRes.length > 0) {
      setCategories(categoriesRes);
    }
  }, [categoriesRes]);

  useEffect(() => {
    let params = {
      limit: 10,
    };
    fetchVendorOptions(params);
  }, []);

  const fetchVendorOptions = (data) => {
    dispatch(getGetCategoriesData());
  };

  const handleOptionChange = (inputValue) => {
    let params = {
      limit: 10,
    };
    if (inputValue) {
      params.keyword = inputValue;
      fetchVendorOptions(params);
    } else {
      fetchVendorOptions(params);
    }
  };

  return (
    <React.Fragment>
      <Col sm={6} className="col-xxl-3">
        <div className="d-flex">
          <Flatpickr
            className="form-control border-1 dash-filter-picker shadow"
            placeholder="Select a date"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
            }}
            onChange={(date) => {
              if (date && date.length > 0) {
                if (date[0]) {
                  dispatch(setStartDateProduct(formatDate(date[0])));
                }
                if (date[1]) {
                  dispatch(setEndDateProduct(formatDate(date[1])));
                }
              }
            }}
          />
          {/* <div className="input-group-text bg-primary border-primary text-white">
            <i className="ri-calendar-2-line"></i>
          </div> */}
        </div>
      </Col>

      <DynamicSelectComponent
        handleOptionChange={handleOptionChange}
        placeholder="Select Category"
        options={categories}
        name="choices-payment-default"
        id="idCategoriesProduct"
      />

      <Col sm={4} className="col-xxl-1">
        <div>
          <button
            onClick={() => dispatch(resetProductState())}
            type="button"
            className="btn btn-primary w-120"
          >
            <i className="ri-equalizer-fill me-1 align-bottom"></i>
            Reset
          </button>
        </div>
      </Col>
    </React.Fragment>
  );
};

const CustomersGlobalFilter = () => {
  const dispatch = useDispatch();
  const [customerStatus, setcustomerStatus] = useState(null);

  function handlecustomerStatus(customerStatus) {
    setcustomerStatus(customerStatus);
  }

  const customerstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col xl={7}>
        <Row className="g-3">
          <Col sm={4}>
            <div className="">
              <Flatpickr
                className="form-control"
                id="datepicker-publish-input"
                placeholder="Select a date"
                options={{
                  mode: "range",
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "d.m.y",
                }}
                onChange={(date) => {
                  if (date && date.length > 0) {
                    if (date[0]) {
                      dispatch(setStartDateCustomer(formatDate(date[0])));
                    }
                    if (date[1]) {
                      dispatch(setEndDateCustomer(formatDate(date[1])));
                    }
                  }
                }}
              />
            </div>
          </Col>

          <Col>
            <div>
              <button
                onClick={() => dispatch(resetCustomerState())}
                type="button"
                className="btn btn-primary "
              >
                <i className="ri-equalizer-fill me-1 align-bottom"></i>
                Reset
              </button>
            </div>
          </Col>
          {/* 
                    <Col sm={4}>
                        <div>
                            <Select
                                value={customerStatus}
                                onChange={(e) => {
                                    handlecustomerStatus(e.value);
                                }}
                                options={customerstatus}
                                name="choices-single-default"
                                id="idStatus"
                            ></Select>
                        </div>
                    </Col> */}

          {/* <Col sm={4}>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                            >
                                {" "}
                                <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                Filters
                            </button>
                        </div>
                    </Col> */}
        </Row>
      </Col>
    </React.Fragment>
  );
};

const OrderGlobalFilter = () => {
  const dispatch = useDispatch();

  // const [vendorOption, setVendorOption] = useState([]);
  // const [customer, setCustomer] = useState([]);

  // const VendorOptionRes = useSelector((state) => state.Option.options);
  // const CustomerOptionRes = useSelector(
  //   (state) => state.Option.optionsCustomer
  // );

  // useEffect(() => {
  //   if (VendorOptionRes && VendorOptionRes.success) {
  //     setVendorOption(VendorOptionRes.data);
  //   }
  // }, [VendorOptionRes]);

  // useEffect(() => {
  //   if (CustomerOptionRes && CustomerOptionRes.success) {
  //     setCustomer(CustomerOptionRes.data);
  //   }
  // }, [CustomerOptionRes]);

  // useEffect(() => {
  //   let params = {
  //     limit: 10,
  //   };
  //   fetchVendorOptions(params);
  //   fetchCustomerOptions(params);
  // }, []);

  // const fetchVendorOptions = (data) => {
  //   dispatch(getOptionsData(data));
  // };
  // const fetchCustomerOptions = (data) => {
  //   dispatch(getCustomerOptionsData(data));
  // };
  // const handleOptionChange = (inputValue) => {
  //   let params = {
  //     limit: 10,
  //   };
  //   if (inputValue) {
  //     params.keyword = inputValue;
  //     fetchVendorOptions(params);
  //   } else {
  //     fetchVendorOptions(params);
  //   }
  // };
  // const handleCustomerOptionChange = (inputValue) => {
  //   let params = {
  //     limit: 10,
  //   };
  //   if (inputValue) {
  //     params.keyword = inputValue;
  //     fetchCustomerOptions(params);
  //   } else {
  //     fetchCustomerOptions(params);
  //   }
  // };
  return (
    <React.Fragment>
      <Col sm={6} className="col-xxl-2">
        <div>
          <Flatpickr
            className="form-control"
            id="datepicker-publish-input"
            placeholder="Select a date"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
              altInput: true,
              altFormat: "F j, Y",
            }}
            onChange={(date) => {
              if (date && date.length > 0) {
                if (date[0]) {
                  dispatch(setStartDateOrder(formatDate(date[0])));
                }
                if (date[1]) {
                  dispatch(setEndDateOrder(formatDate(date[1])));
                }
              }
            }}
          />
        </div>
      </Col>

      {/* <DynamicSelectComponent
        handleOptionChange={handleOptionChange}
        placeholder="Select Vendor"
        options={vendorOption}
        name="choices-single-default"
        id="idVendorOrder"
      /> */}
      
      {/* <DynamicSelectComponent
        handleOptionChange={handleCustomerOptionChange}
        placeholder="Select Customer"
        options={customer}
        name="choices-payment-default"
        id="idCustomer"
      /> */}

      <Col>
        <div>
          <button
            onClick={() => dispatch(resetOrdersState())}
            type="button"
            className="btn btn-primary "
          >
            <i className="ri-equalizer-fill me-1 align-bottom"></i>
            Reset
          </button>
        </div>
      </Col>
    </React.Fragment>
  );
};

const CatalogGlobalFilter = () => {
  const dispatch = useDispatch();

  // const [vendorOption, setVendorOption] = useState([]);
  const [categories, setCategories] = useState([]);

  // const VendorOptionRes = useSelector((state) => state.Option.options);
  const categoriesRes = useSelector(
    (state) => state.CategorySlice.categoriesData
  );

  // useEffect(() => {
  //   if (VendorOptionRes && VendorOptionRes.success) {
  //     setVendorOption(VendorOptionRes.data);
  //   }
  // }, [VendorOptionRes]);

  useEffect(() => {
    if (categoriesRes && categoriesRes.length > 0) {
      setCategories(categoriesRes);
    }
  }, [categoriesRes]);

  // useEffect(() => {
  //   let params = {
  //     limit: 10,
  //   };
  //   fetchVendorOptions(params);
  // }, []);

  const fetchVendorOptions = (data) => {
    // dispatch(getOptionsData(data));
    dispatch(getGetCategoriesData());
  };

  const handleOptionChange = (inputValue) => {
    let params = {
      limit: 10,
    };
    // if (inputValue) {
    //   params.keyword = inputValue;
      // fetchVendorOptions(params);
    // } else {
      fetchVendorOptions(params);
    // }
  };

  return (
    <React.Fragment>
      <Col sm={6} className="col-xxl-3">
        <div className="d-flex">
          <Flatpickr
            className="form-control border-1 dash-filter-picker shadow"
            placeholder="Select a date"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
            }}
            onChange={(date) => {
              if (date && date.length > 0) {
                if (date[0]) {
                  dispatch(setStartDate(formatDate(date[0])));
                }
                if (date[1]) {
                  dispatch(setEndDate(formatDate(date[1])));
                }
              }
            }}
          />
          {/* <div className="input-group-text bg-primary border-primary text-white">
            <i className="ri-calendar-2-line"></i>
          </div> */}
        </div>
      </Col>

      {/* <DynamicSelectComponent
        handleOptionChange={handleOptionChange}
        placeholder="Select Vendor"
        options={vendorOption}
        name="choices-single-default"
        id="idVendor"
      /> */}

      <DynamicSelectComponent
        handleOptionChange={handleOptionChange}
        placeholder="Select Category"
        options={categories}
        name="choices-payment-default"
        id="idCategories"
      />

      <Col sm={4} className="col-xxl-1">
        <div>
          <button
            onClick={() => dispatch(resetCatalogState())}
            type="button"
            className="btn btn-primary w-120"
          >
            <i className="ri-equalizer-fill me-1 align-bottom"></i>
            Reset
          </button>
        </div>
      </Col>
    </React.Fragment>
  );
};

const TicketsListGlobalFilter = () => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Col sm={6} className="col-xxl-2">
        <div>
          <Flatpickr
            className="form-control"
            id="datepicker-publish-input"
            placeholder="Select a date"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
              altInput: true,
              altFormat: "F j, Y",
            }}
            onChange={(date) => {
              if (date && date.length > 0) {
                if (date[0]) {
                  dispatch(setStartDateSupport(formatDate(date[0])));
                }
                if (date[1]) {
                  dispatch(setEndDateSupport(formatDate(date[1])));
                }
              }
            }}
          />
        </div>
      </Col>

      <Col sm={4} className="col-xxl-2">
        <div>
          <button
            onClick={() => dispatch(resetSupportState())}
            type="button"
            className="btn btn-primary w-100"
          >
            <i className="ri-equalizer-fill me-1 align-bottom"></i>
            Reset
          </button>
        </div>
      </Col>
    </React.Fragment>
  );
};

const ContactsGlobalFilter = () => {
  const [sortBy, setsortBy] = useState(null);

  function handlesortBy(sortBy) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div className="col-md-auto ms-auto">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Sort by: </span>
          <Select
            className="mb-0"
            value={sortBy}
            onChange={() => {
              handlesortBy();
            }}
            options={sortbyname}
            id="choices-single-default"
          ></Select>
        </div>
      </div>
    </React.Fragment>
  );
};

const CompaniesGlobalFilter = () => {
  const [sortBy, setsortBy] = useState("Owner");

  function handlesortBy(sortBy) {
    setsortBy(sortBy);
  }

  const sortbyname = [
    {
      options: [
        { label: "Owner", value: "Owner" },
        { label: "Company", value: "Company" },
        { label: "Location", value: "Location" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div className="col-md-auto ms-auto">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Sort by: </span>
          <Select
            className="mb-0"
            value={sortBy}
            onChange={() => {
              handlesortBy();
            }}
            options={sortbyname}
            id="choices-single-default"
          ></Select>
        </div>
      </div>
    </React.Fragment>
  );
};

const CryptoOrdersGlobalFilter = () => {
  return (
    <React.Fragment>
      <Col xl={2} md={6}>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="ri-calendar-2-line"></i>
          </span>
          <Flatpickr
            placeholder="Select date"
            className="form-control"
            options={{
              mode: "range",
              dateFormat: "d M, Y",
            }}
          />
        </div>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default"
          id="choices-single-default"
        >
          <option defaultValue="all">Select Type</option>
          <option value="Buy">Sell</option>
          <option value="Sell">Buy</option>
        </select>
      </Col>
      <Col xl={2} md={4}>
        <select
          className="form-control"
          data-choices
          data-choices-search-false
          name="choices-single-default2"
          id="choices-single-default2"
        >
          <option defaultValue="all">Select Status</option>
          <option value="Successful">Successful</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
        </select>
      </Col>
      <Col xl={1} md={4}>
        <button className="btn btn-success w-100">Filters</button>
      </Col>
    </React.Fragment>
  );
};

const InvoiceListGlobalSearch = () => {
  const [isStatus, setisStatus] = useState(null);

  function handleisStatus(isStatus) {
    setisStatus(isStatus);
  }

  const allstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Unpaid", value: "Unpaid" },
        { label: "Paid", value: "Paid" },
        { label: "Cancel", value: "Cancel" },
        { label: "Refund", value: "Refund" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <Col sm={4} xxl={3}>
        <Flatpickr
          className="form-control bg-light border-light"
          id="datepicker-publish-input"
          placeholder="Select a date"
          options={{
            altInput: true,
            altFormat: "F j, Y",
            mode: "multiple",
            dateFormat: "d.m.y",
          }}
        />
      </Col>

      <Col sm={4} xxl={3}>
        <div className="input-light">
          <Select
            value={isStatus}
            onChange={() => {
              handleisStatus();
            }}
            options={allstatus}
            name="choices-single-default"
            id="idStatus"
          ></Select>
        </div>
      </Col>

      <Col sm={4} xxl={1}>
        <Button color="primary" className="w-100">
          <i className="ri-equalizer-fill me-1 align-bottom"></i> Filters
        </Button>
      </Col>
    </React.Fragment>
  );
};

const NFTRankingGlobalFilter = () => {
  return (
    <React.Fragment>
      <Col xxl={2} sm={4} className="ms-auto">
        <div>
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="choices-single-default"
            id="idStatus"
          >
            <option value="All Time" defaultValue>
              All Time
            </option>
            <option value="1 Day">1 Day</option>
            <option value="7 Days">7 Days</option>
            <option value="15 Days">15 Days</option>
            <option value="1 Month">1 Month</option>
            <option value="6 Month">6 Month</option>
          </select>
        </div>
      </Col>
    </React.Fragment>
  );
};

const TaskListGlobalFilter = () => {
  return (
    <React.Fragment>
      <div className="col-xxl-3 col-sm-4">
        <Flatpickr
          placeholder="Select date range"
          className="form-control bg-light border-light"
          options={{
            mode: "range",
            dateFormat: "d M, Y",
          }}
        />
      </div>

      <div className="col-xxl-3 col-sm-4">
        <div className="input-light">
          <select
            className="form-control"
            data-choices
            data-choices-search-false
            name="status"
            id="idStatus"
          >
            <option value="">Status</option>
            <option defaultValue="all">All</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="col-xxl-1 col-sm-4">
        <button type="button" className="btn btn-primary w-100">
          {" "}
          <i className="ri-equalizer-fill me-1 align-bottom"></i>
          Filters
        </button>
      </div>
    </React.Fragment>
  );
};

const LeadsGlobalFilter = ({ onClickDelete }) => {
  return (
    <React.Fragment>
      <div className="col-sm-auto ms-auto">
        <div className="hstack gap-2">
          <button className="btn btn-soft-danger" onClick={onClickDelete}>
            <i className="ri-delete-bin-2-line"></i>
          </button>
          <button
            type="button"
            className="btn btn-info"
            //  onClick={toggleInfo}
          >
            <i className="ri-filter-3-line align-bottom me-1"></i> Fliters
          </button>
          <button
            type="button"
            className="btn btn-success add-btn"
            id="create-btn"
            // onClick={() => { setIsEdit(false); toggle(); }}
          >
            <i className="ri-add-line align-bottom me-1"></i> Add Leads
          </button>
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn btn-soft-info btn-icon fs-14"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ri-settings-4-line"></i>
            </DropdownToggle>
            <DropdownMenu>
              <li>
                <DropdownItem>Copy</DropdownItem>
              </li>
              <li>
                <DropdownItem>Move to pipline</DropdownItem>
              </li>
              <li>
                <DropdownItem>Add to exceptions</DropdownItem>
              </li>
              <li>
                <DropdownItem>Switch to common form view</DropdownItem>
              </li>
              <li>
                <DropdownItem>Reset form view to default</DropdownItem>
              </li>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </React.Fragment>
  );
};

export {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  LeadsGlobalFilter,
  CatalogGlobalFilter,
};
