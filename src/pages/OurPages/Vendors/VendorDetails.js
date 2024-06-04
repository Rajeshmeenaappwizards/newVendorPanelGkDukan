import React, { useEffect, useState, useMemo } from "react";

import {
  CardBody,
  Container,
  Progress,
  Row,
  Card,
  Table,
  Button,
} from "reactstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import gklogosm from "../../../assets/images/logo-sm-1.png";
import ReviewSlider from "../../../Components/Common/ReviewSlider";
//Import actions
import {
  getAllProducts,
  getProducts as onGetProducts,
} from "../../../slices/thunks";

import Revenue from "../../DashboardEcommerce/Revenue";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createSelector } from "reselect";
import {
  changeVendorStatus,
  getVendorDetailsById,
  getVendorRevenueChartData,
} from "../../../slices/vendorPayment/thunk";
import {
  clearVendorUpdatedByIdData,
  resetGetVendorDetailsByIdData,
} from "../../../slices/vendorPayment/reducer";
import TableComponent from "../Components/TableComponent";
import Catalogs from "../Catalogs";
import DynamicSelectComponent from "../../../Components/Common/DynamicSelectComponent";
import EditForm from "./EditForm";

const colorMap = {
  1: "danger",
  2: "danger",
  3: "warning",
  4: "success",
  5: "success",
};

const labelMap = {
  1: "1 star",
  2: "2 star",
  3: "3 star",
  4: "4 star",
  5: "5 star",
};

