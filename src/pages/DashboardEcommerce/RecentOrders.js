import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRecentOrderApiData } from "../../slices/thunks";

const RecentOrders = () => {
  const dispatch = useDispatch();

  const recentOrderRes = useSelector(
    (state) => state.DashboardEcommerce.recentOrderData
  );

  useEffect(() => {
    fetchRecentOrdersApi();
  }, []);

  const fetchRecentOrdersApi = () => {
    dispatch(getRecentOrderApiData());
  };

  return (
    <React.Fragment>
      <Col xl={8}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Orders</h4>
            <div className="flex-shrink-0">
              <Link to={"/orders"}>View All Orders</Link>
            </div>
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Rating</th> */}
                  </tr>
                </thead>
                <tbody>
                  {recentOrderRes &&
                    recentOrderRes.success &&
                    recentOrderRes.data &&
                    recentOrderRes.data.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <Link
                            to={`/orders/${item.orderId}`}
                            className="fw-medium link-primary"
                          >
                            #{item.orderId}
                          </Link>
                        </td>
                        <td>
                          <span className="text-success">
                            {item?.customerName || item?.customerPhone}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <img
                                src={item.img}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            </div>
                            <div className="flex-grow-1">
                              {item.product.substring(0, 12)}...
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-success">{item.amount}.00</span>
                        </td>
                        <td>{item.vendor}</td>
                        <td>
                          <span
                            className={
                              "badge " +
                              `${
                                item?.status === "pending"
                                  ? "bg-primary-subtle text-primary"
                                  : item?.status === "cancelled"
                                  ? "bg-danger-subtle text-danger"
                                  : item?.status === "shipped"
                                  ? "bg-secondary-subtle text-secondary"
                                  : item?.status === "processing"
                                  ? "bg-info-subtle text-info"
                                  : item?.status === "delivered"
                                  ? "bg-success-subtle text-success"
                                  : item?.status === "returned"
                                  ? "bg-warning-subtle text-warning"
                                  : "bg-dark-subtle text-dark"
                              }`
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* <td>
                                            <h5 className="fs-14 fw-medium mb-0">{item.rating}<span className="text-muted fs-11 ms-1">({item.votes} votes)</span></h5>
                                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RecentOrders;
