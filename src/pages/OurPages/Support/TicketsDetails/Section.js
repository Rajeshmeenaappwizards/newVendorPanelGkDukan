import React from "react";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import img from "../../../../assets/images/companies/img-4.png";

const Section = (props) => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card className="mt-n4 mx-n4 mb-n5">
          <div className="bg-warning-subtle">
            <CardBody className="pb-4 mb-5">
              <Row>
                <div className="col-md">
                  <Row className="align-items-center">
                    <div className="col-md ms-3">
                      <h4
                        className="fw-semibold text-uppercase"
                        id="ticket-title"
                      >
                        {props.singleTicketDetails.title}
                      </h4>
                      <div className="hstack gap-3 flex-wrap ">
                        <div className="text-muted">
                          <i className="ri-building-line align-bottom me-1"></i>
                          <span id="ticket-client">
                            {props?.singleTicketDetails?.vendorStoreName}
                          </span>
                        </div>
                        <div className="vr"></div>
                        <div className="text-muted">
                          Create Date :
                          <span className="fw-medium" id="create-date">
                            {(() => {
                              const date = new Date(
                                props?.singleTicketDetails?.createdAt
                              );
                              const options = {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              };
                              const formattedDate = date.toLocaleString(
                                "en-GB",
                                options
                              );
                              return formattedDate;
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
            </CardBody>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Section;
