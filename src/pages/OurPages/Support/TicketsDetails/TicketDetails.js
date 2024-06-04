import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";

import avatar4 from "../../../../assets/images/users/avatar-4.jpg";
import avatar10 from "../../../../assets/images/users/avatar-10.jpg";
import avatar3 from "../../../../assets/images/users/avatar-3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { statusUpdateSupportTicket } from "../../../../slices/thunks";
import { FormatedDate } from "../../../../helpers/date_helper";

const TicketDetails = (props) => {
  const dispatch = useDispatch();
  const ticketId = useParams()._id;
  const [updateSupportTicket, setUpdateSupportTicket] = useState({});

  const updatedSupportTicket = useSelector(
    (state) => state.SupportTicket.statusUpdateSupportTicketState
  );

  const fetchData = async (data) => {
    const response = await dispatch(statusUpdateSupportTicket(data));
  };

  useEffect(() => {
    if (updatedSupportTicket) {
      setUpdateSupportTicket(updatedSupportTicket);
    }
  }, [updatedSupportTicket]);

  const handleUpdateStatus = (e) => {
    const status = e.target.value;
    const message =
      status === "closed"
        ? "Are You Sure You Want To Close?"
        : "Are You Sure You Want To Open?";

    if (window.confirm(message)) {
      const data = {
        status: status,
        id: ticketId,
      };
      fetchData(data);
    } else {
      if (status === "closed") {
        e.target.value = "open";
      } else {
        e.target.value = "closed";
      }
    }
  };
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardHeader>
            <h5 className="card-title mb-0">Ticket Details</h5>
          </CardHeader>
          <CardBody>
            <ul className="list-unstyled vstack gap-2 fs-13 mb-">
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">Ticket Id :</p>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0"> {props?.singleTicketDetails?._id}</h6>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">Status:</p>
                  </div>
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      id="t-status"
                      data-choices
                      data-choices-search-false
                      aria-label="Default select example"
                      onChange={(e) => {
                        handleUpdateStatus(e);
                      }}
                    >
                      <option
                        selected={
                          props?.singleTicketDetails?.status === "closed"
                            ? true
                            : false
                        }
                        value="closed"
                      >
                        Closed
                      </option>
                      <option
                        selected={
                          props?.singleTicketDetails?.status === "open"
                            ? true
                            : false
                        }
                        value="open"
                      >
                        Open
                      </option>
                    </select>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">Create Date :</p>
                  </div>
                  <div className="flex-grow-1">
                    {FormatedDate(props?.singleTicketDetails?.createdAt)}
                  </div>
                </div>
              </li>
            </ul>

            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">Last Activity :</p>
                  </div>
                  <div className="flex-grow-1">
                    {FormatedDate(props?.singleTicketDetails?.updatedAt)}
                  </div>
                </div>
              </li>
            </ul>
            <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">Related Topic :</p>
                  </div>
                  <div className="flex-grow-1">
                    {props?.singleTicketDetails?.order_id && (
                      <span className="badge bg-primary-subtle text-primary">
                        Order
                      </span>
                    )}
                    {props?.singleTicketDetails?.product_id && (
                      <span className="badge bg-primary-subtle text-primary">
                        Product
                      </span>
                    )}
                    {props?.singleTicketDetails?.catalog_id && (
                      <span className="badge bg-primary-subtle text-primary">
                        Catalog
                      </span>
                    )}
                    {props?.singleTicketDetails?.payment_id && (
                      <span className="badge bg-primary-subtle text-primary">
                        Payment
                      </span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex flex-wrap align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0 me-2">
                      {props?.singleTicketDetails?.order_id && <>Order Id</>}
                      {props?.singleTicketDetails?.product_id && (
                        <>Product Id</>
                      )}
                      {props?.singleTicketDetails?.catalog_id && (
                        <>Catalog Id</>
                      )}
                      {props?.singleTicketDetails?.payment_id && (
                        <>Payment Id</>
                      )}
                    </p>
                  </div>
                  <div className="flex-grow-1">
                    {props?.singleTicketDetails?.order_id && (
                      <Link
                        to={`/orders/${props?.singleTicketDetails?.order_id}`}
                      >
                        <span className="badge bg-primary-subtle text-primary">
                          {props?.singleTicketDetails?.order_id}
                        </span>
                      </Link>
                    )}
                    <Link
                      to={`/products/${props?.singleTicketDetails?.product_id}`}
                    >
                      {props?.singleTicketDetails?.product_id && (
                        <span className="badge bg-primary-subtle text-primary">
                          {props?.singleTicketDetails?.product_id}
                        </span>
                      )}
                    </Link>
                    <Link
                      to={`/catalogs/details/${props?.singleTicketDetails?.catalog_id}`}
                    >
                      {props?.singleTicketDetails?.catalog_id && (
                        <span className="badge bg-primary-subtle text-primary">
                          {props?.singleTicketDetails?.catalog_id}
                        </span>
                      )}
                    </Link>
                    <Link to={`/vendorPayments`}>
                      {props?.singleTicketDetails?.payment_id && (
                        <span className="badge bg-primary-subtle text-primary">
                          {props?.singleTicketDetails?.payment_id}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h6 className="card-title fw-semibold mb-0">Files Attachment</h6>
          </CardHeader>
          <CardBody>
            {props.singleTicketDetails.mediaUrls &&
            props.singleTicketDetails.mediaUrls.length > 0 ? (
              props.singleTicketDetails.mediaUrls.map((url) => {
                const fileName =
                  typeof url === "string"
                    ? url.substring(url.lastIndexOf("/") + 1)
                    : "";
                return (
                  <div
                    key={url}
                    className="d-flex align-items-center border border-dashed p-2 rounded"
                  >
                    <div className="flex-shrink-0 avatar-sm">
                      <div className="avatar-title bg-light rounded">
                        <i className="ri-file-zip-line fs-20 text-primary"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">{fileName.substring(0, 10)}</h6>
                    </div>
                    <div className="hstack gap-3 fs-16">
                      <a href={url} target="_blank" className="text-muted">
                        <i className="ri-download-2-line"></i>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No media attached</div>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TicketDetails;
