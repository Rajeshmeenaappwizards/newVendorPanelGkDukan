import React, { useEffect, useState } from "react";
import { Button, Col, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  addTaxSlabs,
  editTaxSlabs,
  getTaxSlabs,
} from "../../../slices/TaxSlabs/thunk";
import MultiSelector from "../Components/MultiSelector";

function TaxSlabModal({ show, tog_grid, edit_or_add, tax_slab_data }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [percentage, setPercentage] = useState("");
  const [categories, setCategories] = useState([]);
  const error = useSelector((state) => state.TaxSlabs.error);

  const res = useSelector((state) => state.TaxSlabs);

  useEffect(() => {
    setTitle(tax_slab_data?.title);
    setPercentage(tax_slab_data?.percentage);
    if (tax_slab_data?.categories) {
      const selectedTaxSlabCategories = tax_slab_data.categories.map((item) => {
        return { label: item.title, _id: item.id };
      });
      setCategories(selectedTaxSlabCategories);
    }
    return () => {
      setTitle("");
      setPercentage("");
      setCategories([]);
    };
  }, [tax_slab_data]);

  const handleTaxSlabCategories = (data) => {
    setCategories(data);
  };

  const fetchTaxSlabs = () => {
    dispatch(getTaxSlabs());
  };

  const handleSubmit = () => {
    if (edit_or_add === "add") {
      const data = {
        title,
        percentage,
        categories: categories.map((val) => val._id),
      };
      dispatch(addTaxSlabs(data));
      fetchTaxSlabs();
      tog_grid();
    } else {
      const data = {
        title,
        percentage,
        categories: categories.map((val) => val._id),
        id: tax_slab_data._id,
      };
      dispatch(editTaxSlabs(data));
      fetchTaxSlabs();
      tog_grid();
    }
    setTitle("");
    setPercentage("");
    setCategories([]);
  };

  const handleOnClosed = () => {
    setTitle("");
    setPercentage("");
    setCategories([]);
  };

  return (
    <>
      <Modal
        isOpen={show}
        onClosed={handleOnClosed}
        toggle={() => {
          tog_grid();
        }}
      >
        <ModalHeader
          toggle={() => {
            tog_grid();
          }}
        >
          Tax Slabs
        </ModalHeader>
        <ModalBody>
          <form action="#">
            <div className="row g-3">
              <Col xxl={6}>
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
              <Col xxl={6}>
                <div>
                  <label htmlFor="taxPercent" className="form-label">
                    Percentage
                  </label>
                  <Input
                    type="number"
                    max={50}
                    className="form-control"
                    id="taxPercent"
                    placeholder="Enter percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              </Col>

              <Col xxl={6}>
                <label htmlFor="taxSlabCategories" className="form-label">
                  Categories
                </label>
                <MultiSelector
                  handleSelectedFnc={handleTaxSlabCategories}
                  selectedData={categories}
                  placeholder={"Select Categories"}
                />
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
    </>
  );
}

export default TaxSlabModal;
