import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

import BreadCrumb from "../../../Components/Common/BreadCrumb";


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCatalogProductData, deleteCatalogProductById, editCatalogData, editCatalogProduct, getCatalogProductById, getSingleCatalog } from "../../../slices/thunks";
import { useSelector } from "react-redux";
import Products from "../Products/index";
import DeleteModal from "../../../Components/Common/DeleteModal";
import FullscreenModal from "./FullModal";
import EditCatalogModal from "./EditCatalogModal";
import { resetCataglogData, resetEditedProductData } from "../../../slices/catalog/reducer";
import { ToastContainer, toast } from "react-toastify";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ProductReview = (props) => {
  return (
    <React.Fragment>
      <li className="py-2">
        <div className="border border-dashed rounded p-3">
          <div className="d-flex align-items-start mb-3">
            <div className="hstack gap-3">
              <div className="badge rounded-pill bg-success mb-0">
                <i className="mdi mdi-star"></i> {props.rating}
              </div>
              <div className="vr"></div>
              <div className="flex-grow-1">
                <p className="text-muted mb-0">{props.comment}</p>
              </div>
            </div>
          </div>
          {props.review.subitem && (
            <React.Fragment>
              <div className="d-flex flex-grow-1 gap-2 mb-3">
                {props.review.subitem.map((subItem, key) => (
                  <React.Fragment key={key}>
                    <Link to="#" className="d-block">
                      <img
                        src={subItem.img}
                        alt=""
                        className="avatar-sm rounded object-fit-cover material-shadow"
                      />
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}

          <div className="d-flex align-items-end">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-0">{props.review.name}</h5>
            </div>

            <div className="flex-shrink-0">
              <p className="text-muted fs-13 mb-0">{props.review.date}</p>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

function CatalogDetails() {
  const [catelogData, setCatelogData] = useState({});
  const [singleProductState, setSingleProductState] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletedId, setDeletedId] = useState(false);
  const [fullScreenModalEdit, setFullScreenModalEdit] = useState(false);
  const [fullScreenModalAdd, setFullScreenModalAdd] = useState(false);
  const [editCatalogModal, setEditCatalogModal] = useState(false);
  // const [customActiveTab, setcustomActiveTab] = useState("1");
  // const [selectedStatus, setSelectedStatus] = useState("");

  const params = useParams();

  const dispatch = useDispatch();

  const ProductRes = useSelector((state) => state.Catalog.catalogs);
  // console.log("🚀 ~ CatalogDetails ~ ProductRes:", ProductRes)
  const SingleProductRes = useSelector((state) => state.Catalog.CatalogProductById);
  const EditedProductRes = useSelector((state) => state.Catalog.editProductData);
  const AddedCatalogProductRes = useSelector((state) => state.Catalog.AddCatalogProductRes);
  const DeleteCatalogProductByIdRes = useSelector((state) => state.Catalog.DeleteCatalogProductByIdRes);
  const EditCatalogDataRes = useSelector((state) => state.Catalog.editCatalogDataRes);

  useEffect(() => {
    if (params && params._id || EditCatalogDataRes && EditCatalogDataRes.success) {
      fetchData(params._id);
    }
  }, [params, EditCatalogDataRes]);

  useEffect(() => {
    if (ProductRes && ProductRes.success) {
      setCatelogData(ProductRes.data);
      // setSelectedStatus(catelogData?.approved === true ? "approve" : "reject");
    }
  }, [ProductRes]);

  useEffect(() => {
    if (SingleProductRes && SingleProductRes.success) {
      setSingleProductState(SingleProductRes.data);
    }
  }, [SingleProductRes]);

  useEffect(() => {
    if ((EditedProductRes && EditedProductRes.success || AddedCatalogProductRes && AddedCatalogProductRes.success || DeleteCatalogProductByIdRes && DeleteCatalogProductByIdRes.success || EditCatalogDataRes && EditCatalogDataRes.success)) {
      successnotify(EditedProductRes.message || AddedCatalogProductRes.message || DeleteCatalogProductByIdRes.message || EditCatalogDataRes.message)
      setFullScreenModalEdit(false);
      setFullScreenModalAdd(false);
      setDeleteModal(false);
      dispatch(resetEditedProductData());
      dispatch(resetCataglogData());
    }
  }, [EditedProductRes, AddedCatalogProductRes, DeleteCatalogProductByIdRes]);

  const fetchData = (id) => {
    dispatch(getSingleCatalog(id));
  };

  const successnotify = (message) => toast(message, { position: "top-center", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' });

  document.title =
    "Product Details | GK Dukaan - Ghar Ki Dukaan";

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  // const handleStatusChange = async (e) => {
  //   const newStatus = e.target.value;
  //   // setSelectedStatus(newStatus);
  //   try {
  //     await axios.put(
  //       `https://seahorse-app-yobkt.ondigitalocean.app/admin/product/${newStatus}/${params._id}`
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const toggleCustom = (tab) => {
  //   if (customActiveTab !== tab) {
  //     setcustomActiveTab(tab);
  //   }
  // };

  const toggleDelete = (val, id) => {
    setDeletedId(id)
    setDeleteModal(val);
  }

  const toggleEdit = useCallback((val, id) => {
    if (id) {
      dispatch(getCatalogProductById(id));
    }
    setFullScreenModalEdit(val);
  }, [])

  const toggleAdd = (val) => {
    setFullScreenModalAdd(val);
  }

  const toggleCatalogEdit = (val) => {
    setEditCatalogModal(val);
  }

  const handleDeleteProduct = () => {
    dispatch(deleteCatalogProductById(deletedId));
  }

  const handleEditApiCall = (data) => {
    dispatch(editCatalogProduct(data));
  }

  const handleAddApiCall = (data) => {
    data.catalog_id = ProductRes && ProductRes.success && ProductRes.data._id
    dispatch(AddCatalogProductData(data));
  }

  return (
    <div className="page-content">
      <ToastContainer />
      {deleteModal && <DeleteModal show={deleteModal} onDeleteClick={handleDeleteProduct} onCloseClick={() => setDeleteModal(false)} />}
      {fullScreenModalEdit && <FullscreenModal singleProductState={singleProductState} fullScreenModal={fullScreenModalEdit} handleModalChange={toggleEdit} heading={"Edit Product"} handleApiCall={handleEditApiCall} />}
      {fullScreenModalAdd && <FullscreenModal fullScreenModal={fullScreenModalAdd} handleModalChange={toggleAdd} heading={"Add Product"} handleApiCall={handleAddApiCall} catagoryId={ProductRes && ProductRes.success && ProductRes.data.categoryId} />}
      {editCatalogModal && <EditCatalogModal data={ProductRes} EditCatalogModal={editCatalogModal} toggleCatalogEdit={toggleCatalogEdit} />}
      <Container fluid>
        <BreadCrumb title="Catalogs Details" pageTitle="Catalogs" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div>
                      {catelogData?.mediaUrls?.map((url, index) => (
                        <div key={index}>
                          <img
                            src={url}
                            alt="image"
                            className="img-thumbnail"
                          />
                        </div>
                      ))}

                      <div className="mt-5">
                        <div>
                          <h5 className="fs-14 mb-3">Ratings & Reviews</h5>
                        </div>
                      </div>

                      <Row className="gy-4 gx-0 ">
                        <Col lg={12}>
                          <div>
                            <div className="pb-3">
                              <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1">
                                    <div className="fs-16 align-middle text-warning">
                                      <i className="ri-star-fill"></i>{" "}
                                      <i className="ri-star-fill"></i>{" "}
                                      <i className="ri-star-fill"></i>{" "}
                                      <i className="ri-star-fill"></i>{" "}
                                      <i className="ri-star-half-fill"></i>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <h6 className="mb-0">
                                      {catelogData?.averageRating
                                        ? catelogData?.averageRating
                                        : 0}{" "}
                                      out of 5
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-muted">
                                  Total reviews :{" "}
                                  <span className="fw-medium">
                                    {catelogData?.totalReviews
                                      ? catelogData?.totalReviews
                                      : 0}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              {catelogData?.ratingSummary?.map((data, index) => (
                                <Row key={index} className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">
                                        {data?.rating} star
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "50.16%" }}
                                          aria-valuenow="50.16"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">
                                        {data?.count}
                                      </h6>
                                    </div>
                                  </div>
                                </Row>
                              ))}
                            </div>
                            <div className="my-4">
                              <div className="d-flex flex-wrap align-items-start gap-3">
                                <h5 className="fs-14">Reviews: </h5>
                              </div>
                              <SimpleBar
                                className="me-lg-n3 pe-lg-4"
                                style={{ maxHeight: "225px" }}
                              >
                                <ul className="list-unstyled mb-0">
                                  {catelogData?.latestReviews?.map(
                                    (review, key) => (
                                      <React.Fragment key={key}>
                                        {key.createdAt ? (
                                          <ProductReview review={review} />
                                        ) : (
                                          ""
                                        )}
                                      </React.Fragment>
                                    )
                                  )}
                                </ul>
                              </SimpleBar>
                            </div>
                          </div>
                        </Col>

                        <Col lg={8}></Col>
                      </Row>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mx-2">{catelogData?.title}</h4>
                            <button onClick={() => toggleCatalogEdit(true)} className="btn btn-primary">Edit CATALOG</button>
                          </div>
                          <div className="hstack gap-2 flex-wrap">
                            <div className="vr"></div>
                            <div className="text-muted">
                              Seller :{" "}
                              <span className="text-body fw-medium">
                                {catelogData?.vendorStoreName}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div className="text-muted">
                              Published :{" "}
                              <span className="text-body fw-medium">
                                {formattedDate(catelogData?.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Row className="mt-4">
                        <Col lg={4} sm={8}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-file-copy-2-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Total Orders :
                                </p>
                                <h5 className="mb-0">
                                  {catelogData?.totalOrders}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={8}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-stack-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">Stock :</p>
                                <h5 className="mb-0">
                                  {catelogData?.totalStock}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} sm={8}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-stack-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Total Revenue :
                                </p>
                                <h5 className="mb-0">
                                  {catelogData?.totalRevenue}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        {/* ))} */}
                      </Row>

                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Description :</h5>
                        <p>{catelogData?.fullDetails}</p>
                      </div>
                    </div>
                    {ProductRes && ProductRes.success && ProductRes.data._id &&
                      <Products header={false} catalogId={ProductRes && ProductRes.success && ProductRes.data._id} toggleDelete={toggleDelete} toggleEdit={toggleEdit} toggleAdd={toggleAdd} />
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CatalogDetails;
