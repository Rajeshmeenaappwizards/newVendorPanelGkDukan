import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addAttributesData } from "../../../slices/thunks";
import InputImageComp from "../Components/InputImageComp";
import {
  getVendorPaymentData,
  postVendorPaymentData,
} from "../../../slices/vendorPayment/thunk";
import { ToastContainer, toast } from "react-toastify";

function VendorPaymentModal({ show, tog_grid, data, fetchAllVendorPayments }) {
  const dispatch = useDispatch();
  const [transactionId, setTransactionId] = useState();
  const [transactionInfo, setTransactionInfo] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [id, setId] = useState();
  const [uploadedId, setUploadedId] = useState(null);
  const [status, setStatus] = useState();

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  const getPaymentRes = useSelector(
    (state) => state.VendorPaymentSlice.postVendorPaymentState
  );

  useEffect(() => {
    setStatus(data?.status);
    setTransactionId(data?.transactionId);
    setTransactionInfo(data?.transactionInfo);
    setId(data?._id);
  }, [data]);

  const handleSubmit = async () => {
    const postData = {
      id: id,
      media_id: uploadedId,
      transactionId: transactionId,
      transactionInfo: transactionInfo,
      payment_initiated_date: new Date(),
      status: selectedStatus,
    };
    dispatch(postVendorPaymentData(postData));
    if (getPaymentRes && getPaymentRes.success) {
      bottomrightnotify(getPaymentRes.message);
      tog_grid(false);
      fetchAllVendorPayments();
    }
  };

  const handleFileUpload = (fileId) => {
    setUploadedId(fileId);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        isOpen={show}
        toggle={() => {
          tog_grid();
        }}
      >
        <ModalHeader
          className="modal-title"
          toggle={() => {
            tog_grid();
          }}
        >
          {data?.vendorName}
        </ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <Col xxl={6}>
              <div>
                <label htmlFor="title" className="form-label">
                  Amount
                </label>
                <Input
                  type="text"
                  disabled
                  className="form-control"
                  value={data?.amount}
                />
              </div>
            </Col>
            <Col xxl={6}>
              <div>
                <label htmlFor="title" className="form-label">
                  Transaction Id
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="placeholderInput"
                  placeholder="Add Transaction Id"
                  name="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
            </Col>
            <Col xxl={6}>
              <div>
                <label htmlFor="addValues" className="form-label">
                  Image
                </label>
                <InputImageComp onFileUpload={handleFileUpload} />
                {data?.mediaUrl && (
                  <img
                    src={data?.mediaUrl}
                    className="img-thumbnail"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                    alt="img"
                  />
                )}
              </div>
            </Col>
            <Col xxl={6}>
              <div>
                <label htmlFor="addValues" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e)}
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </Col>
            <Col xxl={12}>
              <div>
                <label htmlFor="title" className="form-label">
                  Transaction Information
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="placeholderInput"
                  placeholder="Add Transaction Information"
                  name="transactionInfo"
                  value={transactionInfo}
                  onChange={(e) => setTransactionInfo(e.target.value)}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => tog_grid(false)}>
                  Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </div>
            </Col>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default VendorPaymentModal;
