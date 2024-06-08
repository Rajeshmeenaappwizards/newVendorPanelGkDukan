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
import {
  getLowStockProductsApiData,
  getTopVendorsApiData,
} from "../../slices/thunks";
import { useSelector } from "react-redux";
import company2 from "../../assets/images/companies/img-2.png";

const TopSellers = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const lowStockPro = useSelector(
    (state) => state.DashboardEcommerce.lowStockData
  );

  useEffect(() => {
    let params = {
      page: page,
      limit: 5,
    };
    fetchTopVendoresApi(params);
  }, [page]);

  const fetchTopVendoresApi = (data) => {
    dispatch(getLowStockProductsApiData(data));
  };

  return (
    <React.Fragment>
      <Col xl={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Low Stock Products</h4>
            <div className="flex-shrink-0">
              {/* <Link to={"/vendors"}>View All Vendors</Link> */}
            </div>
          </CardHeader>

          <CardBody>
            <div className="table-responsive table-card">
              <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                <tbody>
                  {lowStockPro &&
                    lowStockPro.success &&
                    lowStockPro.data &&
                    lowStockPro.data.map((item, key) => (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              <img
                                src={item?.imageUrl}
                                alt=""
                                className="avatar-sm p-2"
                              />
                            </div>
                            <div>
                              <h5 className="fs-14 my-1 fw-medium">
                                <Link
                                  to="/apps-ecommerce-seller-details"
                                  className="text-reset"
                                >
                                  {item?.name}
                                </Link>
                              </h5>
                              <span className="text-muted">{item.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-muted">{item.product}</span>
                        </td>
                        <td>
                          <p className="mb-0">{item?.stock}</p>
                          <span className="text-muted">Total Products</span>
                        </td>
                        {/* <td>
                                                <p className="mb-0">₹{item.totalSales}</p>

                                                <span className="text-muted">Total Sales</span>
                                            </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
              <div className="col-sm">
                <div className="text-muted">
                  Showing <span className="fw-semibold">5</span> of{" "}
                  <span className="fw-semibold">25</span> Results
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

export default TopSellers;
