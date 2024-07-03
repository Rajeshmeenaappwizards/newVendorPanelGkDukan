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
  toggleCatalogAddFnc = () => { },
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [searchCategoryValue, setSearchCategoryValue] = useState("");
  const [searchCategory, setSearchCategory] = useState(null);
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
  const categoriesRes = useSelector(
    (state) => state.CategorySlice.categoriesAll
  );
  const parentCategoryDatas = useSelector(
    (state) => state.CategorySlice.parentCategoryData
  );

  useEffect(() => {
    if (categoriesRes && categoriesRes.length > 0) {
      setParentCategory(categoriesRes);
    }
  }, [categoriesRes]);


  useEffect(() => {
    dispatch(getGetCategoriesData());
  }, []);

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

  const handleSearchCategory = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchCategoryValue(searchValue);

    if (searchValue === "") {
      setSearchCategory([]);
      return;
    }

    const filteredCategories = categoriesRes.filter((category) =>
      category.title.toLowerCase().includes(searchValue)
    );
    setSearchCategory(filteredCategories); // Update filtered categories
  };
  
  const handleCategoryClick = (categoryData) => {
    const paramsData = {
      value: categoryData._id,
      label: categoryData.title,
      children: categoryData.children,
    };
  
    if (!categoryData.path) {
      onChangeParantCategory(paramsData);
      setSearchCategory(null);
      return;
    }
  
    // Split path by comma and trim each ID
    const pathIds = categoryData.path.split(',').map(id => id.trim());
  
    // Initialize variables to store matched categories and reset levels
    let currentCategory = null;
    resetCategoryLevels();
  
    // Traverse through pathIds to find matching categories
    pathIds.forEach((pathId, index) => {
      if (index === 0) {
        // Find matching category in categoriesRes
        currentCategory = categoriesRes.find(category => category._id === pathId);
      } else {
        // Find matching category in currentCategory's children
        currentCategory = currentCategory?.children.find(category => category._id === pathId);
      }
  
      // Update state based on the level of the category
      if (currentCategory) {
        const params = {
          value: currentCategory._id,
          label: currentCategory.title,
          children: currentCategory.children,
        };
        switch (index) {
          case 0:
            onChangeParantCategory(params);
            break;
          case 1:
            onChangeSubCategory(params);
            break;
          case 2:
            onChangeSubSubCategory(params);
            break;
          case 3:
            onChangeSubSubSubCategory(params);
            break;
          default:
            break;
        }
      }
    });
  
    // Handle the case where there are fewer selected categories than levels
    if (currentCategory) {
      switch (pathIds.length) {
        case 1:
          onChangeSubCategory(paramsData);
          break;
        case 2:
          onChangeSubSubCategory(paramsData);
          break;
        case 3:
          onChangeSubSubSubCategory(paramsData);
          break;
        default:
          break;
      }
    }
  
    setSearchCategory(null);
  };
  
  const resetCategoryLevels = () => {
    setLevelOneCategory("");
    setLevelTwoCategory("");
    setLevelThreeCategory("");
    setLevelFourCategory("");
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
              <Label for="search">Search categories</Label>
              <Input
                type="text"
                id="search"
                value={searchCategoryValue}
                onChange={handleSearchCategory}
                placeholder="Search Category"
              />
            </FormGroup>
          </Col>
        </Row>
        {searchCategory && searchCategory.length > 0 && (
          <div className="search-results">
            {searchCategory.map((category) => (
              <div
                key={category._id}
                className="search-result-item"
                onClick={() => handleCategoryClick(category)}
              >
                {category.title}
              </div>
            ))}
          </div>
        )}
        <Row>
          <Col lg={4}>
            <FormGroup>
              <Label for="taxSlabs">Select Parent Category</Label>
              <CategorySelect
                value={levelOneCategory}
                onChange={onChangeParantCategory}
                placeholder="Select Parent Category..."
                data={parentCategoryDatas}
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
