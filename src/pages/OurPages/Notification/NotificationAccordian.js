import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Col,
  Collapse,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteNotificationThunk,
  getAllNotification,
} from "../../../slices/notifications/thunk";

const NotificationAccordian = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [open, setOpen] = useState("1");

  const dispatch = useDispatch();

  const notificationData = useSelector(
    (state) => state.NotificationReducer.getAllNotificationState.data
    // (state) =>
    //   console.log(
    //     "notificationList",
    //     state.NotificationReducer.getAllNotificationState.data
    //   )
  );
  useEffect(() => {
    dispatch(getAllNotification());
  }, [dispatch]);

  useEffect(() => {
    setNotificationList(notificationData);
  }, [notificationData]);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDelete = (id) => {
    if (id) {
      const confirm = window.confirm("Are you sure you want to delete");
      if (confirm) {
        dispatch(deleteNotificationThunk(id));
      }
    }
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  document.title = "Accordions | GK Dukaan - Ghar Ki Dukaan";

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="live-preview">
                <Accordion open={open} toggle={toggle}>
                  {notificationList?.map((item, index) => (
                    <AccordionItem className="material-shadow" key={item?._id}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <button
                            className={classnames(
                              "accordion-button d-flex justify-content-between align-items-center",
                              {
                                collapsed: activeIndex !== index,
                              }
                            )}
                            type="button"
                            onClick={() => toggleCollapse(index)}
                            style={{ cursor: "pointer", flex: 1 }}
                          >
                            <div className="d-flex align-items-center">
                              <i
                                className="ri-notification-3-line me-2"
                                style={{ fontSize: "1rem" }}
                              ></i>
                              {item.title}
                            </div>
                          </button>
                          {/* <i
                            className="ri-delete-bin-line me-2"
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                            onClick={() => handleDelete(item?._id)}
                          ></i> */}
                        </div>
                      </h2>
                      <Collapse
                        isOpen={activeIndex === index}
                        className="accordion-collapse"
                        id={`collapse${index}`}
                      >
                        <div className="accordion-body">
                          {item?.description}
                        </div>
                        {item.media_id.map((data, index) => {
                          return (
                            <div className="p-4" key={data._id}>
                              <img
                                className="w-100 img-fluid"
                                style={{
                                  height: "300px",
                                  objectFit: "contain",
                                }}
                                src={data.url}
                              />
                            </div>
                          );
                        })}
                      </Collapse>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default NotificationAccordian;
