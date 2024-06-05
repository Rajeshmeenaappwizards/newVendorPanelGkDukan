// import React, { useEffect } from "react";
// import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// // Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // action
// import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

// //redux
// import { useSelector, useDispatch } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";

// //import images 
// import logoLight from "../../assets/images/logo-light.png";
// import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
// import { createSelector } from "reselect";

// const Register = () => {
//     const history = useNavigate();
//     const dispatch = useDispatch();

//     const validation = useFormik({
//         // enableReinitialize : use this flag when initial values needs to be changed
//         enableReinitialize: true,

//         initialValues: {
//             email: '',
//             first_name: '',
//             password: '',
//             confirm_password: ''
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().required("Please Enter Your Email"),
//             first_name: Yup.string().required("Please Enter Your Username"),
//               password: Yup.string().required("Please enter your password"),
//             confirm_password: Yup.string()
//                 .oneOf([Yup.ref("password")], "Passwords do not match")
//                 .required("Please confirm your password"),
//         }),
//         onSubmit: (values) => {
//             dispatch(registerUser(values));
//         }
//     });

//     const selectLayoutState = (state) => state.Account;
//     const registerdatatype = createSelector(
//         selectLayoutState,
//         (account) => ({
//             success: account.success,
//             error: account.error
//         })
//     );
//     // Inside your component
//     const {
//         error, success
//     } = useSelector(registerdatatype);

//     useEffect(() => {
//         dispatch(apiError(""));
//     }, [dispatch]);

//     useEffect(() => {
//         if (success) {
//             setTimeout(() => history("/login"), 3000);
//         }

//         setTimeout(() => {
//             dispatch(resetRegisterFlag());
//         }, 3000);

//     }, [dispatch, success, error, history]);

//     document.title = "Basic SignUp | GK Dukaan - Ghar Ki Dukaan";

//     return (
//         <React.Fragment>
//             <ParticlesAuth>
//                 <div className="auth-page-content mt-lg-5">
//                     <Container>
//                         <Row>
//                             <Col lg={12}>
//                                 <div className="text-center mt-sm-5 mb-4 text-white-50">
//                                     <div>
//                                         <Link to="/" className="d-inline-block auth-logo">
//                                             <img src={logoLight} alt="" height="20" />
//                                         </Link>
//                                     </div>
//                                     <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
//                                 </div>
//                             </Col>
//                         </Row>

//                         <Row className="justify-content-center">
//                             <Col md={8} lg={6} xl={5}>
//                                 <Card className="mt-4">

//                                     <CardBody className="p-4">
//                                         <div className="text-center mt-2">
//                                             <h5 className="text-primary">Create New Account</h5>
//                                             <p className="text-muted">Get your free velzon account now</p>
//                                         </div>
//                                         <div className="p-2 mt-4">
//                                             <Form
//                                                 onSubmit={(e) => {
//                                                     e.preventDefault();
//                                                     validation.handleSubmit();
//                                                     return false;
//                                                 }}
//                                                 className="needs-validation" action="#">

//                                                 {success && success ? (
//                                                     <>
//                                                         {toast("Your Redirect To Login Page...", { position: "top-right", hideProgressBar: false, className: 'bg-success text-white', progress: undefined, toastId: "" })}
//                                                         <ToastContainer autoClose={2000} limit={1} />
//                                                         <Alert color="success">
//                                                             Register User Successfully and Your Redirect To Login Page...
//                                                         </Alert>
//                                                     </>
//                                                 ) : null}

//                                                 {error && error ? (
//                                                     <Alert color="danger"><div>
//                                                         Email has been Register Before, Please Use Another Email Address... </div></Alert>
//                                                 ) : null}

//                                                 <div className="mb-3">
//                                                     <Label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></Label>
//                                                     <Input
//                                                         id="email"
//                                                         name="email"
//                                                         className="form-control"
//                                                         placeholder="Enter email address"
//                                                         type="email"
//                                                         onChange={validation.handleChange}
//                                                         onBlur={validation.handleBlur}
//                                                         value={validation.values.email || ""}
//                                                         invalid={
//                                                             validation.touched.email && validation.errors.email ? true : false
//                                                         }
//                                                     />
//                                                     {validation.touched.email && validation.errors.email ? (
//                                                         <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
//                                                     ) : null}

//                                                 </div>
//                                                 <div className="mb-3">
//                                                     <Label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></Label>
//                                                     <Input
//                                                         name="first_name"
//                                                         type="text"
//                                                         placeholder="Enter username"
//                                                         onChange={validation.handleChange}
//                                                         onBlur={validation.handleBlur}
//                                                         value={validation.values.first_name || ""}
//                                                         invalid={
//                                                             validation.touched.first_name && validation.errors.first_name ? true : false
//                                                         }
//                                                     />
//                                                     {validation.touched.first_name && validation.errors.first_name ? (
//                                                         <FormFeedback type="invalid"><div>{validation.errors.first_name}</div></FormFeedback>
//                                                     ) : null}

