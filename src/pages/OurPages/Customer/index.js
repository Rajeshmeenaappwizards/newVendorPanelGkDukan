import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import { getAllCustomer } from "../../../slices/thunks";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetOrdersState,
  setPageOrder,
  setStatusOrder,
} from "../../../slices/orders/reducer";
import {
  setPageCustomer,
  setStatusCustomer,
} from "../../../slices/customer/reducer";

const Customer = () => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [customerList, setCustomerList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const allCustomer = useSelector((state) => state.Customers.allCustomers);
  const pageRes = useSelector((state) => state.Customers.page);
  const statusRes = useSelector((state) => state.Customers.status);
  // const phoneNumberRes = useSelector((state) => state.Customers.phoneNumber);
  const customerIdRes = useSelector((state) => state.Customers.customerId);
  const startDateRes = useSelector((state) => state.Customers.startDate);
  const endDateRes = useSelector((state) => state.Customers.endDate);
  const keywordRes = useSelector((state) => state.Customers.keyword);

  useEffect(() => {
    return () => dispatch(resetOrdersState());
  }, []);

  useEffect(() => {
    const params = {
      page: pageRes,
      limit: 10,
      customerId: customerIdRes,
      status: statusRes,
      startDate: startDateRes,
      endDate: endDateRes,
      keyword: keywordRes,
    };
    fetchAllCustomers(params);
  }, [pageRes, statusRes, startDateRes, endDateRes, keywordRes]);

  useEffect(() => {
    if (allCustomer && allCustomer.success) {
      setCustomerList(allCustomer.data);
    }
  }, [allCustomer]);

  const fetchAllCustomers = (params) => {
    dispatch(getAllCustomer(params));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        dispatch(setPageCustomer(1));
        dispatch(setStatusCustomer(type));
      } else {
        dispatch(setPageCustomer(1));
        dispatch(setStatusCustomer(""));
      }
    }
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
      setDate(defaultdate());
    }
  }, [modal]);

  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  const handleOrderClick = useCallback(
    (arg) => {
      const order = arg;
      setOrder({
        _id: order._id,
        orderId: order.orderId,
        customer: order.customer,
        product: order.product,
        orderDate: order.orderDate,
        ordertime: order.ordertime,
        amount: order.amount,
        payment: order.payment,
        status: order.status,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Column
  const columns = useMemo(
    () => [
      {
        header: "Customer Id",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <Link
              to={`/customer/${cell.row.original._id}`}
              className="fw-medium link-primary"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <Link
              to={`/customer/${cell.row.original._id}`}
              className="fw-medium link-primary"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },

      {
        header: "Created Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {handleValidDate(cell.getValue())},
            <small className="text-muted">
              {" "}
              {handleValidTime(cell.getValue())}
            </small>
          </>
        ),
      },

      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "unverified":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );

            case "verified":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );

            default:
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
          }
        },
      },

      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to={`/customer/${cellProps.row.original._id}`}
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleOrderClick, checkedAll]
  );

  const defaultdate = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

  document.title = "Orders | GK Dukaan - Vendor";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Customer" pageTitle="Customer" />
        <Row>
          <Col lg={12}>
            <Card id="customerList">
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        All Customer
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "verified");
                        }}
                        href="#"
                      >
                        <i className="ri-verified-badge-line me-1 align-bottom"></i>{" "}
                        Verified
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("4", "unverified");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Unverified
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={customerList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle"
                    theadClass="table-light text-muted"
                    handleOrderClick={handleOrderClicks}
                    isCustomerFilter={true}
                    pageRes={pageRes}
                    total={allCustomer.total}
                    SearchPlaceholder="Search something...for customer ID , phoneNumber , name or "
                  />
                </div>
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Customer;
