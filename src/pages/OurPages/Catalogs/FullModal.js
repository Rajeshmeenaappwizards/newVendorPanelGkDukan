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
import TaxSlabSelect from "./TaxSlabSelect";
import { useDispatch, useSelector } from "react-redux";
import { getProductAttributeById } from "../../../slices/thunks";
import { BASE_URL } from "../../../helpers/url_helper";

registerPlugin(FilePondPluginImagePreview);

const FullscreenModal = ({
  fullScreenModal = false,
  handleModalChange = () => {},
  heading,
  singleProductState,
  handleApiCall,
  catagoryId,
}) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [mrp, setMrp] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stockStatus, setStockStatus] = useState("true");
  const [stock, setStock] = useState(0);
  const [productWeight, setProductWeight] = useState("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("pending_review");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [mediaId, setMediaId] = useState([]);
  const [attributesValues, setAttributesValues] = useState([]);
  const [hsncode, setHsncode] = useState("");
  const [taxSlabs, setTaxSlabs] = useState("");
  const attributesRes = useSelector(
    (state) => state.Catalog.ProductAttributeById
  );
  const AddedCatalogProductRes = useSelector(
    (state) => state.Catalog.AddCatalogProductRes
  );

  useEffect(() => {
    if (catagoryId) {
      dispatch(getProductAttributeById(catagoryId));
    }
    if (AddedCatalogProductRes && AddedCatalogProductRes.success) {
      setFiles([]);
      setProductName("");
      setMrp("");
      setSalePrice("");
      setStockStatus("true");
      setStock(0);
      setProductWeight("");
      setSku("");
      setStatus("pending_review");
      setShortDescription("");
      setLongDescription("");
      setAttributes([]);
      setMediaId([]);
      setAttributesValues([]);
      setHsncode("");
      setTaxSlabs("");
    }
  }, [AddedCatalogProductRes, catagoryId]);

  useEffect(() => {
    if (
      singleProductState &&
      singleProductState._id &&
      singleProductState.categories_id
    ) {
      dispatch(getProductAttributeById(singleProductState.categories_id));
      setProductName(singleProductState.name || "");
      setMrp(singleProductState.mrp || "");
      setSalePrice(singleProductState.sale_price || "");
      setStockStatus(singleProductState.stock_status ? "true" : "false");
      setStock(singleProductState.stock || 0);
      setProductWeight(singleProductState.weight || "");
      setSku(singleProductState.sku || "");
      setStatus(singleProductState.status || "pending_review");
      setShortDescription(singleProductState.short_description || "");
      setLongDescription(singleProductState.long_description || "");
      setHsncode(singleProductState.hsncode || "");
      setTaxSlabs(singleProductState.tax_slabs || "");
      setAttributesValues(singleProductState.attributes || []);
      setFiles(
        (singleProductState.media_id || []).map((media) => ({
          source: media.url,
          options: { type: "local" },
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (attributesRes && attributesRes.length > 0) {
      setAttributes(attributesRes);
    }
  }, [attributesRes]);

  const handleSaveClick = () => {
    const params = {
      name: productName,
      short_description: shortDescription,
      long_description: longDescription,
      attributes: attributesValues,
      weight: productWeight,
      sku: sku,
      media_id: mediaId,
      mrp: mrp,
      sale_price: salePrice,
      stock_status: stockStatus,
      stock: stock,
      variations: singleProductState?.variations || [],
      hsncode: hsncode,
    };
    if (singleProductState && singleProductState._id) {
      params.productId = singleProductState._id;
    }
    handleApiCall(params);
  };

  return (
    <Modal
      size="xl"
      isOpen={fullScreenModal}
      toggle={() => handleModalChange(false)}
      className="modal-fullscreen"
      id="exampleModalFullscreen"
    >
      <ModalHeader toggle={() => handleModalChange(false)}>
        {heading}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label for="productName">Product Name*</Label>
              <Input
                type="text"
                id="productName"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label for="productImages">Add Product Images</Label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                server={{
                  load: (source, load, error, progress, abort, headers) => {
                    fetch(new Request(source))
                      .then((response) => response.blob())
                      .then(load)
                      .catch((err) => {
                        console.error("Image loading failed: ", err);
                        abort();
                      });
                  },
                  process: (
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
                    const authData = JSON.parse(
                      localStorage.getItem("authUser")
                    );
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
                        const updatedMediaId = [...mediaId, response._id];
                        setMediaId(updatedMediaId);
                        load(response.fileId);
                      })
                      .catch((err) => {
                        console.error("Upload failed:", err);
                        error("Upload failed");
                      });

                    return {
                      abort: () => abort(),
                    };
                  },
                }}
                allowMultiple
                maxFiles={5}
                name="files"
                className="filepond-input-multiple"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="mrp">MRP*</Label>
              <Input
                type="number"
                id="mrp"
                placeholder="Enter MRP"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="sale_price">Sale Price*</Label>
              <Input
                type="number"
                id="sale_price"
                placeholder="Enter Sale Price"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="selectStock">Select Stock</Label>
              <Input
                type="select"
                id="selectStock"
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="stock">Stock Quantity*</Label>
              <Input
                type="number"
                id="stock"
                placeholder="Enter Stock Quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="productWeight">Product Weight* (in gram)</Label>
              <Input
                type="number"
                id="productWeight"
                placeholder="Enter product weight"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <Label for="sku">Stock-keeping unit*</Label>
              <Input
                type="text"
                id="sku"
                placeholder="Enter SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={4}>
            <FormGroup>
              <Label for="selectStatus">Select Status</Label>
              <Input
                type="select"
                id="selectStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Input>
            </FormGroup>
          </Col>
          <Col lg={4}>
            <FormGroup>
              <Label for="hsncode">HSN Code*</Label>
              <Input
                type="text"
                id="hsncode"
                placeholder="Enter HSN Code"
                value={hsncode}
                onChange={(e) => setHsncode(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label for="shortDescription">Short Description*</Label>
              <Input
                type="textarea"
                id="shortDescription"
                placeholder="Enter short description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label for="longDescription">Long Description*</Label>
              <Input
                type="textarea"
                id="longDescription"
                placeholder="Enter long description"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {attributes.map((attribute, index) => (
            <Col lg={4} key={index}>
              <FormGroup>
                <Label>{attribute.name}</Label>
                <Input
                  type="select"
                  onChange={(e) => {
                    const updatedValues = [
                      ...attributesValues.filter(
                        (val) => val.key !== attribute.name
                      ),
                      { key: attribute.name, value: e.target.value },
                    ];
                    setAttributesValues(updatedValues);
                  }}
                >
                  <option value="">Select...</option>
                  {attribute.values.map((value, idx) => (
                    <option
                      key={idx}
                      value={value}
                      selected={attributesValues.some(
                        (val) =>
                          val.key === attribute.name && val.value === value
                      )}
                    >
                      {value}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          ))}
        </Row>
      </ModalBody>
      <div className="modal-footer">
        <Link
          to="#"
          onClick={() => handleModalChange(false)}
          className="btn btn-link link-success fw-medium"
        >
          <i className="ri-close-line me-1 align-middle" />
          Close
        </Link>
        <Button onClick={handleSaveClick} color="primary">
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default FullscreenModal;