//                                                 </div>

//                                                 <div className="mb-3">
//                                                     <Label htmlFor="userpassword" className="form-label">Password <span className="text-danger">*</span></Label>
//                                                     <Input
//                                                         name="password"
//                                                         type="password"
//                                                         placeholder="Enter Password"
//                                                         onChange={validation.handleChange}
//                                                         onBlur={validation.handleBlur}
//                                                         value={validation.values.password || ""}
//                                                         invalid={
//                                                             validation.touched.password && validation.errors.password ? true : false
//                                                         }
//                                                     />
//                                                     {validation.touched.password && validation.errors.password ? (
//                                                         <FormFeedback type="invalid"><div>{validation.errors.password}</div></FormFeedback>
//                                                     ) : null}

//                                                 </div>

//                                                 <div className="mb-2">
//                                                     <Label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></Label>
//                                                     <Input
//                                                         name="confirm_password"
//                                                         type="password"
//                                                         placeholder="Confirm Password"
//                                                         onChange={validation.handleChange}
//                                                         onBlur={validation.handleBlur}
//                                                         value={validation.values.confirm_password || ""}
//                                                         invalid={
//                                                             validation.touched.confirm_password && validation.errors.confirm_password ? true : false
//                                                         }
//                                                     />
//                                                     {validation.touched.confirm_password && validation.errors.confirm_password ? (
//                                                         <FormFeedback type="invalid"><div>{validation.errors.confirm_password}</div></FormFeedback>
//                                                     ) : null}

//                                                 </div>

//                                                 <div className="mb-4">
//                                                     <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon
//                                                         <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
//                                                 </div>

//                                                 <div className="mt-4">
//                                                     <button className="btn btn-success w-100" type="submit">Sign Up</button>
//                                                 </div>

//                                                 <div className="mt-4 text-center">
//                                                     <div className="signin-other-title">
//                                                         <h5 className="fs-13 mb-4 title text-muted">Create account with</h5>
//                                                     </div>

//                                                     <div>
//                                                         <button type="button" className="btn btn-primary btn-icon waves-effect waves-light"><i className="ri-facebook-fill fs-16"></i></button>{" "}
//                                                         <button type="button" className="btn btn-danger btn-icon waves-effect waves-light"><i className="ri-google-fill fs-16"></i></button>{" "}
//                                                         <button type="button" className="btn btn-dark btn-icon waves-effect waves-light"><i className="ri-github-fill fs-16"></i></button>{" "}
//                                                         <button type="button" className="btn btn-info btn-icon waves-effect waves-light"><i className="ri-twitter-fill fs-16"></i></button>
//                                                     </div>
//                                                 </div>
//                                             </Form>
//                                         </div>
//                                     </CardBody>
//                                 </Card>
//                                 <div className="mt-4 text-center">
//                                     <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
//                                 </div>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </div>
//             </ParticlesAuth>
//         </React.Fragment>
//     );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, Nav, NavItem, NavLink, Progress, TabContent, TabPane, CardHeader } from "reactstrap";
import classnames from 'classnames';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import actions
import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

