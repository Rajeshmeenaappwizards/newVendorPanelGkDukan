import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Row,
  Card,
  Col,
  CardHeader,
  Button,
} from "reactstrap";
import classnames from "classnames";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

//Import actions
import {
  getProducts as onGetProducts,
  deleteProducts,
  getCatalogs,
  getTaxSlabs,
  getCatalogsByStatus,
} from "../../../slices/thunks";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resetCatalogState, setPage, setStatus } from "../../../slices/catalog/reducer";
import AddCatalogModal from "./AddCatalogModal";
// import { createSelector } from "reselect";
// import TableComponent from "../Components/TableComponent";

// const SingleOptions = [
//   { value: "Watches", label: "Watches" },
//   { value: "Headset", label: "Headset" },
//   { value: "Sweatshirt", label: "Sweatshirt" },
//   { value: "20% off", label: "20% off" },
//   { value: "4 star", label: "4 star" },
// ];

const Catalogs = ({ header = true, vendor_id = "" }) => {
  const dispatch = useDispatch();

  const [catalogList, setCatalogList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [addCatalogModal, setAddCatalogModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const CatalogRes = useSelector((state) => state.Catalog.catalogs);
  const pageRes = useSelector((state) => state.Catalog.page);
  const vendorIdRes = useSelector((state) => state.Catalog.vendorId);
  const statusRes = useSelector((state) => state.Catalog.status);
  const startDateRes = useSelector((state) => state.Catalog.startDate);
  const endDateRes = useSelector((state) => state.Catalog.endDate);
  const categoryIdRes = useSelector((state) => state.Catalog.categoryId);
  const keywordRes = useSelector((state) => state.Catalog.keyword);
  const AddCatalogRes = useSelector((state) => state.Catalog.AddCatalogs);

  useEffect(() => {
    return () => dispatch(resetCatalogState())
  }, [])

  useEffect(() => {
    const params = {
      page: pageRes,
      limit: 10,
      vendorId: vendorIdRes || vendor_id,
      status: statusRes,
      startDate: startDateRes,
      endDate: endDateRes,
      categoryId: categoryIdRes,
      keyword: keywordRes,
    };
    fetchgetCatalogs(params);
  }, [statusRes, pageRes, vendorIdRes, categoryIdRes, keywordRes, endDateRes, AddCatalogRes]);

  useEffect(() => {
    if (AddCatalogRes && AddCatalogRes.success) {
      successnotify(AddCatalogRes.message)
    }
  }, [AddCatalogRes]);

  useEffect(() => {
    if (CatalogRes && CatalogRes.success) {
      setCatalogList(CatalogRes.data);
    }
  }, [CatalogRes]);

  const fetchgetCatalogs = (status) => {
    dispatch(getCatalogs(status));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        dispatch(setStatus(type));
        dispatch(setPage(1));
      } else {
        dispatch(setPage(1));
        dispatch(setStatus(''));
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Catalog Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to={`/catalogs/details/${cell.row.original._id}`}
            className="fw-medium link-primary text-wrap"
          >
            {cell.getValue().length > 20 ? `${cell.getValue().substring(0, 25)}...` : cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Vendor Name",
        accessorKey: "vendorStoreName",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Products",
        accessorKey: "totalProducts",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Total Stock",
        accessorKey: "totalStock",
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
                to={`/catalogs/details/${cellProps.row.original._id}`}
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        ),
      },
    ],
    []
  );
  const columnsOne = useMemo(
    () => [
      {
        header: "Catalog Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to={`/catalogs/details/${cell.row.original._id}`}
            className="fw-medium link-primary text-wrap"
          >
            {cell.getValue().length > 20 ? `${cell.getValue().substring(0, 25)}...` : cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Products",
        accessorKey: "totalProducts",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Total Stock",
        accessorKey: "totalStock",
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
                to={`/catalogs/details/${cellProps.row.original._id}`}
                className="text-primary d-inline-block"
              >
                <i className="ri-eye-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  const toggleCatalogAddFnc = (val) => {
    setAddCatalogModal(val)
  }
  const successnotify = (message) => toast(message, { position: "top-center", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

  document.title = "Products | Gk Dukaan Admin";
  return (
    <div className={header ? "page-content" : ""}>
      <ToastContainer closeButton={false} limit={1} />
      {addCatalogModal && <AddCatalogModal data={{}} AddCatalogModal={addCatalogModal} toggleCatalogAddFnc={toggleCatalogAddFnc} />}

      <Container fluid>
        {header && <BreadCrumb title="Catalogs" pageTitle="Ecommerce" />
        }
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className=" flex-grow-1"></h4>
            <Button onClick={() => setAddCatalogModal(true)} color="primary" >
              Add Catalog
            </Button>
          </CardHeader>
        </Card>
        <Row>
          <Col>
            <div>
              <Card>
                <div className="card-body pt-0">
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
                          All Catalog
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
                            { active: activeTab === "4" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("4", "approved");
                          }}
                          href="#"
                        >
                          <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                          Approved
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "6" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("6", "rejected");
                          }}
                          href="#"
                        >
                          <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                          Rejected
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "7" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("7", "paused");
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
                            { active: activeTab === "8" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("8", "hidden");
                          }}
                          href="#"
                        >
                          <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                          Hidden
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TableContainer
                      columns={header ? columns : columnsOne}
                      data={catalogList || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle"
                      theadClass="table-light text-muted"
                      // handleOrderClick={handleOrderClicks}
                      isCatalogFilter={true}
                      SearchPlaceholder="Search for catalogs name"
                      total={CatalogRes.total}
                      header={header}
                      pageRes={pageRes}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Catalogs;
