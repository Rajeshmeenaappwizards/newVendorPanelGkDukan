import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import InputImageComp from "../../Components/InputImageComp";
import TableContainer from "../../../../Components/Common/TableContainer";
import classnames from "classnames";
import {
  deleteTicket,
  getSupportTicket,
  deleteSupportTicket,
  addSupportTicket,
} from "../../../../slices/thunks";

import { TicketsId, Title, UpdateDate, Status, Description } from "./TicketCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import {
  resetSupportState,
  setPageSupport,
  setStatusSupport,
} from "../../../../slices/supportTicket/reducer";

const TicketsData = () => {
  const dispatch = useDispatch();
  // Inside your component

  const [supportTicketList, setSupportTicketList] = useState([]);

  const [ticket, setTicket] = useState([]);

  const [mediaId, setMediaId] = useState([]);

  const [activeTab, setActiveTab] = useState("1");

  const [error, setError] = useState(false);

  // Delete Tickets
  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(false);

  const deletedRes = useSelector(
    (state) => state.SupportTicket.deleteSupportTicketState
  );
  const SupportTicketRes = useSelector(
    (state) => state.SupportTicket.allSupportTicketState
  );
  const pageRes = useSelector((state) => state.SupportTicket.page);
  const vendorIdRes = useSelector((state) => state.SupportTicket.vendorId);
  const statusRes = useSelector((state) => state.SupportTicket.status);
  const startDateRes = useSelector((state) => state.SupportTicket.startDate);
  const endDateRes = useSelector((state) => state.SupportTicket.endDate);
  const keywordRes = useSelector((state) => state.SupportTicket.keyword);

  useEffect(() => {
    return () => dispatch(resetSupportState());
  }, []);

  useEffect(() => {
    const params = {
      page: pageRes,
      limit: 10,
      vendorId: vendorIdRes,
      status: statusRes,
      startDate: startDateRes,
      endDate: endDateRes,
      keyword: keywordRes,
    };
    fetchAllSupportTicket(params);
  }, [statusRes, pageRes, vendorIdRes, keywordRes, endDateRes]);

  useEffect(() => {
    if (SupportTicketRes && SupportTicketRes.success) {
      setSupportTicketList(SupportTicketRes.data);
    }
  }, [SupportTicketRes]);

  const fetchAllSupportTicket = (data) => {
    dispatch(getSupportTicket(data));
  };

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all") {
        dispatch(setStatusSupport(type));
        dispatch(setPageSupport(1));
      } else {
        dispatch(setPageSupport(1));
        dispatch(setStatusSupport(""));
      }
    }
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTicket(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const bottomrightnotify = (message, className) =>
    toast(message, {
      position: "top-right",
      hideProgressBar: true,
      className: className,
    });

  const handleFileUpload = (fileId) => {
    setMediaId(fileId);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (ticket && ticket.title) || "",
      vendor_id: (ticket && ticket.vendor_id) || "",
      description: (ticket && ticket.description) || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Title"),
      vendor_id: Yup.string().required("Please Enter Vendor ID"),
      description: Yup.string().required("Please Enter description"),
    }),
    onSubmit: async (values) => {
      let tempOrderId = "";
      let tempCatelogId = "";
      let tempPaymentId = "";
      let tempProductId = "";
      if (validation.values.issueTopic === "Order") {
        tempOrderId = validation.values.issueTopicId;
      } else if (validation.values.issueTopic === "Catelog") {
        tempCatelogId = validation.values.issueTopicId;
      } else if (validation.values.issueTopic === "Return") {
        tempOrderId = validation.values.issueTopicId;
      } else if (validation.values.issueTopic === "Payment") {
        tempPaymentId = validation.values.issueTopicId;
      } else if (validation.values.issueTopic === "Product") {
        tempProductId = validation.values.issueTopicId;
      }
      const newTicket = {
        title: values["title"],
        vendor_id: values["vendor_id"],
        description: values["description"],
        media_ids: mediaId,
        order_id: tempOrderId ? tempOrderId : false,
        catelog_id: tempCatelogId ? tempCatelogId : false,
        payment_id: tempPaymentId ? tempPaymentId : false,
        product_id: tempProductId ? tempProductId : false,
      };
      // save new ticket
      const addedSupportTicket = await dispatch(addSupportTicket(newTicket));
      validation.resetForm();
      toggle();

      if (addedSupportTicket.payload) {
        bottomrightnotify(
          addedSupportTicket.payload.message,
          "bg-success text-white"
        );
      } else {
        bottomrightnotify("Support Ticket Not Added", "bg-danger text-white");
      }
      fetchAllSupportTicket();
    },
  });

  // Delete Data
  const onClickDelete = async (ticketId) => {
    setTicket(ticketId);
    setDeleteModal(true);
  };

  const handleDeleteTicket = async () => {
    const deleted = await dispatch(deleteSupportTicket(ticket));
    fetchAllSupportTicket();
    if (deleted.payload) {
      bottomrightnotify(deletedRes.message, "bg-success text-white");
    } else {
      bottomrightnotify("Support Ticket Not Found", "bg-danger text-white");
    }

    setDeleteModal(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          return <TicketsId {...cell} />;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Title {...cell} />;
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Description {...cell} />;
        },
      },

      {
        header: "Updated Date",
        accessorKey: "updatedAt",
        enableColumnFilter: false,
        cell: (cell) => {
          return <UpdateDate {...cell} />;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,

        cell: (cell) => {
          return <Status {...cell} />;
        },
      },

      {
        header: "Actions",
        cell: (cell) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem>
                    <Link to={`/support/${cell.row.original._id}`}>
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                      View
                    </Link>
                  </DropdownItem>
                </li>

                <li>
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                    href="#deleteOrder"
                    onClick={() => {
                      const ticketId = cell.row.original._id;
                      onClickDelete(ticketId);
                    }}
                  >
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                    Delete
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteTicket}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger add-btn"
                      onClick={() => {
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create
                      Tickets
                    </button>{" "}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
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
                    <i className="ri-store-2-fill me-1 align-bottom"></i> All
                    Tickets
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "2" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("2", "open");
                    }}
                    href="#"
                  >
                    <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                    Open
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "3" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("3", "closed");
                    }}
                    href="#"
                  >
                    <i className="ri-truck-line me-1 align-bottom"></i> Closed{" "}
                  </NavLink>
                </NavItem>
              </Nav>
              <TableContainer
                columns={columns}
                data={supportTicketList || []}
                isGlobalFilter={true}
                isAddUserList={false}
                className="custom-header-css"
                divClass="table-responsive table-card mb-3"
                tableClass="align-middle mb-0"
                isTicketsListFilter={true}
                SearchPlaceholder="Search for ticket..."
                pageRes={pageRes}
                total={SupportTicketRes.total}
              />
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
          Add Ticket
        </ModalHeader>
        <Form className="tablelist-form">
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}>
                <div id="modal-id">
                  <Label htmlFor="vendor_id" className="form-label">
                    Vendor ID
                  </Label>
                  <Input
                    name="vendor_id"
                    id="orderId"
                    className="form-control"
                    placeholder="Enter Order Id"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.vendor_id || ""}
                    invalid={
                      validation.touched.vendor_id &&
                      validation.errors.vendor_id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.vendor_id &&
                  validation.errors.vendor_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.vendor_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Enter Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="client_nameName-field" className="form-label">
                    Description
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Enter Title"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <Label htmlFor="issueTopic-field" className="form-label">
                  Issue Related To
                </Label>
                <Input
                  name="issueTopic"
                  type="select"
                  className="form-select"
                  id="issueTopic-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.issueTopic || ""}
                >
                  <option value="">Select Topic</option>
                  <option value="Order">Order</option>
                  <option value="Return">Return</option>
                  <option value="Payment">Payment</option>
                  <option value="Product">Product</option>
                  <option value="Catelog">Catelog</option>
                </Input>
                {validation.touched.issueTopic &&
                validation.errors.issueTopic ? (
                  <FormFeedback type="invalid">
                    {validation.errors.issueTopic}
                  </FormFeedback>
                ) : null}
              </Col>
              {validation.values.issueTopic ? (
                <Col lg={12}>
                  <div>
                    <Label htmlFor="issueTopicId-field" className="form-label">
                      {validation.values.issueTopic === "Return"
                        ? validation.values.issueTopic + " Order"
                        : validation.values.issueTopic}
                      ID
                    </Label>
                    <Input
                      name="issueTopicId"
                      id="issueTopicId-field"
                      className="form-control"
                      placeholder={`Enter ${
                        validation.values.issueTopic === "Return"
                          ? validation.values.issueTopic + " Order"
                          : validation.values.issueTopic
                      } ID`}
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.issueTopicId || ""}
                      invalid={
                        validation.touched.issueTopicId &&
                        validation.errors.issueTopicId
                          ? true
                          : false
                      }
                    />
                    {validation.touched.issueTopicId &&
                    validation.errors.issueTopicId ? (
                      <FormFeedback type="invalid">
                        {validation.errors.issueTopicId}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              ) : (
                ""
              )}
              <Col lg={12}>
                <div>
                  <Label htmlFor="assignedtoName-field" className="form-label">
                    Media Upload
                  </Label>
                  <InputImageComp
                    type="file"
                    className="form-control"
                    onFileUpload={handleFileUpload}
                  />
                </div>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                onClick={() => {
                  setModal(false);
                }}
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                Add Ticket
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default TicketsData;
