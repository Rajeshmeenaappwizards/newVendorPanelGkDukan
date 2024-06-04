import React, { useEffect, useState } from "react";
//Import Flatepicker
import Flatpickr from "react-flatpickr";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  CardBody,
  CardHeader,
  Container,
  Card,
  Row,
  Col,
  Input,
  ModalHeader,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Form,
  FormFeedback,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import logoDark from "../../../assets/images/logo-sm.png";
import * as Yup from "yup";
import InputImageComp from "../Components/InputImageComp";

//redux
import { useSelector, useDispatch } from "react-redux";
// Import actions
import { addVendorsData, getAllVendorsData } from "../../../slices/vendorPayment/thunk";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { clearVendoraddRes } from "../../../slices/vendorPayment/reducer";
import SellerChats from "./SellerChart";

const Vendors = () => {
  const dispatch = useDispatch();
  const [sellerList, setSellerList] = useState([]);
  const [modal, setModal] = useState(false);
  const [companyType, setcompanyType] = useState(null);
  const [uploadedId, setUploadedId] = useState({});

  // const selectsellerData = createSelector(
  //   (state) => state.Ecommerce,
  //   (sellers) => sellers.sellers
  // );
  // Inside your component
  // const sellers = useSelector(selectsellerData);
  const VendorsRes = useSelector(
    (state) => state.VendorPaymentSlice.getAllVendorsData
  );

  const VendorRes = useSelector((state) => state.VendorPaymentSlice.addVendorState)

  useEffect(() => {
    fetchAllVendors();
  }, []);

  const fetchAllVendors = () => {
    dispatch(getAllVendorsData());
  };

 

  useEffect(() => {
    if (VendorsRes && VendorsRes.success) {
      setSellerList(VendorsRes.data);
    }
  }, [VendorsRes]);


  useEffect(() => {
    if (!isEmpty(VendorsRes.data)) setSellerList(VendorsRes.data);
  }, [VendorsRes.data]);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  useEffect(() =>{
    if (VendorRes && VendorRes.success) {
      bottomrightnotify(VendorRes.message);
      dispatch(clearVendoraddRes())
      dispatch(getAllVendorsData());
      toggle()
    }
  },[VendorRes])

  //Tab
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const companytypes = [
    {
      options: [
        { label: "Select type", value: "Select type" },
        { label: "All", value: "All" },
        { label: "Merchandising", value: "Merchandising" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Partnership", value: "Partnership" },
        { label: "Corporation", value: "Corporation" },
      ],
    },
  ];

  function handlecompanyType(companyType) {
    setcompanyType(companyType);
  }

  const category = (e) => {
    if (e === "All") {
      var filter = sellers.filter((item) => item.category !== e);
    } else {
      filter = sellers.filter((item) => item.category === e);
    }
    setSellerList(filter);
  };

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  document.title = "Vendors";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //personal
      owner_first_name: "",
      owner_last_name: "",
      store_name: "",
      email: "",
      password: "",
      store_logo: uploadedId || "",
      phoneNumber: "",

      //address
      name: "",
      address_email: "",
      phone: "",
      city: "",
      pin: "",
      address: "",
      state: "",
      country: "",

      isChecked: true,

      //return
      return_phone: "",
      return_city: "",
      return_pin: "",
      return_address: "",
      return_state: "",
      return_country: "",

      //bank details
      bank_name: "",
      account_number: "",
      account_name: "",
      ifsc_code: "",

      //verification
      vendor_name: "",
      ID_number: "",
      card_type: "",
    },
    validationSchema: Yup.object({
      //personal
      owner_first_name: Yup.string().required("Please Enter Your First Name"),
      owner_last_name: Yup.string().required("Please Enter Your Last Name"),
      store_name: Yup.string().required("Please Enter Your Store Name"),
      // store_logo: Yup.object().required("Please Upload Your Store Logo"),
      // store_logo: Yup.mixed().required("Please upload your store logo"),
      email: Yup.string().required("Please Enter Your email"),
      password: Yup.string().required("Please Enter Your password"),
      phoneNumber: Yup.number().required("Please Enter Your phoneNumber"),

      //address
      name: Yup.string().required("Please Enter Your Name"),
      address_email: Yup.string().required("Please Enter Your email"),
      phone: Yup.number().required("Please Enter Your phoneNumber"),
      city: Yup.string().required("Please Enter Your city"),
      pin: Yup.number().required("Please Enter Your pin"),
      address: Yup.string().required("Please Enter Your address"),
      state: Yup.string().required("Please Enter Your state"),
      country: Yup.string().required("Please Enter Your country"),
      isChecked: Yup.bool(),
      //return
      return_phone: Yup.number().when("isChecked", {
        is: false,
        then: (schema) =>
          schema.required("Please Enter Your return phone number"),
      }),
      return_city: Yup.string().when("isChecked", {
        is: false,
        then: (schema) => schema.required("Please Enter Your return city"),
      }),
      return_pin: Yup.number().when("isChecked", {
        is: false,
        then: (schema) => schema.required("Please Enter Your return pin code"),
      }),
      return_address: Yup.string().when("isChecked", {
        is: false,
        then: (schema) => schema.required("Please Enter Your return address"),
      }),
      return_state: Yup.string().when("isChecked", {
        is: false,
        then: (schema) => schema.required("Please Enter Your return state"),
      }),
      return_country: Yup.string().when("isChecked", {
        is: false,
        then: (schema) => schema.required("Please Enter Your return country"),
      }),

      //bank details
      bank_name: Yup.string().required("Please Enter Your bank_name"),
      account_number: Yup.number().required("Please Enter Your account_number"),
      account_name: Yup.string().required("Please Enter Your account_name"),
      ifsc_code: Yup.string().required("Please Enter Your ifsc_code"),

      //verification
      vendor_name: Yup.string().required("Please Enter Your vendor_name"),
      ID_number: Yup.number().required("Please Enter Your ID_number"),
      card_type: Yup.string().required("Please Enter Your card_type"),
    }),
    onSubmit: (values) => {
      if (values.isChecked) {
        values.return_address = values.address;
        values.return_city = values.city;
        values.return_country = values.country;
        values.return_phone = values.phoneNumber;
        values.return_pin = values.pin;
        values.return_state = values.state;
      }
      dispatch(addVendorsData(values))
      resetForm();
    },
  });

  const handleFileUpload = (fileId) => {
    setUploadedId(fileId);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Sellers" pageTitle="Ecommerce" />
          <Card>
            <CardHeader className="border-0 rounded">
              <Row className="g-2">
                <Col xl={3}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control search"
                      placeholder="Search for sellers & owner name..."
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col xxl={3} className="ms-auto"></Col>
                <div className="col-lg-auto">
                  <div className="hstack gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      <i className="ri-add-fill me-1 align-bottom"></i> Add
                      Vendors
                    </button>
                  </div>
                </div>
              </Row>
            </CardHeader>
          </Card>

          <Row className="mt-4">
            {sellerList.map((seller, key) => (
              <React.Fragment key={key}>
                <Col xl={3} lg={6}>
                  <Card className="ribbon-box right overflow-hidden">
                    <CardBody className="text-center p-4">

                      {seller.verified && (
                        <div className="ribbon ribbon-info ribbon-shape trending-ribbon">
                          <i className="ri-flashlight-fill text-white align-bottom"></i>{" "}
                          <span className="trending-ribbon-text">Approved</span>
                        </div>
                      )}
                      <img src={logoDark} alt="" height="45" />
                      <h5 className="mb-1 mt-4">
                        <Link
                          to={`/Vendors/view-details/${seller._id}`}
                          className="link-primary"
                        >
                          {seller.name}
                        </Link>
                      </h5>
                      <p className="text-muted mb-4">{seller.name}</p>
                      <Row className="justify-content-center">
                        <Col lg={8}>
                          <SellerChats
                            color={"#0ab39c"}
                            data={[1, 14, 30, 2, 5, 50]}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={6} className="border-end-dashed border-end">
                          <h5>{seller.total_products}</h5>
                          <span className="text-muted">Total Products</span>
                        </Col>
                        <Col lg={6}>
                          <h5>{seller.total_sales}</h5>
                          <span className="text-muted">Total Sales</span>
                        </Col>
                      </Row>
                      <div className="mt-4">
                        <Link
                          to={`/Vendors/view-details/${seller._id}`}
                          className="btn btn-light w-100"
                        >
                          View Details
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </React.Fragment>
            ))}
          </Row>

          <Row className="g-0 text-center text-sm-start align-items-center mb-3">
            <Col sm={6}>
              <div>
                <p className="mb-sm-0">Showing 1 to 8 of 12 entries</p>
              </div>
            </Col>
            <Col sm={6}>
              <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                <li className="page-item disabled">
                  {" "}
                  <Link to="#" className="page-link">
                    <i className="mdi mdi-chevron-left"></i>
                  </Link>{" "}
                </li>
                <li className="page-item active">
                  {" "}
                  <Link to="#" className="page-link">
                    1
                  </Link>{" "}
                </li>
                <li className="page-item ">
                  {" "}
                  <Link to="#" className="page-link">
                    2
                  </Link>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Link to="#" className="page-link">
                    3
                  </Link>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Link to="#" className="page-link">
                    4
                  </Link>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Link to="#" className="page-link">
                    5
                  </Link>{" "}
                </li>
                <li className="page-item">
                  {" "}
                  <Link to="#" className="page-link">
                    <i className="mdi mdi-chevron-right"></i>
                  </Link>{" "}
                </li>
              </ul>
            </Col>
          </Row>

          <Modal
            className="zoomIn"
            id="addSeller"
            size="lg"
            isOpen={modal}
            toggle={toggle}
            backdrop={"static"}
            centered
          >
            <ModalHeader toggle={toggle}>Add Vendor</ModalHeader>
            <div className="modal-content border-0 mt-3">
              <Nav className="nav-tabs nav-tabs-custom nav-success p-2 pb-0 bg-light">
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Personal Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Address
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Bank Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      toggleTab("4");
                    }}
                  >
                    Verification
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <ModalBody>
              <div className="live-preview">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="store_logo">Store Logo</Label>
                            <InputImageComp
                              type="file"
                              name="store_logo"
                              className="form-control"
                              onFileUpload={handleFileUpload}
                              // invalid={
                              //   validation.touched.store_logo &&
                              //   validation.errors.store_logo
                              //     ? true
                              //     : false
                              // }
                            />
                            {/* {validation.touched.store_logo &&
                            validation.errors.store_logo ? (
                              <FormFeedback type="invalid">
                                {validation.errors.store_logo}
                              </FormFeedback>
                            ) : null} */}
                          </FormGroup>
                        </Col>

                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="owner_first_name">First name</Label>
                            <Input
                              name="owner_first_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="owner_first_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.owner_first_name || ""}
                              invalid={
                                validation.touched.owner_first_name &&
                                  validation.errors.owner_first_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.owner_first_name &&
                              validation.errors.owner_first_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.owner_first_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="owner_last_name">Last name</Label>
                            <Input
                              name="owner_last_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="owner_last_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.owner_last_name || ""}
                              invalid={
                                validation.touched.owner_last_name &&
                                  validation.errors.owner_last_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.owner_last_name &&
                              validation.errors.owner_last_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.owner_last_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="store_name">Store name</Label>
                            <Input
                              name="store_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="store_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.store_name || ""}
                              invalid={
                                validation.touched.store_name &&
                                  validation.errors.store_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.store_name &&
                              validation.errors.store_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.store_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              name="email"
                              placeholder=""
                              type="email"
                              className="form-control"
                              id="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                  validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                              validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              name="password"
                              placeholder=""
                              type="password"
                              className="form-control"
                              id="password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                  validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                              validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>


                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="phoneNumber">Contact Number</Label>
                            <Input
                              name="phoneNumber"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="phoneNumber"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phoneNumber || ""}
                              invalid={
                                validation.touched.phoneNumber &&
                                  validation.errors.phoneNumber
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phoneNumber &&
                              validation.errors.phoneNumber ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phoneNumber}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              name="name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name &&
                                  validation.errors.name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.name &&
                              validation.errors.name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="city">City</Label>
                            <Input
                              name="city"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="address_city"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.city || ""}
                              invalid={
                                validation.touched.city &&
                                  validation.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.city &&
                              validation.errors.city ? (
                              <FormFeedback type="invalid">
                                {validation.errors.city}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              name="address"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="address"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.address || ""}
                              invalid={
                                validation.touched.address &&
                                  validation.errors.address
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.address &&
                              validation.errors.address ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="phone">Contact Number</Label>
                            <Input
                              name="phone"
                              placeholder=""
                              type="number"
                              className="form-control"
                              id="phone"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.phone || ""}
                              invalid={
                                validation.touched.phone &&
                                  validation.errors.phone
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phone &&
                              validation.errors.phone ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phone}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="address_email">Address Email</Label>
                            <Input
                              name="address_email"
                              placeholder=""
                              type="email"
                              className="form-control"
                              id="address_email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.address_email || ""}
                              invalid={
                                validation.touched.address_email &&
                                  validation.errors.address_email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.address_email &&
                              validation.errors.address_email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.address_email}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="state">State</Label>
                            <Input
                              name="state"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="state"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.state || ""}
                              invalid={
                                validation.touched.state &&
                                  validation.errors.state
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.state &&
                              validation.errors.state ? (
                              <FormFeedback type="invalid">
                                {validation.errors.state}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              name="country"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="country"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.country || ""}
                              invalid={
                                validation.touched.country &&
                                  validation.errors.country
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.country &&
                              validation.errors.country ? (
                              <FormFeedback type="invalid">
                                {validation.errors.country}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="pin">Pin Code</Label>
                            <Input
                              name="pin"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="pin"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.pin || ""}
                              invalid={
                                validation.touched.pin && validation.errors.pin
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.pin && validation.errors.pin ? (
                              <FormFeedback type="invalid">
                                {validation.errors.pin}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <div className="form-check form-check-dark">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                name="isChecked"
                                id="formCheck12"
                                checked={validation.values.isChecked}
                                onChange={validation.handleChange}
                              />
                              <Label
                                className="form-check-label"
                                for="formCheck12"
                              >
                                Return Address is Same as Current Address
                              </Label>
                            </div>
                          </FormGroup>
                        </Col>
                        {!validation.values.isChecked && (
                          <Row>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_address">
                                  Return Address
                                </Label>
                                <Input
                                  name="return_address"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_address"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_address || ""}
                                  invalid={
                                    validation.touched.return_address &&
                                      validation.errors.return_address
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_address &&
                                  validation.errors.return_address ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_address}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_city">Return City</Label>
                                <Input
                                  name="return_city"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_city"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_city || ""}
                                  invalid={
                                    validation.touched.return_city &&
                                      validation.errors.return_city
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_city &&
                                  validation.errors.return_city ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_city}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_pin">Return Pin</Label>
                                <Input
                                  name="return_pin"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_pin"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_pin || ""}
                                  invalid={
                                    validation.touched.return_pin &&
                                      validation.errors.return_pin
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_pin &&
                                  validation.errors.return_pin ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_pin}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_state">
                                  Return State
                                </Label>
                                <Input
                                  name="return_state"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_state"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_state || ""}
                                  invalid={
                                    validation.touched.return_state &&
                                      validation.errors.return_state
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_state &&
                                  validation.errors.return_state ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_state}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_country">
                                  Return Country
                                </Label>
                                <Input
                                  name="return_country"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_country"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_country || ""}
                                  invalid={
                                    validation.touched.return_country &&
                                      validation.errors.return_country
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_country &&
                                  validation.errors.return_country ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_country}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col lg={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="return_phone">
                                  Return Contact
                                </Label>
                                <Input
                                  name="return_phone"
                                  placeholder=""
                                  type="text"
                                  className="form-control"
                                  id="return_phone"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.return_phone || ""}
                                  invalid={
                                    validation.touched.return_phone &&
                                      validation.errors.return_phone
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.return_phone &&
                                  validation.errors.return_phone ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.return_phone}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="row">
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="bank_name">Bank Name</Label>
                            <Input
                              name="bank_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="bank_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.bank_name || ""}
                              invalid={
                                validation.touched.bank_name &&
                                  validation.errors.bank_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.bank_name &&
                              validation.errors.bank_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.bank_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="account_number">
                              Account Number
                            </Label>
                            <Input
                              name="account_number"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="account_number"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.account_number || ""}
                              invalid={
                                validation.touched.account_number &&
                                  validation.errors.account_number
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.account_number &&
                              validation.errors.account_number ? (
                              <FormFeedback type="invalid">
                                {validation.errors.account_number}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="account_name">
                              Account Holder Name
                            </Label>
                            <Input
                              name="account_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="account_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.account_name || ""}
                              invalid={
                                validation.touched.account_name &&
                                  validation.errors.account_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.account_name &&
                              validation.errors.account_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.account_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="ifsc_code">Ifsc Code</Label>
                            <Input
                              name="ifsc_code"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="ifsc_code"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.ifsc_code || ""}
                              invalid={
                                validation.touched.ifsc_code &&
                                  validation.errors.ifsc_code
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.ifsc_code &&
                              validation.errors.ifsc_code ? (
                              <FormFeedback type="invalid">
                                {validation.errors.ifsc_code}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <div className="row">
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="vendor_name">Vendor Name</Label>
                            <Input
                              name="vendor_name"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="vendor_name"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.vendor_name || ""}
                              invalid={
                                validation.touched.vendor_name &&
                                  validation.errors.vendor_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.vendor_name &&
                              validation.errors.vendor_name ? (
                              <FormFeedback type="invalid">
                                {validation.errors.vendor_name}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="card_type">Card Type</Label>
                            <Input
                              name="card_type"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="card_type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.card_type || ""}
                              invalid={
                                validation.touched.card_type &&
                                  validation.errors.card_type
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.card_type &&
                              validation.errors.card_type ? (
                              <FormFeedback type="invalid">
                                {validation.errors.card_type}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="ID_number">Id Number</Label>
                            <Input
                              name="ID_number"
                              placeholder=""
                              type="text"
                              className="form-control"
                              id="ID_number"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.ID_number || ""}
                              invalid={
                                validation.touched.ID_number &&
                                  validation.errors.ID_number
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.ID_number &&
                              validation.errors.ID_number ? (
                              <FormFeedback type="invalid">
                                {validation.errors.ID_number}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col lg={12}>
                          <div className="hstack gap-2 justify-content-end">
                            {/* <button
                              className="btn btn-link link-success text-decoration-none fw-medium"
                              data-bs-dismiss="modal"
                              onClick={() => toggle()}
                            >
                              <i className="ri-close-line me-1 align-middle"></i>{" "}
                              Close
                            </button> */}
                            <button type="submit" className="btn btn-primary">
                              <i className="ri-save-3-line align-bottom me-1"></i>{" "}
                              Save
                            </button>
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                  </TabContent>
                </Form>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Vendors;
