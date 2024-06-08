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
import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsByStatus,
} from "../../../slices/product/thunk";
import {
  resetProductState,
  setPageProduct,
  setStatusProduct,
} from "../../../slices/product/reducer";

const Products = ({
  header = true,
  catalogId = "",
  toggleDelete,
  toggleEdit,
  toggleAdd,
}) => {
  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();

  const ProductRes = useSelector((state) => state.Products.getAllProduct);
  const pageRes = useSelector((state) => state.Products.page);
  const vendorIdRes = useSelector((state) => state.Products.vendorId);
  const statusRes = useSelector((state) => state.Products.status);
  const startDateRes = useSelector((state) => state.Products.startDate);
  const endDateRes = useSelector((state) => state.Products.endDate);
  const customerIdRes = useSelector((state) => state.Products.category);
  const keywordRes = useSelector((state) => state.Products.keyword);
  const EditedProductRes = useSelector(
    (state) => state.Catalog.editProductData
  );

  useEffect(() => {
    return () => dispatch(resetProductState());
  }, []);

  useEffect(() => {
    const params = {
      page: pageRes,
      limit: 10,
      vendorId: vendorIdRes,
      status: statusRes,
      startDate: startDateRes,
      endDate: endDateRes,
      categoryId: customerIdRes,
      keyword: keywordRes,
    };
    if (catalogId) {
      params.catalogId = catalogId;
    }
    fetchAllProducts(params);
  }, [
    pageRes,
    vendorIdRes,
    statusRes,
    endDateRes,
    customerIdRes,
    keywordRes,
    EditedProductRes,
  ]);

  useEffect(() => {
    if (ProductRes && ProductRes.success) {
      setProductList(ProductRes.data);
    }
  }, [ProductRes]);

  const fetchAllProducts = (data) => {
    dispatch(getAllProducts(data));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        dispatch(setPageProduct(1));
        dispatch(setStatusProduct(type));
      } else {
        dispatch(setPageProduct(1));
        dispatch(setStatusProduct(""));
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
            to={`/products/${cell.row.original._id}`}
            className="fw-medium link-primary"
          >
            {cell.getValue().length > 30
              ? `${cell.getValue().substring(0, 30)}...`
              : cell.getValue()}
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
        header: "Stock",
        accessorKey: "stock",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Total Orders",
        accessorKey: "totalOrders",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Status",
        accessorKey: "datePublished",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Action",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cellProps) => {
          return (
            <div className="hstack gap-3 flex-wrap">
              <Link>
                <i
                  onClick={() => toggleEdit(true, cellProps.getValue())}
                  className="ri-edit-2-line"
                ></i>
              </Link>
              <Link to="#" className="link-danger fs-15">
                <i
                  onClick={() => {
                    toggleDelete(true, cellProps.getValue());
                  }}
                  className="ri-delete-bin-line"
                ></i>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );
  const columnsOne = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          const name = cell.getValue();
          const truncatedName =
            name.length > 50 ? `${name.substring(0, 60)}...` : name;

          return (
            <Link
              to={`/products/${cell.row.original._id}`}
              className="fw-medium link-primary"
            >
              {truncatedName}
            </Link>
          );
        },
      },

      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell) => {
          const category = cell.getValue();
          const truncatedCategory =
            category.length > 30 ? `${category.substring(0, 30)}...` : category;
          return truncatedCategory;
        },
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
        header: "Stock",
        accessorKey: "stock",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Total Orders",
        accessorKey: "totalOrders",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Average Rating",
        accessorKey: "averageRating",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Review Count",
        accessorKey: "totalRating",
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
            {/* <li className="list-inline-item">
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
            </li> */}
          </ul>
        ),
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div className={header ? "page-content" : ""}>
        <Container fluid>
          {header && <BreadCrumb title="Products" pageTitle="Tables" />}{" "}
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">
                    {header ? "Products" : "Catalog Products"}
                  </h4>
                  {!header && (
                    <button
                      onClick={() => toggleAdd(true)}
                      className="btn btn-primary"
                    >
                      Add Products
                    </button>
                  )}
                </CardHeader>

                <CardBody>
                  {header && (
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
                          All Products
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
                          {/* <span className="badge bg-danger align-middle ms-1">
                          2
                        </span> */}
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
                  )}
                  <TableContainer
                    data={productList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    columns={header ? columnsOne : columns}
                    customPageSize={10}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle"
                    theadClass="table-light text-muted"
                    isProductsFilter={true}
                    SearchPlaceholder="Search ..."
                    pageRes={pageRes}
                    header={header}
                    total={ProductRes.total}
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
