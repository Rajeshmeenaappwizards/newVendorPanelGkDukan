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

import { deleteNotice, getAllNotices } from "../../../slices/notice/thunk";

const Accordian = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const notices = useSelector((state) => state.Notice.noticeState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotices());
  }, [dispatch]);

  useEffect(() => {
    setNoticeList(notices);
  }, [notices]);

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteNotice(id));
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
                <Accordion>
                  {noticeList?.map((item, index) => (
                    <AccordionItem className="material-shadow" key={item._id}>
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
                          <i
                            className="ri-delete-bin-line me-2"
                            style={{ fontSize: "1rem", cursor: "pointer" }}
                            onClick={() => handleDelete(item._id)}
                          ></i>
                        </div>
                      </h2>
                      <Collapse
                        isOpen={activeIndex === index}
                        className="accordion-collapse"
                        id={`collapse${index}`}
                      >
                        <div className="accordion-body">{item.description}</div>
                        <div className="p-4">
                          {item.media_id && (
                            <img
                              className="rounded material-shadow"
                              alt="100x100"
                              width="100"
                              src={item.media_id.url}
                            />
                          )}
                        </div>
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

export default Accordian;
