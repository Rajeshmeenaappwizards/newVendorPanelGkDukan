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
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import { useMemo } from "react";
import TableComponent from "../Components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { getVendorPaymentData } from "../../../slices/vendorPayment/thunk";
import VendorPaymentModal from "./VendorPaymentModal";

const VendorPayments = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const vendorPaymentData = useSelector(
    (state) => state.VendorPaymentSlice.getVendorPaymentData.data
  );

  const dispatch = useDispatch();

  const fetchAllVendorPayments = () => {
    dispatch(getVendorPaymentData());
  };

  useEffect(() => {
    fetchAllVendorPayments();
  }, []);

  useEffect(() => {
    setPaymentList(vendorPaymentData);
  }, [vendorPaymentData]);

  document.title = "Vendor Payment";

  const columns = useMemo(
    () => [
      {
        header: "Vendor Name",
        accessorKey: "vendorName",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to="/apps-ecommerce-vendor-details"
            className="fw-medium link-primary"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "paid":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {cell.getValue()}
                </span>
              );
            case "unpaid":
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {cell.getValue()}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-secondary-subtle text-secondary">
                  {cell.getValue()}
                </span>
              );
          }
        },
      },
      {
        header: "Time Created",
        accessorKey: "timeCreated",
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
          <ul className="list-inline hstack mb-0">
            <li className="list-inline-item">
              <Link
                className="text-primary d-inline-block edit-item-btn"
                onClick={() => {
                  const paymentId = cellProps.row.original;
                  handlePaymentClick(paymentId);
                }}
              >
                <i className="ri-pencil-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  const handlePaymentClick = (data) => {
    setData(data);
    setShow(!show);
  };

  return (
    <React.Fragment>
      <VendorPaymentModal
        show={show}
        tog_grid={handlePaymentClick}
        data={data}
        fetchAllVendorPayments={fetchAllVendorPayments}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Vendor Payments" pageTitle="Payments" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Vendor Payments</h4>
                </CardHeader>

                <CardBody>
                  <TableComponent
                    data={paymentList || []}
                    // isGlobalFilter={true}
                    isAddUserList={false}
                    columns={columns}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    // tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
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

export default VendorPayments;
