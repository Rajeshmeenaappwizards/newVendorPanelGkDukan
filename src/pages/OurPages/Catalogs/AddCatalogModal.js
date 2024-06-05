import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useDispatch } from "react-redux";
import { getOptionsData } from "../../../slices/options/thunk";
import DynamicSelectComponent from "../../../Components/Common/DynamicSelectComponent";
import { useSelector } from "react-redux";
import { getGetCategoriesData } from "../../../slices/categories/thunk";
import CategorySelect from "./CategorySelect";
import { AddCatalog } from "../../../slices/thunks";
import { BASE_URL } from "../../../helpers/url_helper";

registerPlugin(FilePondPluginImagePreview);

const AddCatalogModal = ({
  AddCatalogModal = false,
  toggleCatalogAddFnc = () => {},
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [levelOneCategory, setLevelOneCategory] = useState("");
  const [levelTwoCategory, setLevelTwoCategory] = useState("");
  const [levelThreeCategory, setLevelThreeCategory] = useState("");
  const [levelFourCategory, setLevelFourCategory] = useState("");

  const [parentCategory, setParentCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [catalogData, setCatalogData] = useState({
    category_id: "",
    name: "",
    full_details: "",
    media_id: "",
    // vendor_id: "",
  });
  // const [vendorOption, setVendorOption] = useState([]);

  // const VendorOptionRes = useSelector((state) => state.Option.options);
  const categoriesRes = useSelector(
    (state) => state.CategorySlice.categoriesAll
  );

  useEffect(() => {
    if (categoriesRes && categoriesRes.length > 0) {
      setParentCategory(categoriesRes);
    }
  }, [categoriesRes]);

  // useEffect(() => {
  //   if (VendorOptionRes && VendorOptionRes.success) {
  //     setVendorOption(VendorOptionRes.data);
  //   }
  // }, [VendorOptionRes]);

  useEffect(() => {
    let params = {
      limit: 10,
    };
    // fetchVendorOptions(params);
    fetchCategoriesOption();
  }, []);

  // const fetchVendorOptions = (data) => {
  //   dispatch(getOptionsData(data));
  // };
  const fetchCategoriesOption = () => {
    dispatch(getGetCategoriesData());
  };

  // const handleOptionChange = (inputValue) => {
  //   let params = {
  //     limit: 10,
  //   };
  //   if (inputValue) {
  //     params.keyword = inputValue;
  //     fetchVendorOptions(params);
  //   } else {
  //     fetchVendorOptions(params);
  //   }
  // };

  const handleInputChange = ({ target: { id, value } }) => {
    setCatalogData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(AddCatalog(catalogData));
    toggleCatalogAddFnc(false);
  };

  const loadHandler = (source, load, error, progress, abort, headers) => {
    fetch(new Request(source))
      .then((response) => response.blob())
      .then(load)
      .catch((err) => {
        console.error("Image loading failed: ", err);
        abort();
      });
  };

  const processHandler = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const authData = JSON.parse(localStorage.getItem("authUser"));
    const formData = new FormData();
    formData.append("upload", file, file.name);

    fetch(`${BASE_URL}/vendor/media/single`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: authData.token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setCatalogData((prevState) => ({
          ...prevState,
          media_id: response._id,
        }));
        load(response.fileId);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        error("Upload failed");
      });

    return {
      abort: () => abort(),
    };
  };

  const handleVendorSelected = (val) => {
    setCatalogData((prevState) => ({ ...prevState, vendor_id: val }));
  };
  const onChangeParantCategory = (selectedOption) => {
    setLevelOneCategory(selectedOption ? selectedOption.value : "");
    setSubCategories(selectedOption ? selectedOption.children : []);
    setLevelTwoCategory("");
    setSubSubCategories([]);
    setSubSubCategories([]);
    setLevelThreeCategory("");
    setSubSubSubCategories([]);
    setLevelFourCategory("");
    setCatalogData((prevState) => ({
      ...prevState,
      category_id: selectedOption.value,
    }));
  };

  const onChangeSubCategory = (selectedOption) => {
    setLevelTwoCategory(selectedOption ? selectedOption.value : "");
    setSubSubCategories(selectedOption ? selectedOption.children : []);
    setLevelThreeCategory("");
    setSubSubSubCategories([]);
    setLevelFourCategory("");
    setCatalogData((prevState) => ({
      ...prevState,
      category_id: selectedOption.value,
    }));
  };

  const onChangeSubSubCategory = (selectedOption) => {
    setLevelThreeCategory(selectedOption ? selectedOption.value : "");
    setSubSubSubCategories(selectedOption ? selectedOption.children : []);
    setLevelFourCategory("");
    setCatalogData((prevState) => ({
      ...prevState,
      category_id: selectedOption.value,
    }));
  };

  const onChangeSubSubSubCategory = (selectedOption) => {
    setLevelFourCategory(selectedOption ? selectedOption.value : "");
    setCatalogData((prevState) => ({
      ...prevState,
      category_id: selectedOption.value,
    }));
  };

  return (
    <Modal
      size="xl"
      isOpen={AddCatalogModal}
      toggle={() => toggleCatalogAddFnc(false)}
      className="modal-fullscreen"
      id="exampleModalFullscreen"
    >
      <ModalHeader
        className="modal-title"
        id="exampleModalFullscreenLabel"
        toggle={() => toggleCatalogAddFnc(false)}
      >
        Add Catalog
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={4}>
            <FormGroup>
              <Label for="taxSlabs">Select Parent Category</Label>
              <CategorySelect
                value={levelOneCategory}
                onChange={onChangeParantCategory}
                placeholder="Select Parent Category..."
                data={parentCategory}
              />
            </FormGroup>
          </Col>
        </Row>
        {levelOneCategory && subCategories.length > 0 && (
          <Row>
            <Col lg={4}>
              <FormGroup>
                <Label for="taxSlabs">Select Sub Category</Label>
                <CategorySelect
                  value={levelTwoCategory}
                  onChange={onChangeSubCategory}
                  placeholder="Select Sub Category..."
                  data={subCategories}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        {levelTwoCategory && subSubCategories.length > 0 && (
          <Row>
            <Col lg={4}>
              <FormGroup>
                <Label for="taxSlabs">Select Sub Sub Category</Label>
                <CategorySelect
                  value={levelThreeCategory}
                  onChange={onChangeSubSubCategory}
                  placeholder="Select Sub Sub Category..."
                  data={subSubCategories}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        {levelThreeCategory && subSubSubCategories.length > 0 && (
          <Row>
            <Col lg={4}>
              <FormGroup>
                <Label for="taxSlabs">Select Sub Sub Sub Category</Label>
                <CategorySelect
                  value={levelFourCategory}
                  onChange={onChangeSubSubSubCategory}
                  placeholder="Select Sub Sub Sub Category..."
                  data={subSubSubCategories}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label for="name">Catalog Title*</Label>
              <Input
                type="text"
                id="name"
                value={catalogData.name}
                onChange={handleInputChange}
                placeholder="Enter catalog title"
              />
            </FormGroup>
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label for="full_details">Description*</Label>
              <Input
                type="textarea"
                id="full_details"
                value={catalogData.full_details}
                onChange={handleInputChange}
                placeholder="Enter full details"
              />
            </FormGroup>
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label for="productImages">Add Catalog Images</Label>
              <div className="filepond-wrapper">
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  server={{
                    load: loadHandler,
                    process: processHandler,
                  }}
                  name="files"
                  className="filepond filepond-input-multiple"
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>
            </FormGroup>
          </Col>
          {/* <Col lg={12}>
            <FormGroup>
              <Label for="productImages">Select Vendor</Label>
              <DynamicSelectComponent
                handleOptionChange={handleOptionChange}
                handleVendorSelect={handleVendorSelected}
                placeholder="Select Vendor"
                // options={vendorOption}
                name="choices-single-default"
                id="VendorSelectAddCatalog"
              />
            </FormGroup>
          </Col> */}
        </Row>
      </ModalBody>
      <div className="modal-footer">
        <Link
          to="#"
          onClick={() => toggleCatalogAddFnc(false)}
          className="btn btn-link link-success fw-medium"
        >
          <i className="ri-close-line me-1 align-middle" />
          Close
        </Link>
        <Button
          color="primary"
          className="btn btn-primary"
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default AddCatalogModal;
