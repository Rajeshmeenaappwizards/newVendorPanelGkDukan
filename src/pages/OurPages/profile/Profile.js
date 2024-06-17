import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// actions
import {
  editProfile,
  resetProfileFlag,
  updaterofileThunk,
} from "../../../slices/thunks";
import { resetUpdatedData } from "../../../slices/auth/profile/reducer";

import { BASE_URL } from "../../../helpers/url_helper";
import InputImageComp from "../Components/InputImageComp";

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const getProfileThunkData =
    useSelector((state) => state.Profile.getProfileState.vendor) || {};

  const [userName, setUserName] = useState(
    getProfileThunkData.store_name || ""
  );
  const [email, setEmail] = useState(getProfileThunkData.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    getProfileThunkData.phoneNumber || ""
  );
  const [storeLogo, setStoreLogo] = useState(
    getProfileThunkData.store_logo || "/gklogo.png"
  );
  const [selectedFileId, setSelectedFileId] = useState(null);

  const userProfileSelector = (state) => state.Profile;
  const { user, success, error } = useSelector(userProfileSelector);

  const updateRes = useSelector((state) => state.Profile.updateProfileState);

  const bottomrightnotify = (message) =>
    toast.success(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  useEffect(() => {
    if (updateRes?.success) {
      bottomrightnotify("Profile updated successfully");
      dispatch(resetUpdatedData());
    }
  }, [updateRes?.success, dispatch]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      store_name: userName,
      email: email,
      phone_number: phoneNumber,
      store_logo: null,
    },
    validationSchema: Yup.object({
      store_name: Yup.string().required("Please Enter Your Store Name"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please Enter Your Email"),
      phone_number: Yup.string().required("Please Enter Your Phone Number"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("store_name", values.store_name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      if (selectedFileId) {
        formData.append("store_logo", selectedFileId);
      }
      dispatch(updaterofileThunk(formData));
    },
  });

  document.title = "Profile | GK Dukaan - Vendor";

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleFileChange = async (event) => {
    try {
      let authData = JSON.parse(localStorage.getItem("authUser"));

      const formData = new FormData();
      formData.append("upload", event.target.files[0]);

      const res = await fetch(`${BASE_URL}/vendor/media/single`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: authData.token,
        },
      });
      console.log("res...".res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();

      if (response && response.ok) {
        setSelectedFileId(response._id);
        setStoreLogo(URL.createObjectURL(event.target.files[0]));
        console.log("Uploaded file ID:", response._id);
      } else {
        throw new Error("Response not ok");
      }
    } catch (error) {
      console.error("File upload error:", error);
      alert("File upload failed, please try again.");
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (fileId) => {
    setSelectedFileId(fileId);
  };

  return (
    <div className="page-content mt-lg-5">
      <Container fluid>
        <Row>
          <Col lg="12">
            {error && <Alert color="danger">{error}</Alert>}
            {success && (
              <Alert color="success">Profile Updated Successfully</Alert>
            )}

            <Card>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={storeLogo}
                        alt="Profile"
                        className="avatar-md rounded-circle img-thumbnail"
                        onClick={handleLogoClick}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{userName || "Admin"}</h5>
                        <p className="mb-1">Email: {email}</p>
                        <p className="mb-1">Phone Number: {phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <div className="text-end">
                      <p className="mb-1">
                        Status:{" "}
                        <span
                          style={{
                            color:
                              getProfileThunkData.account_status === "active"
                                ? "green"
                                : "red",
                          }}
                        >
                          {getProfileThunkData.account_status}
                        </span>
                      </p>
                      <p className="mb-1">
                        Approved:{" "}
                        <span
                          style={{
                            color: getProfileThunkData.approved
                              ? "green"
                              : "red",
                          }}
                        >
                          {getProfileThunkData.approved ? "Yes" : "No"}
                        </span>
                      </p>
                      <p className="mb-1">
                        Average Rating: {getProfileThunkData.averageRating}
                      </p>
                      <p className="mb-0">
                        Total Rating: {getProfileThunkData.totalRating}
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <h4 className="card-title mb-4">Edit Profile</h4>

        <Card>
          <CardBody>
            <Form
              className="form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="form-group">
                <Label className="form-label">Store Name</Label>
                <Input
                  name="store_name"
                  className="form-control"
                  placeholder="Enter Store Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.store_name}
                  invalid={
                    validation.touched.store_name &&
                    validation.errors.store_name
                  }
                />
                {validation.touched.store_name &&
                  validation.errors.store_name && (
                    <FormFeedback type="invalid">
                      {validation.errors.store_name}
                    </FormFeedback>
                  )}
              </div>
              <div className="form-group mt-2">
                <Label className="form-label">Email</Label>
                <Input
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email}
                  invalid={validation.touched.email && validation.errors.email}
                />
                {validation.touched.email && validation.errors.email && (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                )}
              </div>
              <div className="form-group mt-2">
                <Label className="form-label">Phone Number</Label>
                <Input
                  name="phone_number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone_number}
                  invalid={
                    validation.touched.phone_number &&
                    validation.errors.phone_number
                  }
                />
                {validation.touched.phone_number &&
                  validation.errors.phone_number && (
                    <FormFeedback type="invalid">
                      {validation.errors.phone_number}
                    </FormFeedback>
                  )}
              </div>
              <div className="form-group mt-2">
                <Label className="form-label">Upload Logo</Label>
                <InputImageComp
                  autoComplete="off"
                  type="file"
                  className="form-control"
                  onFileUpload={handleFileUpload}
                />
              </div>
              <div className="text-center mt-4">
                <Button type="submit" color="danger">
                  Update Profile
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Profile;
