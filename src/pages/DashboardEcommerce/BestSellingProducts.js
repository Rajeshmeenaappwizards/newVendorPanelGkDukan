import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { getBestSellingProductData } from "../../slices/thunks";
import { useSelector } from "react-redux";

const BestSellingProducts = () => {
  const [sortOption, setSortOption] = useState({
    lable: "Last 30 Days",
    value: "last_30_days",
  });
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const bestSellingProductsRes = useSelector(
    (state) => state.DashboardEcommerce.bestSellingProductData
  );

  useEffect(() => {
    let params = {
      page: page,
      dateFilter: sortOption.value,
    };
    fetchBestSellingProducts(params, sortOption.lable);
  }, [page]);

  const fetchBestSellingProducts = (data, lable) => {
    let datas = {
      value: data.dateFilter,
      lable: lable,
    };

    setSortOption(datas);
    dispatch(getBestSellingProductData(data));
  };

  return (
    <React.Fragment>
      <Col xl={6}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              Best Selling Products
            </h4>
            <div className="flex-shrink-0">
              <UncontrolledDropdown className="card-header-dropdown">
                <DropdownToggle tag="a" className="text-reset" role="button">
                  <span className="fw-semibold text-uppercase fs-12">
                    Choose Date:{" "}
                  </span>
                  <span className="text-muted">
                    {sortOption.lable}
                    <i className="mdi mdi-chevron-down ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "today", page: page },
                        "Today"
                      )
                    }
                  >
                    Today
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "yesterday", page: page },
                        "Yesterday"
                      )
                    }
                  >
                    Yesterday
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "last_7_days", page: page },
                        "Last 7 Days"
                      )
                    }
                  >
                    Last 7 Days
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "last_30_days", page: page },
                        "Last 30 Days"
                      )
                    }
                  >
                    Last 30 Days
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "last_60_days", page: page },
                        "Last 60 Days"
                      )
                    }
                  >
                    Last 60 Days
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      fetchBestSellingProducts(
                        { dateFilter: "last_90_days", page: page },
                        "Last 90 Days"
                      )
                    }
                  >
                    Last 90 Days
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                <tbody>
                  {bestSellingProductsRes &&
                    bestSellingProductsRes.success &&
                    bestSellingProductsRes.data &&
                    bestSellingProductsRes.data.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm bg-light rounded p-1 me-2">
                              <img
                                src={item.img}
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                            <div>
                              <h5 className="fs-14 my-1">
                                <Link
                                  to={`/products/${item._id}`}
                                  className="text-reset"
                                >
                                  {item.label.substring(0, 12)}..
                                </Link>
                              </h5>
                              <span className="text-muted">{item.date}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            ₹{item?.price?.toFixed(2)}
                          </h5>
                          <span className="text-muted">Price</span>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item.orders}
                          </h5>
                          <span className="text-muted">Orders</span>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            {item.stock ? (
                              item.stock
                            ) : (
                              <span className="badge bg-danger-subtle  text-danger">
                                Out of stock
                              </span>
                            )}{" "}
                          </h5>
                          <span className="text-muted">Stock</span>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">
                            ₹{item?.price}
                          </h5>
                          <span className="text-muted">Amount</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
              <div className="col-sm">
                <div className="text-muted">
                  Showing <span className="fw-semibold">5</span> of{" "}
                  <span className="fw-semibold">15</span> Results
                </div>
              </div>
              <div className="col-sm-auto mt-3 mt-sm-0">
                <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                  <li className={`page-item ${page === 1 && "disabled"}`}>
                    <button
                      onClick={() => setPage((pre) => pre - 1)}
                      to="#"
                      className="page-link"
                    >
                      ←
                    </button>
                  </li>
                  <li className={`page-item ${page === 1 && "active"}`}>
                    <button
                      onClick={() => setPage(1)}
                      to="#"
                      className="page-link"
                    >
                      1
                    </button>
                  </li>
                  <li className={`page-item ${page === 2 && "active"}`}>
                    <button
                      onClick={() => setPage(2)}
                      to="#"
                      className="page-link"
                    >
                      2
                    </button>
                  </li>
                  <li className={`page-item ${page === 3 && "active"}`}>
                    <button
                      onClick={() => setPage(3)}
                      to="#"
                      className="page-link"
                    >
                      3
                    </button>
                  </li>
                  <li className={`page-item ${page === 3 && "disabled"}`}>
                    <button
                      onClick={() => setPage((pre) => pre + 1)}
                      to="#"
                      className="page-link"
                    >
                      →
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default BestSellingProducts;
