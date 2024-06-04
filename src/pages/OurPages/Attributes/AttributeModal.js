import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAttributesData,
  getAttributesData,
  updateAttributeByIdData,
} from "../../../slices/attributes/thunk";
import CategoriesDropdown from "../Categories/CategoriesDropdown";
import { ToastContainer, toast } from "react-toastify";
import { clearEditAttributeByIdData } from "../../../slices/attributes/reducer";

function AttributeModal({ show, tog_grid, edit_or_add, attribute_data }) {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [values, setValues] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const editedData = useSelector((state) => state.AttributesSlice.updateAttributeByIdData);

  useEffect(() =>{
    dispatch(getAttributesData());
  },[editedData])

  useEffect(() => {
    if (attribute_data && show) {
      setTitle(attribute_data.name || "");
      setValues(Array.isArray(attribute_data.values) ? attribute_data.values.join(", ") : attribute_data.values || "");
      if (attribute_data.categories_id && attribute_data.categories_id.length > 0) {
        setSelectedCategory({ value: attribute_data.categories_id[0] });
      }
    }
    return () => {
      setTitle("");
      setValues("");
      setSelectedCategory({});
    };
  }, [attribute_data, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "values") setValues(value);
  };

  const handleSubmit = async () => {
    const valuesArray = typeof values === "string" ? values.split(",").map((value) => value.trim()) : values;
    const data = {
      name: title,
      values: valuesArray,
      categories_id: [selectedCategory.value],
      type: "select",
    };

    if (edit_or_add === "edit") {
      dispatch(updateAttributeByIdData({ data, id: attribute_data._id }));
      toast("Data updated Successfully", {
        position: "bottom-right",
        hideProgressBar: true,
        className: "bg-success text-white",
      });
    } else {
      dispatch(addAttributesData(data));
      toast("Data Created Successfully", {
        position: "bottom-right",
        hideProgressBar: true,
        className: "bg-success text-white",
      });
    }
    dispatch(getAttributesData());
    tog_grid();
    setTitle("");
    setValues("");
    setSelectedCategory({});
    dispatch(clearEditAttributeByIdData())
  };

  const handleOnClosed = () => {
    setTitle("");
    setValues("");
    setSelectedCategory({});
  };

  return (
    <>
      <Modal isOpen={show} onClosed={handleOnClosed} toggle={tog_grid}>
        <ModalHeader toggle={tog_grid}>
          {edit_or_add === "edit" ? "Edit Attribute" : "Add Attribute"}
        </ModalHeader>
        <ModalBody>
          <form>
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
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col xxl={6}>
                <div>
                  <label htmlFor="values" className="form-label">
                    Values
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="values"
                    placeholder="Enter Values (comma-separated)"
                    name="values"
                    value={values}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              {edit_or_add !== "edit" && (
                <Col lg={12}>
                  <label className="form-label">Select Categories</label>
                  <CategoriesDropdown
                    placeholder="Select Category"
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                  />
                </Col>
              )}
              <div className="col-lg-12">
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={tog_grid}>
                    Close
                  </Button>
                  <Button color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default AttributeModal;
