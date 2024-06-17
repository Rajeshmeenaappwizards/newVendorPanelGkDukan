import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  Nav,
  NavItem,
  NavLink,
  Progress,
  TabContent,
  TabPane,
  CardHeader,
} from "reactstrap";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import actions
import {
  registerUser,
  apiError,
  resetRegisterFlag,
  registerApi,
  registerAddressApi,
  registerBankApi,
} from "../../slices/thunks";

// import images
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import InputImageComp from "../OurPages/Components/InputImageComp";
import { loadAnimation } from "lottie-web";
import { defineElement } from "lord-icon-element";
import { resetRegisterData } from "../../slices/auth/register/reducer";

// register lottie and define custom element
defineElement(loadAnimation);

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bankDataRes = useSelector((state) => state.Account.registerBankData);

  const [activeTab, setActiveTab] = useState(1);
  const [progressbarValue, setProgressbarValue] = useState(50);
  const [id, setId] = useState("");
  const [passedSteps, setPassedSteps] = useState([]);
  const [formData, setFormData] = useState({
    store_name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm_password: "",
    owner_first_name: "",
    owner_last_name: "",
  });
  const [addressData, setAddressData] = useState({
    phone: "",
    city: "",
    name: "",
    pin: "",
    state: "",
    address: "",
    country: "India",
    email: "",
    return_address: "",
    return_pin: "",
    return_city: "",
    return_state: "",
    return_country: "India",
  });
  const [bankData, setBankData] = useState({
    bank_name: "",
    account_number: "",
    ifsc_code: "",
    account_name: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [allAddressFieldsFilled, setAllAddressFieldsFilled] = useState(false);
  const [allBankFieldsFilled, setAllBankFieldsFilled] = useState(false);

  const selectLayoutState = (state) => state.Account;
  const registerdatatype = createSelector(selectLayoutState, (account) => ({
    success: account.success,
    error: account.error,
  }));

  const { error, success } = useSelector(registerdatatype);
  const registerRes = useSelector((state) => state.Account.registerData);

  useEffect(() => {
    if (registerRes && registerRes.success) {
      localStorage.setItem("authUser", JSON.stringify({success:registerRes.success,token:registerRes.token}));
      toggleTab(activeTab + 1, 50);
    }
  }, [registerRes]);



  document.title = "SignUp | GK Dukaan - Vendor";

  const toggleTab = (tab, value) => {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setProgressbarValue(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    checkAllFieldsFilled();
  };
  const handleFileUpload = (fileId) => {
    setId(fileId);
  };
  const isSixCharsPassword = (password) => {
    return password.length >= 6;
  };

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
    checkAllAddressFieldsFilled();
  };

  const handleBank = (e) => {
    const { name, value } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
    checkAllBankFieldsFilled();
  };

  const togglePage = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (!isSixCharsPassword(formData.password)) {
      setPasswordError("Password must be at least six characters long");
      return;
    }
    setPasswordError("");
    const { confirm_password, uploadedId, ...apiData } = formData;
    const imageData = { store_logo: id ? id : null, ...apiData };
    dispatch(registerApi(imageData));
  
  };

  const togglePageTwo = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerAddressApi(addressData));
    console.log("Address", res);
    if (res?.payload?.address?.warehouse_creation?.success) {
      toggleTab(activeTab + 1, 75);
    }
  };

  const togglePageBank = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerBankApi(bankData));
    if (res?.payload?._id) {
      toggleTab(activeTab + 1, 100);
      setTimeout(() =>{
          navigate('/login')
      },5000)
    }
  };

  const handleSubmit = () => {};

  const checkAllFieldsFilled = () => {
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    setAllFieldsFilled(allFilled);
  };

  const checkAllAddressFieldsFilled = () => {
    const allFilled = Object.values(addressData).every(
      (val) => val.trim() !== ""
    );
    setAllAddressFieldsFilled(allFilled);
  };

  const checkAllBankFieldsFilled = () => {
    const allFilled = Object.values(bankData).every((val) => val.trim() !== "");
    setAllBankFieldsFilled(allFilled);
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
                  {/* <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> */}
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={7}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                    </div>
                    <div className="p-2 mt-4">
                      <Form onSubmit={handleSubmit}>
                        <Col xl={12}>
                          <Card>
                            <CardBody>
                              <Form action="#" className="form-steps">
                                <div className="text-center pt-3 pb-4 mb-1">
                                  <h5>Signup Your Account</h5>
                                </div>

                                <div className="progress-nav mb-4">
                                  <Progress
                                    value={progressbarValue}
                                    style={{ height: "1px" }}
                                  />

                                  <Nav
                                    className="nav-pills progress-bar-tab custom-nav"
                                    role="tablist"
                                  >
                                    <NavItem>
                                      <NavLink
                                        to="#"
                                        className={classnames(
                                          {
                                            active: activeTab === 1,
                                            done:
                                              activeTab <= 4 && activeTab >= 0,
                                          },
                                          "rounded-pill"
                                        )}
                                        onClick={() => {
                                          toggleTab(1, 0);
                                        }}
                                        tag="button"
                                      >
                                        1
                                      </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                        to="#"
                                        className={classnames(
                                          {
                                            active: activeTab === 2,
                                            done:
                                              activeTab <= 4 && activeTab > 1,
                                          },
                                          "rounded-pill"
                                        )}
                                        onClick={() => {
                                          toggleTab(2, 50);
                                        }}
                                        tag="button"
                                      >
                                        2
                                      </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                        to="#"
                                        className={classnames(
                                          {
                                            active: activeTab === 3,
                                            done:
                                              activeTab <= 4 && activeTab > 2,
                                          },
                                          "rounded-pill"
                                        )}
                                        onClick={() => {
                                          toggleTab(3, 75);
                                        }}
                                        tag="button"
                                      >
                                        3
                                      </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                        to="#"
                                        className={classnames(
                                          {
                                            active: activeTab === 4,
                                            done:
                                              activeTab <= 4 && activeTab > 3,
                                          },
                                          "rounded-pill"
                                        )}
                                        onClick={() => {
                                          toggleTab(4, 100);
                                        }}
                                        tag="button"
                                      >
                                        4
                                      </NavLink>
                                    </NavItem>
                                  </Nav>
                                </div>

                                <TabContent activeTab={activeTab}>
                                  <TabPane tabId={1}>
                                    <div>
                                      <div className="mb-4">
                                        <div>
                                          <h5 className="mb-1">
                                            General Information
                                          </h5>
                                          <p className="text-muted">
                                            Fill all Information as below
                                          </p>
                                        </div>
                                      </div>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-owner_last_name-input"
                                            >
                                              First Name
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="gen-info-owner_first_name-input"
                                              name="owner_first_name"
                                              placeholder="Enter First Name"
                                              onChange={handleChange}
                                              value={formData.owner_first_name}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-owner_last_name-input"
                                            >
                                              Last Name
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="gen-info-owner_last_name-input"
                                              name="owner_last_name"
                                              placeholder="Enter Last Name"
                                              onChange={handleChange}
                                              value={formData.owner_last_name}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-email-input"
                                            >
                                              Email
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="email"
                                              className="form-control"
                                              id="gen-info-email-input"
                                              name="email"
                                              placeholder="Enter Email"
                                              onChange={handleChange}
                                              value={formData.email}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-email-input"
                                            >
                                              Email
                                            </Label>
                                            <InputImageComp
                                              autoComplete="off"
                                              type="file"
                                              className="form-control"
                                              onFileUpload={handleFileUpload}
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-store-name-input"
                                            >
                                              Store Name
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="gen-info-store-name-input"
                                              name="store_name"
                                              placeholder="Enter Store Name"
                                              onChange={handleChange}
                                              value={formData.store_name}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-phoneNumber-input"
                                            >
                                              Phone Number
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="gen-info-phoneNumber-input"
                                              name="phoneNumber"
                                              placeholder="Enter Phone Number"
                                              onChange={handleChange}
                                              value={formData.phoneNumber}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-password-input"
                                            >
                                              Password
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="password"
                                              className="form-control"
                                              id="gen-info-password-input"
                                              name="password"
                                              placeholder="Enter Password"
                                              onChange={handleChange}
                                              value={formData.password}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={12}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="gen-info-password-input"
                                            >
                                              Confirm Password
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="password"
                                              className="form-control"
                                              id="gen-info-password-input"
                                              name="confirm_password"
                                              placeholder="Enter Password"
                                              onChange={handleChange}
                                              value={formData.confirm_password}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      {passwordError && (
                                        <Alert color="danger">
                                          {passwordError}
                                        </Alert>
                                      )}
                                      <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                          type="submit"
                                          className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                          onClick={togglePage}
                                          disabled={!allFieldsFilled}
                                        >
                                          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                          Next
                                        </button>
                                      </div>
                                    </div>
                                  </TabPane>

                                  <TabPane tabId={2}>
                                    <div>
                                      <div className="mb-4">
                                        <div>
                                          <h5 className="mb-1">
                                            Address Information
                                          </h5>
                                          <p className="text-muted">
                                            Fill all Information as below
                                          </p>
                                        </div>
                                      </div>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-phone-input"
                                            >
                                              Phone
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-phone-input"
                                              name="phone"
                                              placeholder="Enter Phone"
                                              onChange={handleAddress}
                                              value={addressData.phone}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-city-input"
                                            >
                                              City
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-city-input"
                                              name="city"
                                              placeholder="Enter City"
                                              onChange={handleAddress}
                                              value={addressData.city || ""}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-name-input"
                                            >
                                              Name
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-name-input"
                                              name="name"
                                              placeholder="Enter Name"
                                              onChange={handleAddress}
                                              value={addressData.name}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-pin-input"
                                            >
                                              Pin
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-pin-input"
                                              name="pin"
                                              placeholder="Enter Pin"
                                              onChange={handleAddress}
                                              value={addressData.pin}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-state-input"
                                            >
                                              State
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-state-input"
                                              name="state"
                                              placeholder="Enter State"
                                              onChange={handleAddress}
                                              value={addressData.state}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-address-input"
                                            >
                                              Address
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-address-input"
                                              name="address"
                                              placeholder="Enter Address"
                                              onChange={handleAddress}
                                              value={addressData.address}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-country-input"
                                            >
                                              Country
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-country-input"
                                              name="country"
                                              placeholder="Enter Country"
                                              // onChange={handleAddress}
                                              value={addressData.country}
                                              disabled
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-email-input"
                                            >
                                              Email
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="email"
                                              className="form-control"
                                              id="additional-email-input"
                                              name="email"
                                              placeholder="Enter Email"
                                              onChange={handleAddress}
                                              value={addressData.email}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-return-address-input"
                                            >
                                              Return Address
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-return-address-input"
                                              name="return_address"
                                              placeholder="Enter Return Address"
                                              onChange={handleAddress}
                                              value={addressData.return_address}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-return-pin-input"
                                            >
                                              Return Pin
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-return-pin-input"
                                              name="return_pin"
                                              placeholder="Enter Return Pin"
                                              onChange={handleAddress}
                                              value={addressData.return_pin}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-return-city-input"
                                            >
                                              Return City
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-return-city-input"
                                              name="return_city"
                                              placeholder="Enter Return City"
                                              onChange={handleAddress}
                                              value={addressData.return_city}
                                              required
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-return-state-input"
                                            >
                                              Return State
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-return-state-input"
                                              name="return_state"
                                              placeholder="Enter Return State"
                                              onChange={handleAddress}
                                              value={addressData.return_state}
                                              required
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <Label
                                              className="form-label"
                                              htmlFor="additional-return-country-input"
                                            >
                                              Return Country
                                            </Label>
                                            <Input
                                              autoComplete="off"
                                              type="text"
                                              className="form-control"
                                              id="additional-return-country-input"
                                              name="return_country"
                                              placeholder="Enter Return Country"
                                              onChange={handleAddress}
                                              value={addressData.return_country}
                                              // required
                                              disabled
                                            />
                                          </div>
                                        </Col>
                                      </Row>
                                      <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                          type="submit"
                                          className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                          onClick={togglePageTwo}
                                          disabled={!allAddressFieldsFilled}
                                        >
                                          <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                          Next
                                        </button>
                                      </div>
                                    </div>
                                  </TabPane>
                                  <TabPane tabId={3}>
                                    <div>
                                      <div className="mb-4">
                                        <div>
                                          <h5 className="mb-1">Bank Details</h5>
                                          <p className="text-muted">
                                            Fill all Information as below
                                          </p>
                                        </div>
                                        <Row>
                                          <Col lg={6}>
                                            <div className="mb-3">
                                              <Label
                                                className="form-label"
                                                htmlFor="additional-bank-name-input"
                                              >
                                                Bank Name
                                              </Label>
                                              <Input
                                                autoComplete="off"
                                                type="text"
                                                className="form-control"
                                                id="additional-bank-name-input"
                                                name="bank_name"
                                                placeholder="Enter Bank Name"
                                                onChange={handleBank}
                                                value={bankData.bank_name}
                                                required
                                              />
                                            </div>
                                          </Col>
                                          <Col lg={6}>
                                            <div className="mb-3">
                                              <Label
                                                className="form-label"
                                                htmlFor="additional-account-number-input"
                                              >
                                                Account Number
                                              </Label>
                                              <Input
                                                autoComplete="off"
                                                type="text"
                                                className="form-control"
                                                id="additional-account-number-input"
                                                name="account_number"
                                                placeholder="Enter Account Number"
                                                onChange={handleBank}
                                                value={bankData.account_number}
                                                required
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg={6}>
                                            <div className="mb-3">
                                              <Label
                                                className="form-label"
                                                htmlFor="additional-ifsc-code-input"
                                              >
                                                IFSC Code
                                              </Label>
                                              <Input
                                                autoComplete="off"
                                                type="text"
                                                className="form-control"
                                                id="additional-ifsc-code-input"
                                                name="ifsc_code"
                                                placeholder="Enter IFSC Code"
                                                onChange={handleBank}
                                                value={bankData.ifsc_code}
                                                required
                                              />
                                            </div>
                                          </Col>

                                          <Col lg={6}>
                                            <div className="mb-3">
                                              <Label
                                                className="form-label"
                                                htmlFor="additional-ifsc-code-input"
                                              >
                                                Account Name
                                              </Label>
                                              <Input
                                                autoComplete="off"
                                                type="text"
                                                className="form-control"
                                                id="additional-ifsc-code-input"
                                                name="account_name"
                                                placeholder="Enter IFSC Code"
                                                onChange={handleBank}
                                                value={bankData.account_name}
                                                required
                                              />
                                            </div>
                                          </Col>
                                        </Row>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                          <button
                                            type="submit"
                                            className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                            onClick={togglePageBank}
                                            disabled={!allBankFieldsFilled}
                                          >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </TabPane>
                                  <TabPane tabId={4}>

                                    {bankDataRes && bankDataRes._id && (
                                      <div className="text-center">
                                        <div className="mb-4">
                                          <lord-icon
                                            src="https://cdn.lordicon.com/lupuorrc.json"
                                            trigger="loop"
                                            colors="primary:#0ab39c,secondary:#405189"
                                            style={{
                                              width: "120px",
                                              height: "120px",
                                            }}
                                          ></lord-icon>
                                        </div>
                                        <h5>Well Done !</h5>
                                        <p className="text-muted">
                                          You have Successfully Signed Up
                                        </p>
                                      </div>
                                    )}
                                  </TabPane>
                                </TabContent>
                              </Form>
                            </CardBody>
                          </Card>
                        </Col>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Signin
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          <ToastContainer closeButton={false} limit={1} />
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Register;
