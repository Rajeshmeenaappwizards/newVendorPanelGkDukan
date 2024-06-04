import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

import { useDispatch } from "react-redux";
import InputImageComp from "../Components/InputImageComp";
import { addNotice, getAllNotices } from "../../../slices/notice/thunk";
import { ToastContainer, toast } from "react-toastify";

function NoticeModal({ show, tog_grid }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [uploadedId, setUploadedId] = useState("");

  const dispatch = useDispatch();

  const handleFileUpload = (fileId) => {
    setUploadedId(fileId);
  };

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = () => {
    const data = {
      title,
      description,
      media_id: uploadedId,
      url,
    };
    dispatch(addNotice(data));
    tog_grid(false);
    setTitle("");
    setDescription("");
    setUrl("");
    setUploadedId("");
    dispatch(getAllNotices());
  };

  return (
    <>
      <div>
        <Modal
          isOpen={show}
          toggle={() => {
            tog_grid();
          }}
        >
          <ModalHeader
            toggle={() => {
              tog_grid();
            }}
          >
            Add Notice
          </ModalHeader>
          <ModalBody>
            <form action="#">
              <div className="row g-3">
                <Col xxl={12}>
                  <div>
                    <label htmlFor="textSlabTitle" className="form-label">
                      Title
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="textSlabTitle"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </Col>
                <Col xxl={12}>
                  <label htmlFor="textSlabTitle" className="form-label">
                    Description
                  </label>
                  <div>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </Col>

                <Col xxl={12}>
                  <Col xxl={6}>
                    <div>
                      <label htmlFor="addValues" className="form-label">
                        Media Upload
                      </label>
                      <InputImageComp
                        type="file"
                        className="form-control"
                        onFileUpload={handleFileUpload}
                      />
                    </div>
                  </Col>
                </Col>

                <Col xxl={12}>
                  <div>
                    <label htmlFor="textSlabTitle" className="form-label">
                      Url
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="textSlabTitle"
                      placeholder="Enter Url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </Col>

                <div className="col-lg-12">
                  <div className="hstack gap-2 justify-content-end">
                    <Button color="light" onClick={() => tog_grid()}>
                      Close
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
export default NoticeModal;
