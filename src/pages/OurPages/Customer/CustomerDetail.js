import React, { useEffect, useState, useMemo } from "react";

import { CardBody, Container, Row, Card, CardHeader } from "reactstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

//Import actions
import {
  getSingleCustomer,
  getProducts as onGetProducts,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Orders from "../Orders";

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

const CustomerDetail = () => {
  const [months, setMonths] = useState(12);
  const [productList, setProductList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const dispatch = useDispatch();

  const params = useParams();

  const CustomerDetailsRes = useSelector(
    (state) => state.Customers.singleCustomer.data
  );

  useEffect(() => {
    if (CustomerDetailsRes) {
      setCustomerDetails(CustomerDetailsRes);
    }
  }, [CustomerDetailsRes]);

  // const revenueDataRes = useSelector(
  //   (state) => state.VendorPaymentSlice.getVendorRevenueChartRes
  // );
  // const allProductsData = useSelector((state) => state.Products.productState);

  // useEffect(() => {
  //   if (params && params._id) {
  //     fetchVendorDetails(params._id);
  //   }
  //   return () => dispatch(resetGetVendorDetailsByIdData());
  // }, [params]);

  // useEffect(() => {
  //   if (params && params._id && CustomerDetailsRes.success) {
  //     let param = {
  //       customer_id: params._id,
  //       months: months,
  //     };
  //     dispatch(getVendorRevenueChartData(param));
  //   }
  // }, [CustomerDetailsRes, months]);

  const fetchSingleCustomerDetails = (id) => {
    dispatch(getSingleCustomer(id));
  };

  useEffect(() => {
    fetchSingleCustomerDetails(params._id);
  }, [dispatch]);

  // useEffect(() => {
  //   setProductList(allProductsData);
  // }, [allProductsData]);

  // const fetchAllProducts = () => {
  //   dispatch(getAllProducts());
  // };

  // const totalReviews = CustomerDetailsRes?.data?.reviewSummary.reduce(
  //   (acc, review) => acc + review.count,
  //   0
  // );

  const onChangeChartPeriod = (number) => {
    setMonths(number);
  };
  document.title =
    "Sellers Details | GK Dukaan - Vendor";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Customer Details" pageTitle="Customer" />
          <Row>
            <div className="col-xxl-3">
              <Card>
                <CardBody className="p-4">
                  <div>
                    <div className="table-responsive">
                      <Card>
                        <CardHeader className="d-flex flex-column  align-items-start justify-content- ">
                          <h5 className="card-title mb-2">
                            <i className="ri-file-info-line align-middle me-1 text-muted"></i>
                            Customer Details
                          </h5>

                          <p
                            className={`mb-0 fs-10 text-uppercase p-1 border 
    ${
      customerDetails?.customer?.status === "verified"
        ? "bg-success-subtle text-success"
        : customerDetails?.customer?.status === "unverified"
        ? "bg-danger-subtle text-danger"
        : "bg-warning-subtle text-warning"
    }`}
                          >
                            {customerDetails?.customer?.status}
                          </p>
                        </CardHeader>
                        <CardBody>
                          <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                            <li>
                              <div className="d-flex flex-wrap align-items-center mb-2">
                                <div className="flex-shrink-0">
                                  <p className="text-muted mb-0 me-2">
                                    Customer Id :
                                  </p>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">
                                    {customerDetails?.customer?._id}
                                  </h6>
                                </div>
                              </div>
                            </li>
                            {customerDetails?.customer?.first_name ? (
                              <li>
                                <div className="d-flex flex-wrap align-items-center mb-2">
                                  <div className="flex-shrink-0">
                                    <p className="text-muted mb-0 me-2">
                                      First Name :
                                    </p>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">
                                      {customerDetails?.customer?.first_name}
                                    </h6>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              ""
                            )}

                            {customerDetails?.customer?.last_name ? (
                              <li>
                                <div className="d-flex flex-wrap align-items-center mb-2">
                                  <div className="flex-shrink-0">
                                    <p className="text-muted mb-0 me-2">
                                      Last Name :
                                    </p>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">
                                      {customerDetails?.customer?.last_name}
                                    </h6>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              ""
                            )}

                            {customerDetails?.customer?.email ? (
                              <li>
                                <i className=" ri-mail-line me-2 align-middle text-muted fs-16"></i>
                                <Link>{customerDetails?.customer?.email}</Link>
                              </li>
                            ) : (
                              ""
                            )}
                            <li>
                              <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                              {customerDetails?.customer?.phoneNumber}
                            </li>

                            <li>
                              <div className="d-flex flex-wrap align-items-center mb-2">
                                <div className="flex-shrink-0">
                                  <p className="text-muted mb-0 me-2">
                                    Created Date :
                                  </p>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">
                                    {new Date(
                                      customerDetails?.customer?.createdAt
                                    ).toLocaleString()}
                                  </h6>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="d-flex flex-wrap align-items-center mb-2">
                                <div className="flex-shrink-0">
                                  <p className="text-muted mb-0 me-2">
                                    Updated Date :
                                  </p>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">
                                    {new Date(
                                      customerDetails?.customer?.updatedAt
                                    ).toLocaleString()}
                                  </h6>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </CardBody>
                {customerDetails?.addresses?.map((item, index) => {
                  return (
                    <Card key={item._id}>
                      <CardBody className="p-4">
                        <div>
                          <div className="table-responsive">
                            <Card>
                              <CardHeader>
                                <h5 className="card-title mb-0">
                                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                                  Customer Address
                                </h5>
                              </CardHeader>
                              <CardBody>
                                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                                  <li>
                                    <div className="d-flex flex-wrap align-items-center mb-2">
                                      <div className="flex-shrink-0">
                                        <p className="text-muted mb-0 me-2">
                                          Address Line 1 :
                                        </p>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className="mb-0">
                                          {item?.address_line_1}
                                        </h6>
                                      </div>
                                    </div>
                                  </li>
                                  {item.address_line ? (
                                    <li>
                                      <div className="d-flex flex-wrap align-items-center mb-2">
                                        <div className="flex-shrink-0">
                                          <p className="text-muted mb-0 me-2">
                                            Address Line 2 :
                                          </p>
                                        </div>
                                        <div className="flex-grow-1">
                                          <h6 className="mb-0">
                                            {item?.address_line_2}
                                          </h6>
                                        </div>
                                      </div>
                                    </li>
                                  ) : (
                                    ""
                                  )}

                                  <li>
                                    <div className="d-flex flex-wrap align-items-center mb-2">
                                      <div className="flex-shrink-0">
                                        <p className="text-muted mb-0 me-2">
                                          City :
                                        </p>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className="mb-0">{item?.city}</h6>
                                      </div>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="d-flex flex-wrap align-items-center mb-2">
                                      <div className="flex-shrink-0">
                                        <p className="text-muted mb-0 me-2">
                                          State :
                                        </p>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className="mb-0">{item?.state}</h6>
                                      </div>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="d-flex flex-wrap align-items-center mb-2">
                                      <div className="flex-shrink-0">
                                        <p className="text-muted mb-0 me-2">
                                          Pincode :
                                        </p>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className="mb-0">
                                          {item?.pin_code}
                                        </h6>
                                      </div>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="d-flex flex-wrap align-items-center mb-2">
                                      <div className="flex-shrink-0">
                                        <p className="text-muted mb-0 me-2">
                                          Country :
                                        </p>
                                      </div>
                                      <div className="flex-grow-1">
                                        <h6 className="mb-0">
                                          {item?.country}
                                        </h6>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </Card>
            </div>

            <div className="col-xxl-9">
              <Orders
                header={false}
                customerId={params._id}
                isGlobalFilter={false}
              />
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomerDetail;