const VendorDetails = () => {
  const [months, setMonths] = useState(12);
  const [productList, setProductList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const params = useParams();

  const VendorsDetailsRes = useSelector(
    (state) => state.VendorPaymentSlice.getVendorDetailsByIdData
  );
  // console.log(VendorsDetailsRes?.data?.accountStatus)

  const revenueDataRes = useSelector(
    (state) => state.VendorPaymentSlice.getVendorRevenueChartRes
  );
  const allProductsData = useSelector((state) => state.Products.productState);

  useEffect(() => {
    if (params && params._id) {
      fetchVendorDetails(params._id);
    }
    return () => dispatch(clearVendorUpdatedByIdData());
  }, [params]);

  useEffect(() => {
    if (VendorsDetailsRes && VendorsDetailsRes.success) {
      setSelectedStatus(VendorsDetailsRes?.data?.accountStatus);
    }
    if (params && params._id && VendorsDetailsRes.success) {
      let param = {
        vendor_id: params._id,
        months: months,
      };
      dispatch(getVendorRevenueChartData(param));
    }
  }, [VendorsDetailsRes, months]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setProductList(allProductsData);
  }, [allProductsData]);

  const fetchAllProducts = () => {
    dispatch(getAllProducts());
  };

  const fetchVendorDetails = (id) => {
    dispatch(getVendorDetailsById(id));
  };

  const totalReviews = VendorsDetailsRes?.data?.reviewSummary.reduce(
    (acc, review) => acc + review.count,
    0
  );

  const onChangeChartPeriod = (number) => {
    setMonths(number);
  };
  document.title = "Sellers Details | GK Dukaan - Ghar Ki Dukaan";

  const handleUpdateStatus = (e) => {
    const newStatus = e.target.value;
    const message =
      newStatus === "inactive"
        ? "Are You Sure You Want To inactive?"
        : "Are You Sure You Want To active?";

    if (window.confirm(message)) {
      const data = {
        vendorId: params._id,
        account_status: newStatus,
      };
      dispatch(changeVendorStatus(data));
      setSelectedStatus(newStatus);
    } else {
      setSelectedStatus(selectedStatus);
    }
  };

  const handleEdit = () => {
    setShow(!show);
  };

  return (
    <React.Fragment>
      {show && <EditForm show={show} id={params._id} />}
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Seller Details" pageTitle="Ecommerce" />
          <Row>
            <div className="col-xxl-3">
              <Card>
                <div className="position-absolute p-2">
                  <Button
                    variant="light"
                    className="edit-button "
                    title="Edit"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </div>

                <CardBody className="p-4">
                  <div>
                    <div className="flex-shrink-0 avatar-md mx-auto">
                      <div className="avatar-title bg-light rounded">
                        <img
                          src={
                            VendorsDetailsRes?.storeLogo
                              ? VendorsDetailsRes?.storeLogo
                              : gklogosm
                          }
                          alt=""
                          height="50"
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h5 className="mb-1">
                        {VendorsDetailsRes.data?.storeName}
                      </h5>
                      <p className="text-muted">
                        {VendorsDetailsRes.data?.createdAt}
                      </p>
                    </div>
                    <div className="table-responsive">
                      <Table className="table mb-0 table-borderless">
                        <tbody>
                          <tr>
                            <th>
                              <span className="fw-medium">Status</span>
                            </th>
                            <td>
                              <select
                                className="form-select"
                                id="t-status"
                                // data-choices
                                // data-choices-search-false
                                value={selectedStatus}
                                // aria-label="Default select example"
                                onChange={handleUpdateStatus}
                              >
                                <option value="inactive">Inactive</option>
                                <option value="active">Active</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Owner Name</span>
                            </th>
                            <td>
                              {VendorsDetailsRes.data?.vendorAddress?.name}
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Email</span>
                            </th>
                            <td>{VendorsDetailsRes.data?.email}</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Contact No.</span>
                            </th>
                            <td>{VendorsDetailsRes.data?.phone}</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Address</span>
                            </th>
                            <td>
                              {VendorsDetailsRes.data?.vendorAddress?.address},{" "}
                              {VendorsDetailsRes.data?.vendorAddress?.city},{" "}
                              {VendorsDetailsRes.data?.vendorAddress?.state},{" "}
                              {VendorsDetailsRes.data?.vendorAddress?.pin}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
                <CardBody className="border-top border-top-dashed p-4">
                  <div>
                    <h6 className="text-muted text-uppercase fw-semibold mb-4">
                      Customer Reviews
                    </h6>
                    <div>
                      <div>
                        <div className="bg-light px-3 py-2 rounded-2 mb-2">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <div className="fs-16 align-middle text-warning">
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-half-fill"></i>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <h6 className="mb-0">4.5 out of 5</h6>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted">
                            Total{" "}
                            <span className="fw-medium">
                              {VendorsDetailsRes.data?.vendorTotalReviews}
                            </span>{" "}
                            reviews
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        {VendorsDetailsRes.success &&
                          VendorsDetailsRes.data?.reviewSummary.map(
                            (review, index) => {
                              const percentage = totalReviews
                                ? (review.count / totalReviews) * 100
                                : 0;

                              return (
                                <Row
                                  key={index}
                                  className="align-items-center g-2"
                                >
                                  <div className="col-auto">
                                    <div className="p-1">
                                      <h6 className="mb-0">
                                        {labelMap[review.rating]}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-1">
                                      <div className="progress animated-progess progress-sm">
                                        <Progress
                                          bar
                                          color={colorMap[review.rating]}
                                          value={percentage}
                                        ></Progress>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-1">
                                      <h6 className="mb-0 text-muted">
                                        {review.count}
                                      </h6>
                                    </div>
                                  </div>
                                </Row>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardBody className="p-4 border-top border-top-dashed">
                  <h6 className="text-muted text-uppercase fw-semibold mb-4">
                    Products Reviews
                  </h6>
                  {VendorsDetailsRes.data?.latestReviews.map((item, index) => (
                    <ReviewSlider reviewData={item} key={index} />
                  ))}
                  <div className="text-center mt-3">
                    <Link to="#" className="link-primary">
                      View All Reviews{" "}
                      <i className="ri-arrow-right-line align-bottom ms-1"></i>
                    </Link>
                  </div>
                </CardBody>
                <CardBody className="p-4 border-top border-top-dashed">
                  <h6 className="text-muted text-uppercase fw-semibold mb-4">
                    Bank Details
                  </h6>
                  <div className="table-responsive">
                    <Table className="table mb-0 table-borderless">
                      <tbody>
                        <tr>
                          <th>
                            <span className="fw-medium">Bank Name</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorBankDetails
                                ?.bank_name
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">Account Number</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorBankDetails
                                ?.account_number
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">IFSC code</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorBankDetails
                                ?.ifsc_code
                            }
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardBody className="p-4 border-top border-top-dashed">
                  <h6 className="text-muted text-uppercase fw-semibold mb-4">
                    Return Address
                  </h6>
                  <div className="table-responsive">
                    <Table className="table mb-0 table-borderless">
                      <tbody>
                        <tr>
                          <th>
                            <span className="fw-medium">Address</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorReturnAddress
                                ?.return_address
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">City</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorReturnAddress
                                ?.return_city
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">State</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorReturnAddress
                                ?.return_state
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">Pincode</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorReturnAddress
                                ?.return_pin
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span className="fw-medium">Country</span>
                          </th>
                          <td>
                            {
                              VendorsDetailsRes.data?.vendorReturnAddress
                                ?.return_country
                            }
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="col-xxl-9">
              <Revenue
                handleChangeFnc={onChangeChartPeriod}
                revenueData={revenueDataRes}
              />

              <Catalogs header={false} vendor_id={params._id} />
              {/* <DynamicSelectComponent/> */}
              {/* <Card>
                <CardBody>
                  <div
                    className="table-card gridjs-border-none pb-2"
                  >
                    <TableComponent
                      data={productList || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      columns={columns}
                      customPageSize={10}
                      divClass="table-responsive mb-1"
                      tableClass="mb-0 align-middle table-borderless"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Search ..."
                    />
                  </div>
                </CardBody>
              </Card> */}
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VendorDetails;
