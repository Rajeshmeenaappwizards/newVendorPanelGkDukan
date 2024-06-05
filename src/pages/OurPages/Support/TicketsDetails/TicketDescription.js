import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Label, Row } from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import userDummy from "../../../../assets/images/users/user-dummy-img.jpg";
import avatar10 from "../../../../assets/images/users/avatar-10.jpg";
import avatar6 from "../../../../assets/images/users/avatar-6.jpg";
import image4 from "../../../../assets/images/small/img-4.jpg";
import image5 from "../../../../assets/images/small/img-5.jpg";
import { Link, useParams } from "react-router-dom";
import TicketCodeExample from "./TicketsDetailsCode";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToSupportTicket } from "../../../../slices/thunks";

const TicketDescription = (props) => {
  const dispatch = useDispatch();
  const ticketId = useParams()._id;
  const [messageSupportTicket, setMessageSupportTicket] = useState({});
  const [messageTextArea, setMessageTextarea] = useState("");

  const getMessageSupportTicketData = useSelector(
    (state) => state.SupportTicket.addMessageToSupportTicketState
  );

  const addMessage = (data) => {
    dispatch(addMessageToSupportTicket(data));
  };

  const handleSubmit = () => {
    if (messageTextArea) {
      const data = {
        message: messageTextArea,
        // media_ids:,
        ticket_id: ticketId,
      };
      addMessage(data);
      setMessageTextarea("");
      props.reFetchData(ticketId);
    }
  };

  useEffect(() => {
    if (getMessageSupportTicketData) {
      setMessageSupportTicket(getMessageSupportTicketData);
    }
  }, [getMessageSupportTicketData]);
  return (
    <React.Fragment>
      <Col xxl={9}>
        <Card>
          <CardBody className="p-4">
            <p className="text fs-5">
              {props.singleTicketDetails.description}
            </p>
            {props.singleTicketDetails?.mediaUrls?.length > 0
              ? props.singleTicketDetails.mediaUrls.map((url) => {
                  const isImage = url.match(/\.(jpeg|jpg|gif|png|bmp)$/i);
                  return (
                    <div key={url} className="flex-shrink-0 mb-2">
                      {isImage ? (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={url}
                            alt=""
                            className="rounded material-shadow"
                            width="200"
                          />
                        </a>
                      ) : (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {url}
                        </a>
                      )}
                    </div>
                  );
                })
              : ""}
          </CardBody>
          <CardBody className="p-4">
            <h5 className="card-title mb-4">Messages</h5>

            <SimpleBar className="px-3 mx-n3">
              {props.singleTicketDetails?.messages?.map((message) => {
                if (message.sender) {
                  return (
                    <div
                      className={`d-flex mb-4 bg-light p-3 ${
                        message?.sender === "vendor" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={userDummy}
                          alt=""
                          className="avatar-xs rounded-circle material-shadow"
                        />
                      </div>
                      <div
                        className={`flex-grow-1 mx-3 ${
                          message?.sender === "vendor" ? "text-end" : ""
                        }`}
                      >
                        <h5 className="fs-13">
                          {message?.sender}{" "}
                          <small className="text-muted">
                            {(() => {
                              const date = new Date(message.timestamp);
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
                          </small>
                        </h5>
                        <p className="text-muted">{message.message}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </SimpleBar>
            <form action="#" className="mt-3">
              <Row className="g-3">
                <Col lg={12}>
                  <Label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Leave a Comments
                  </Label>
                  <textarea
                    className="form-control bg-light border-light"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter comments"
                    onChange={(e) => {
                      setMessageTextarea(e.target.value);
                    }}
                    value={messageTextArea}
                  ></textarea>
                </Col>
                <Col lg={12} className="text-end">
                  <Link
                    to="#"
                    className="btn btn-success"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Send Message
                  </Link>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TicketDescription;
