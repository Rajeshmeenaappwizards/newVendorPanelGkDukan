import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import CategoriesDropdown from "./CategoriesDropdown";
import { useDispatch, useSelector } from "react-redux";
import InputImageComp from "../Components/InputImageComp";
import {
  addPostCategoriesData,
  getGetCategoriesData,
  updateCategoryByIdData,
} from "../../../slices/categories/thunk";
import { ToastContainer, toast } from "react-toastify";

function CategoryModal({ show, tog_grid, name, id }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [commesion, setCommesion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  const getCategorybyId = useSelector(
    (state) => state.CategorySlice.editOneCategoriesData
  );

  const getCategoryRes = useSelector(
    (state) => state.CategorySlice
  );

  useEffect(() => {
    if (getCategorybyId && show) {
      setTitle(getCategorybyId.title || "");
      setCommesion(getCategorybyId.commesion_percentage || "");
      setDescription(getCategorybyId.description || "");
      setSelectedCategory(
        getCategorybyId.parentId ? { value: getCategorybyId.parentId } : null
      );
      setUploadedId(getCategorybyId.media_id || null);
    }
  }, [getCategorybyId, show]);

  const handleFileUpload = (fileId) => {
    setUploadedId(fileId);
  };

  const handleSubmit = () => {
    const data = {
      title,
      description: description || null,
      media_id: uploadedId,
      parentId: selectedCategory ? selectedCategory.value : null,
      commesion_percentage: commesion,
    };
    if (name === "edit") {
      dispatch(updateCategoryByIdData({ data, id }));
      bottomrightnotify("Category updated Successfully");
      dispatch(getGetCategoriesData());
    } else {
      dispatch(addPostCategoriesData(data));
      bottomrightnotify("Category Created Successfully");
      dispatch(getGetCategoriesData());
    }
    tog_grid(false);
  };

  return (
    <div>
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
          {getCategorybyId ? "Edit Category" : "Add Category"}
        </ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <Col xxl={6}>
              <div>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </Col>
            {name !== "edit" && (
              <Col xxl={6}>
                <div>
                  <label htmlFor="addValues" className="form-label">
                    Add Image
                  </label>
                  <InputImageComp
                    type="file"
                    className="form-control"
                    onFileUpload={handleFileUpload}
                  />
                </div>
              </Col>
            )}
            <Col lg={12}>
              <span>
                Description<span style={{ color: "red" }}>*</span>
              </span>
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
            <Col xxl={6}>
              <div>
                <label htmlFor="title" className="form-label">
                  Commesion
                </label>
                <Input
                  type="number"
                  className="form-control"
                  id="title"
                  placeholder="Enter Commission Persentage"
                  name="title"
                  value={commesion}
                  onChange={(e) => setCommesion(e.target.value)}
                />
              </div>
            </Col>
            {name !== "edit" && (
              <Col lg={12}>
                <label className="form-label">Select Categories</label>
                <CategoriesDropdown
                  placeholder={"Select Category"}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              </Col>
            )}
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

export default CategoryModal;
