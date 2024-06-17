import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse,
} from "reactstrap";

import classnames from "classnames";
import { Link, useParams } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import OrderProduct from "./OrderProduct";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cancelOrder, getSingleOrder } from "../../../slices/thunks";

const OrderDetail = (props) => {
  const [col, setcol] = useState(true);
  // const [col2, setcol2] = useState(true);
  // const [col3, setcol3] = useState(true);
  const [orderData, setOrderData] = useState({});

  function togglecol() {
    setcol(!col);
  }

  // function togglecol2() {
  //   setcol2(!col2);
  // }

  // function togglecol3() {
  //   setcol3(!col3);
  // }

  const params = useParams();
  const dispatch = useDispatch();
  const getSingleOrderData = useSelector((state) => state?.Orders?.orderState);

  const fetchData = () => {
    dispatch(getSingleOrder(params?._id));
  };

  const cancelData = () => {
    dispatch(cancelOrder(params?._id));
  };

  useEffect(() => {
    if (params?._id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (getSingleOrderData) {
      setOrderData(getSingleOrderData);
    }
  }, [getSingleOrderData]);

  const handleCancelOrder = () => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want To Cancel This Order?"
    );
    if (confirmDelete) {
      if (params?._id) {
        cancelData();
      }
    }
  };

  const handlePendingOrder = () => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want To Pending This Order?"
    );
    if (confirmDelete) {
      if (params?._id) {
        // cancelData();
      }
    }
  };

  document.title = "Order Details | GK Dukaan - Vendor";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Order Details" pageTitle="Ecommerce" />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    {orderData?._id}
                  </h5>
                  <div className="flex-shrink-0">
                    {orderData?.invoiceUrl ? (
                      <a
                        href={orderData?.invoiceUrl}
                        target="_blank"
                        className="btn btn-success btn-sm"
                      >
                        <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                        Invoice
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-wrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Taxable Amount</th>
                        <th scope="col">Tax</th>
                        <th scope="col">Gross Amount</th>
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <OrderProduct product={orderData} key={orderData?._id} />
                      <tr className="border-top border-top-dashed">
                        <td colSpan="4"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">
                                  ₹{orderData?.taxableAmount}
                                </td>
                              </tr>

                              <tr>
                                <td>Estimated Tax :</td>
                                <td className="text-end">
                                  ₹{orderData?.taxPercentage}
                                </td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (INR) :</th>
                                <th className="text-end">
                                  ₹{orderData?.total}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-wrap align-items-center mb-0">
                    <div className="flex-shrink-0">
                      <p className="text-muted mb-0 me-2 fs-6">
                        Order Status :
                      </p>
                    </div>
                    <div className="flex-grow-1">
                      <h6
                        className={`mb-0 fw-bold text-uppercase p-1 border 
    ${
      orderData?.status === "pending"
        ? "bg-primary-subtle text-primary"
        : orderData?.status === "cancelled"
        ? "bg-danger-subtle text-danger"
        : orderData?.status === "shipped"
        ? "bg-secondary-subtle text-secondary"
        : orderData?.status === "processing"
        ? "bg-info-subtle text-info"
        : orderData?.status === "delivered"
        ? "bg-success-subtle text-success"
        : orderData?.status === "returned"
        ? "bg-warning-subtle text-warning"
        : "bg-dark-subtle text-dark"
    }`}
                      >
                        {orderData?.status}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <Link
                      to="#"
                      className="btn btn-soft-danger btn-sm mt-2 mt-sm-0 material-shadow-none"
                      onClick={() => {
                        handleCancelOrder();
                      }}
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>
                      Cancel Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="profile-timeline">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    {orderData?.statusHistory?.map((item, index) => (
                      <div
                        className="accordion-item border-0"
                        onClick={togglecol}
                        key={index}
                      >
                        <div>
                          <div
                            className="accordion-header"
                            id={`heading${index}`}
                          >
                            <Link
                              to="#"
                              className={classnames(
                                "accordion-button",
                                "p-2",
                                "shadow-none",
                                { collapsed: !col }
                              )}
                              href={`#collapse${index}`}
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-success rounded-circle">
                                    {item?.status === "pending" && (
                                      <i className="ri-shopping-bag-line"></i>
                                    )}
                                    {item?.status === "processing" && (
                                      <i class="ri-file-list-line"></i>
                                    )}
                                    {item?.status === "cancelled" && (
                                      <i class="ri-close-line"></i>
                                    )}
                                    {item?.status === "returned" && (
                                      <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>
                                    )}
                                    {item?.status === "delivered" && (
                                      <i className="mdi mdi-package-variant"></i>
                                    )}
                                    {item?.status === "readyToShip" && (
                                      <i className="mdi mdi-gift-outline"></i>
                                    )}
                                    {item?.status === "shipped" && (
                                      <i className="ri-truck-line"></i>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-15 mb-0 fw-semibold">
                                    {item?.status} -
                                    <span className="fw-normal">
                                      {new Date(
                                        item.timestamp
                                      ).toLocaleString()}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <Collapse
                            id={`collapse${index}`}
                            className="accordion-collapse"
                            isOpen={col}
                          >
                            {item?.status === "pending" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  The order has been placed successfully and is
                                  awaiting processing.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "processing" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  We are currently processing your order. Thank
                                  you for your patience.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "cancelled" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  The order has been cancelled. If you have any
                                  questions, please contact our support team.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "returned" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  The order has been returned. We hope to serve
                                  you again soon.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "delivered" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  The order has been delivered. We hope you
                                  enjoy your purchase!
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "readyToShip" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="mb-1">
                                  The order is ready to ship and will be on its
                                  way soon.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}

                            {item?.status === "shipped" && (
                              <div className="accordion-body ms-2 ps-5 pt-0">
                                <h6 className="fs-14">
                                  WayBill :
                                  {orderData?.shipmentInfo?.packages[0].waybill}
                                </h6>
                                <h6 className="mb-1">
                                  The order has been shipped and is on its way
                                  to you.
                                </h6>
                                <p className="text-muted">
                                  {new Date(item.timestamp).toLocaleString()}
                                </p>
                              </div>
                            )}
                          </Collapse>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3}>
            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                    Logistics Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="#"
                      className="badge bg-primary-subtle text-primary fs-11"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/uetqnvvg.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                  <h5 className="fs-16 mt-2">Delivery</h5>
                  <p className="text-muted mb-0">
                    WayBill : {orderData?.shipmentInfo?.packages[0].waybill}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Customer Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link
                      to={`/customer/${orderData?.customerID}`}
                      className="link-secondary"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  {orderData?.addressDetails?.name ? (
                    <li>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <h6 className="fs-14 mb-1">
                            {orderData?.addressDetails?.name}
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
                        <p className="text-muted mb-0 me-2">Customer Id :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{orderData?.customerID}</h6>
                      </div>
                    </div>
                  </li>

                  {orderData?.customerEmail ? (
                    <li>
                      <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                      {orderData?.customerEmail}
                    </li>
                  ) : (
                    ""
                  )}

                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    {orderData?.customerPhone}
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">
                    {orderData?.addressDetails?.name}
                  </li>
                  <li> {orderData?.addressDetails?.phone}</li>
                  <li> {orderData?.addressDetails?.address_line_1}</li>
                  <li>
                    {orderData?.addressDetails?.state} -
                    {orderData?.addressDetails?.pin_code}
                  </li>
                  <li>{orderData?.addressDetails?.country}</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                  Payment Details
                </h5>
              </CardHeader>
              <CardBody>
                {orderData?.paymentMethod === "rzp" && (
                  <>
                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Payment Method :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Razorpay (Online)</h6>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Razorpay Id :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          {orderData?.paymentDetails?.id}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Total Amount :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          ₹{orderData?.paymentDetails?.amount / 100}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Amount Due :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          ₹{orderData?.paymentDetails?.amount_due / 100}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Amount Paid :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          ₹{orderData?.paymentDetails?.amount_paid / 100}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Created At :</p>
                      </div>
                      <div className="flex-grow-1">
                        {
                          <h6 className="mb-0">
                            {moment
                              .unix(orderData?.paymentDetails?.created_at)
                              .format("MMMM Do YYYY, h:mm:ss a")}
                          </h6>
                        }
                      </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Receipt :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          {orderData?.paymentDetails?.receipt}
                        </h6>
                      </div>
                    </div>
                  </>
                )}
                {orderData?.paymentMethod === "cod" && (
                  <>
                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Payment Method :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Cash On Delivery (COD)</h6>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0 me-2">Amount :</p>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">₹{orderData?.total}</h6>
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderDetail;