// import images 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const Register = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(1);
    const [progressbarValue, setProgressbarValue] = useState(33);
    const [passedSteps, setPassedSteps] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        password: '',
        confirm_password: '',
        address: '',
        phone: '',
        country: ''
    });

    const selectLayoutState = (state) => state.Account;
    const registerdatatype = createSelector(
        selectLayoutState,
        (account) => ({
            success: account.success,
            error: account.error
        })
    );

    const { error, success } = useSelector(registerdatatype);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => history("/login"), 3000);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);
    }, [dispatch, success, error, history]);

    document.title = "Basic SignUp | GK Dukaan - Ghar Ki Dukaan";

    const toggleTab = (tab, value) => {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab];

            if (tab >= 1 && tab <= 3) {
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
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
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
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Create New Account</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form onSubmit={handleSubmit}>
                                                <Col xl={12}>
                                                    <Card>
                                                        {/* <CardHeader>
                                                            <h4 className="card-title mb-0">Progress Nav Steps</h4>
                                                        </CardHeader> */}
                                                        <CardBody>
                                                            <Form action="#" className="form-steps">
                                                                <div className="text-center pt-3 pb-4 mb-1">
                                                                    <h5>Signup Your Account</h5>
                                                                </div>

                                                                <div className="progress-nav mb-4">
                                                                    <Progress value={progressbarValue} style={{ height: "1px" }} />

                                                                    <Nav className="nav-pills progress-bar-tab custom-nav" role="tablist">
                                                                        <NavItem>
                                                                            <NavLink to="#" className={classnames({ active: activeTab === 1, done: activeTab <= 3 && activeTab >= 0 }, "rounded-pill")} onClick={() => { toggleTab(1, 33); }} tag="button">1</NavLink>
                                                                        </NavItem>
                                                                        <NavItem>
                                                                            <NavLink to="#" className={classnames({ active: activeTab === 2, done: activeTab <= 3 && activeTab > 1 }, "rounded-pill")} onClick={() => { toggleTab(2, 66); }} tag="button">2</NavLink>
                                                                        </NavItem>
                                                                        <NavItem>
                                                                            <NavLink to="#" className={classnames({ active: activeTab === 3, done: activeTab <= 3 && activeTab > 2 }, "rounded-pill")} onClick={() => { toggleTab(3, 100); }} tag="button">3</NavLink>
                                                                        </NavItem>
                                                                    </Nav>
                                                                </div>

                                                                <TabContent activeTab={activeTab}>
                                                                    <TabPane tabId={1}>
                                                                        <div>
                                                                            <div className="mb-4">
                                                                                <div>
                                                                                    <h5 className="mb-1">General Information</h5>
                                                                                    <p className="text-muted">Fill all Information as below</p>
                                                                                </div>
                                                                            </div>
                                                                            <Row>
                                                                                <Col lg={6}>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label" htmlFor="gen-info-email-input">Email</Label>
                                                                                        <Input type="text" className="form-control" id="gen-info-email-input" name="email" placeholder="Enter Email" onChange={handleChange} value={formData.email} />
                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg={6}>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label" htmlFor="gen-info-username-input">Username</Label>
                                                                                        <Input type="text" className="form-control" id="gen-info-username-input" name="first_name" placeholder="Enter User Name" onChange={handleChange} value={formData.first_name} />
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                            <div className="mb-3">
                                                                                <Label className="form-label" htmlFor="gen-info-password-input">Password</Label>
                                                                                <Input type="password" className="form-control" id="gen-info-password-input" name="password" placeholder="Enter Password" onChange={handleChange} value={formData.password} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-start gap-3 mt-4">
                                                                            <button type="button" className="btn btn-success btn-label right ms-auto nexttab nexttab" onClick={() => { toggleTab(activeTab + 1, 66); }}>
                                                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> Go to more info
                                                                            </button>
                                                                        </div>
                                                                    </TabPane>

                                                                    <TabPane tabId={2}>
                                                                        <div>
                                                                            <div className="text-center">
                                                                                <div className="profile-user position-relative d-inline-block mx-auto mb-2">
                                                                                    <img src={logoLight} className="rounded-circle avatar-lg img-thumbnail user-profile-image" alt="" />
                                                                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                                                                        <Input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                                                                        <Label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                                                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                                                                <i className="ri-camera-fill"></i>
                                                                                            </span>
                                                                                        </Label>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="fs-13 mb-3">Create your Profile</h5>
                                                                            </div>

                                                                            <Row>
                                                                                <Col lg={12}>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label" htmlFor="basicpill-lastname-input1">Address</Label>
                                                                                        <Input type="text" className="form-control" id="basicpill-address-input1" name="address" placeholder="Enter Address" onChange={handleChange} value={formData.address} />
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col lg={6}>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label" htmlFor="basicpill-phoneno-input1">Phone</Label>
                                                                                        <Input type="text" className="form-control" id="basicpill-phoneno-input1" name="phone" placeholder="Enter Phone No" onChange={handleChange} value={formData.phone} />
                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg={6}>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label" htmlFor="basicpill-country-input1">Country</Label>
                                                                                        <Input type="text" className="form-control" id="basicpill-country-input1" name="country" placeholder="Enter Country" onChange={handleChange} value={formData.country} />
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                        <div className="d-flex align-items-start gap-3 mt-4">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-link text-decoration-none btn-label previestab"
                                                                                onClick={() => {
                                                                                    toggleTab(activeTab - 1, 0);
                                                                                }}
                                                                            >
                                                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                                                Back to General
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-success btn-label right ms-auto nexttab nexttab"
                                                                                onClick={() => {
                                                                                    toggleTab(activeTab + 1, 100);
                                                                                }}
                                                                            >
                                                                                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </TabPane>

                                                                    <TabPane tabId={3}>
                                                                        <div>
                                                                            <div className="text-center">
                                                                                <div className="mb-4">
                                                                                    <lord-icon
                                                                                        src="https://cdn.lordicon.com/lupuorrc.json"
                                                                                        trigger="loop"
                                                                                        colors="primary:#0ab39c,secondary:#405189"
                                                                                        style={{ width: "120px", height: "120px" }}
                                                                                    ></lord-icon>
                                                                                </div>
                                                                                <h5>Well Done!</h5>
                                                                                <p className="text-muted">
                                                                                    You have Successfully Signed Up
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </TabPane>
                                                                </TabContent>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Form>
                                        </div>
                                        {error && (
                                            <Alert color="danger" style={{ marginTop: "13px" }}>
                                                <div>{error}</div>
                                            </Alert>
                                        )}
                                        {success && (
                                            <Alert color="success" style={{ marginTop: "13px" }}>
                                                <div>Register User Successfully and Your Redirect To Login Page...</div>
                                            </Alert>
                                        )}
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account? <Link to="/login" className="fw-semibold text-primary text-decoration-underline">Signin</Link></p>
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

