import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import classnames from "classnames";
import { useMemo } from "react";
import TableComponent from "../Components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsByStatus,
} from "../../../slices/product/thunk";
const Products = () => {
  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const allProductsData = useSelector((state) => state.Products.productState);

  const dispatch = useDispatch();

  const fetchAllProducts = () => {
    dispatch(getAllProducts());
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setProductList(allProductsData);
  }, [allProductsData]);

  const fetchAllProductsByStatus = (slug) => {
    dispatch(getProductsByStatus(slug));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        const filteredOrdersByUrl = fetchAllProductsByStatus(type);
        let filteredOrders = filteredOrdersByUrl;
        setProductList(filteredOrders);
      } else {
        const allordersData = fetchAllProducts();
        setProductList(allordersData);
      }
    }
  };

  document.title = "Listjs | GK Dukaan - Ghar Ki Dukaan";

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to="/apps-ecommerce-product-details"
            className="fw-medium link-primary"
          >
            {cell.getValue().substring(1, 20)}...
          </Link>
        ),
      },

      {
        header: "MRP",
        accessorKey: "mrp",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Sale Price",
        accessorKey: "sale_price",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },

      {
        header: "Date Published",
        accessorKey: "datePublished",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {new Date(cell.getValue()).toLocaleDateString()},
            <small className="text-muted">
              {" "}
              {new Date(cell.getValue()).toLocaleTimeString()}
            </small>
          </>
        ),
      },
      {
        header: "Action",
        cell: (cellProps) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Link
                to={`/products/${cellProps.row.original._id}`}
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link
                to="#"
                className="text-primary d-inline-block edit-item-btn"
                onClick={() => {
                  const productData = cellProps.row.original;
                  handleProductClick(productData);
                }}
              >
                <i className="ri-pencil-fill fs-16"></i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#" className="link-danger fs-15">
                <i
                  onClick={() => {
                    handleDelete(category?.value);
                  }}
                  className="ri-delete-bin-line"
                ></i>
              </Link>
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Catelog Products</h4>
                </CardHeader>

                <CardBody>
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
                        All Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "pending_review");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Pending Review
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "approved");
                        }}
                        href="#"
                      >
                        <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                        Approved{" "}
                        <span className="badge bg-danger align-middle ms-1">
                          2
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
                          toggleTab("4", "rejected");
                        }}
                        href="#"
                      >
                        <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                        Rejected
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "5" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("5", "paused");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Paused
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "6" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("6", "hidden");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Hidden
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableComponent
                    data={productList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    columns={columns}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
                    // isProductsFilter={true}
                    SearchPlaceholder="Search ..."
                    // name="Add Catalog"
                    // buttonLink="/catalogs/add-catalog"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Products;
