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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import { cancelOrder, getAllOrders, readyToShip } from "../../../slices/thunks";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetOrdersState,
  resetStatus,
  resetStatusData,
  setPageOrder,
  setStatusOrder,
} from "../../../slices/orders/reducer";

const Orders = ({ header = true, customerId = "", isGlobalFilter = true }) => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [orderList, setOrderList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [checkedOrders, setCheckedOrders] = useState([]);

  const dispatch = useDispatch();

  const OrderRes = useSelector((state) => state.Orders.orderState);
  const CancelRes = useSelector((state) => state.Orders.cancelOrderData);
  const ReadyToShipRes = useSelector((state) => state.Orders.readyToShipData);
  const pageRes = useSelector((state) => state.Orders.page);
  const vendorIdRes = useSelector((state) => state.Orders.vendorId);
  const statusRes = useSelector((state) => state.Orders.status);
  const startDateRes = useSelector((state) => state.Orders.startDate);
  const endDateRes = useSelector((state) => state.Orders.endDate);
  const customerIdRes = useSelector((state) => state.Orders.customerId);
  const keywordRes = useSelector((state) => state.Orders.keyword);

  useEffect(() => {
    return () => {
      dispatch(resetOrdersState());
      dispatch(resetStatusData());
    }
  }, []);

  const fetchData = () => {
    dispatch(getAllOrders());
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      if (orderId) {
        dispatch(cancelOrder(orderId));
      }
    }
  };

  const handleReadyToShipOrder = async (orderId) => {
    let params = {
      order_id: orderId
    }
    const confirmed = window.confirm(
      "Are you sure you want to Create Shipping ?"
    );
    if (confirmed) {
      if (orderId) {
        dispatch(readyToShip(params));
      }
    }
  };

  useEffect(() => {
    const params = {
      page: pageRes,
      limit: 10,
      vendorId: vendorIdRes,
      status: statusRes,
      startDate: startDateRes,
      endDate: endDateRes,
      customerId: customerIdRes || customerId,
      keyword: keywordRes,
    };
    fetchAllOrders(params);
    dispatch(resetStatus(params));
  }, [pageRes, vendorIdRes, statusRes, endDateRes, customerIdRes, keywordRes, ReadyToShipRes?.success, CancelRes?.success]);

  useEffect(() => {
    if (OrderRes && OrderRes.success) {
      setOrderList(OrderRes.data);
    }
  }, [OrderRes]);

  const fetchAllOrders = (params) => {
    dispatch(getAllOrders(params));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        dispatch(setPageOrder(1));
        dispatch(setStatusOrder(type));
      } else {
        dispatch(setPageOrder(1));
        dispatch(setStatusOrder(""));
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
    let selectedData = [];
    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
        selectedData.push(ele.value);
      });
      setCheckedOrders(selectedData)
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
        setCheckedOrders([])
      });
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const checkall = document.getElementById("checkBoxAll");
    const { value, checked } = event.target;
    // if (checked && checkedOrders.length === 10) {
    //   checkall.checked = true;
    // }
    setCheckedOrders((prevCheckedOrders) => {
      if (checked) {
        if (prevCheckedOrders?.length === OrderRes.data?.length - 1) {
          checkall.checked = true;
        }
        return [...prevCheckedOrders, value];
      } else {
        checkall.checked = "";
        return prevCheckedOrders.filter((orderId) => orderId !== value);
      }
    });
  };

  // Column
  const columns = useMemo(
    () => [
      {
        header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        cell: (cell) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cell.getValue()} onChange={handleCheckboxChange} />;
        },
        id: '#',
        accessorKey: '_id',
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Order Id",
        accessorKey: "orderId",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <Link
              to={`/orders/${cell.row.original._id}`}
              className="fw-medium link-primary"
            >
              {cell.getValue()}
            </Link>
          );
        },
      },
      {
        header: "Customer",
        accessorKey: "customer",
        enableColumnFilter: false,
        cell: (cell) => {
          const { customer, customerPhone } = cell.row.original;
          return <span className="fw-medium">{customer || customerPhone}</span>;
        },
      },
      {
        header: "Product",
        accessorKey: "product",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link to={`/products/${cell.row.original.productID}`}>
            {cell.getValue().substring(0, 15)}...
          </Link>
        ),
      },
      {
        header: "Order Date",
        accessorKey: "orderDate",
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
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
      },
      {
        header: "Payment Method",
        accessorKey: "payment",
        enableColumnFilter: false,
      },
      {
        header: "Delivery Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "pending":
              return (
                <span className="badge text-uppercase bg-primary-subtle text-primary">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "processing":
              return (
                <span className="badge text-uppercase bg-info-subtle text-info">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "cancelled":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "shipped":
              return (
                <span className="badge text-uppercase bg-secondary-subtle text-secondary">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "readyToShip":
              return (
                <span className="badge text-uppercase bg-info-subtle text-info">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "returned":
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.getValue()}{" "}
                </span>
              );
            case "delivered":
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
              <UncontrolledDropdown>
                <DropdownToggle
                  href="#"
                  className="btn btn-soft-secondary btn-sm"
                  tag="button"
                >
                  <i className="ri-more-fill" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem
                    tag={Link}
                    to={`/orders/${cellProps.row.original._id}`}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleCancelOrder(cellProps.row.original._id)
                    }
                  >
                    Cancel Order
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleReadyToShipOrder(cellProps.row.original._id)
                    }
                  >
                    Ready to Ship
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* <li className="list-inline-item">
                <Link
                  to={`/orders/${cellProps.row.original._id}`}
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li> */}
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
  const uncheckAllCheckboxes = () => {
    setCheckedOrders([]);
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");
    checkall.checked = false; // Ensure it is false, not an empty string
    ele.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleBulkReadyToShip = async () => {
    let params = {
      order_ids: checkedOrders
    }
    const confirmed = window.confirm(
      "Are you sure you want to Create Shipping for selected orders?"
    );
    if (confirmed) {
      dispatch(readyToShip(params));
    }
  };

  document.title = "Orders | GK Dukaan - Vendor";

  return (
    <div className={header ? "page-content" : ""}>
      <Container fluid>
        {header && <BreadCrumb title="Orders" pageTitle="Ecommerce" />}
        <Row>
          <Col lg={12}>
            <Card id="orderList">
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
                          uncheckAllCheckboxes();
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        All Orders
                        {/* <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.total}
                        </span> */}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "8" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("8", "processing");
                        }}
                        href="#"
                      >
                        <i className="ri-file-list-line me-1 align-bottom"></i>{" "}
                        Processing
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.processing}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("3", "readyToShip");
                        }}
                        href="#"
                      >
                        <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                        Pickups{" "}
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.readyToShip}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "7" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("7", "shipped");
                        }}
                        href="#"
                      >
                        <i className="ri-ship-line me-1 align-bottom"></i>{" "}
                        Shipped
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.shipped}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("2", "delivered");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Delivered
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.delivered}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "5" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("5", "cancelled");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Cancelled
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.cancelled}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("4", "returned");
                        }}
                        href="#"
                      >
                        <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                        Returns
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.returned}
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "6" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          uncheckAllCheckboxes();
                          toggleTab("6", "pending");
                        }}
                        href="#"
                      >
                        <i className="ri-time-line me-1 align-bottom"></i>{" "}
                        Pending
                        <span className="badge bg-danger align-middle ms-1">
                          {OrderRes?.statusCounts?.pending}
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <div className="d-flex justify-content-end mt-2" style={{ right: 5 }}>{
                    checkedOrders?.length > 0 && (
                      <button
                        className="btn btn-primary"
                        onClick={handleBulkReadyToShip}
                      >
                        ReadyToShip
                      </button>
                    )}
                  </div>

                  <TableContainer
                    columns={columns}
                    data={orderList || []}
                    isGlobalFilter={isGlobalFilter}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle"
                    theadClass="table-light text-muted"
                    handleOrderClick={handleOrderClicks}
                    isOrderFilter={true}
                    pageRes={pageRes}
                    total={OrderRes?.total}
                    SearchPlaceholder="Search for order ID, customer, product name or something..."
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

export default Orders;
