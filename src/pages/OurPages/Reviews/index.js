import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import TableComponent from "../Components/TableComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deletetReviewStatus,
  getAllReviewData,
  postReviewStatus,
} from "../../../slices/thunks";
import { BASE_URL } from "../../../helpers/url_helper";
import StarRating from "../../../Components/Common/StarRating";
import { toast } from "react-toastify";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);

  const allReviewsData = useSelector((state) => state.Reviews.getReviewState);

  const dispatch = useDispatch();

  const bottomrightnotify = (message, className) => {
    // toast(message, {
    //   position: "top-right",
    //   hideProgressBar: true,
    //   className: className,
    // });
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  // useEffect(() => {
  //   fetchAllReviews();
  // }, [handleClick]);

  useEffect(() => {
    if (allReviewsData) {
      setReviewList(allReviewsData);
    }
  }, [allReviewsData]);

  const fetchAllReviews = () => {
    dispatch(getAllReviewData());
  };

  const handleClick = async (id, status) => {
    const data = {
      id: id,
      status: status,
    };
    const res = await dispatch(postReviewStatus(data));
    if (res.payload && res.payload.message) {
      fetchAllReviews();
      bottomrightnotify(res.payload.message, "bg-success text-white");
    } else {
      bottomrightnotify(
        "Review Status Not Updated Successfully!",
        "bg-danger text-white"
      );
    }
    // fetchAllReviews();
  };

  const handleDelete = async (id) => {
    const reviewId = id;
    const res = await dispatch(deletetReviewStatus(reviewId));

    if (res.payload) {
      bottomrightnotify(res.payload.message, "bg-success text-white");
      fetchAllReviews();
    } else {
      bottomrightnotify(
        "Review Not Deleted Successfully!",
        "bg-danger text-white"
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "product_id.name",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to={`/products/${cell.row.original._id}`}
            className="fw-medium link-primary"
          >
            {cell.getValue().substring(0, 50) + '....'}
          </Link>
        ),
      },
      // {
      //   header: "Customer Id",
      //   accessorKey: "customerDetails._id",
      //   enableColumnFilter: false,
      //   cell: (cell) => (
      //     <Link
      //       to={`/customer/${cell.row.original.customerDetails._id}`}
      //       className="fw-medium link-primary"
      //     >
      //       {cell.getValue()}
      //     </Link>
      //   ),
      // },
      {
        header: "Stars",
        accessorKey: "rating",
        enableColumnFilter: false,
        cell: (cell) => <StarRating rating={cell.getValue()} />,
      },
      {
        header: "Comment",
        accessorKey: "comment",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "pending":
              return (
                <span className="badge text-uppercase bg-primary-subtle text-primary">
                  {cell.getValue()}
                </span>
              );
            case "approved":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {cell.getValue()}
                </span>
              );
            case "rejected":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {cell.getValue()}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-secondary-subtle text-secondary">
                  {cell.getValue()}
                </span>
              );
          }
        },
      },
      {
        header: "Review Image",
        accessorKey: "reviewImage",
        enableColumnFilter: false,
        cell: (cell) => {
          const imageUrl = cell.getValue();
          if (typeof imageUrl !== "undefined" && imageUrl.length > 0) {
            return (
              <img src={cell.getValue()} alt="Review" width="50" height="50" />
            );
          }
        },
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <Link
                  to={`/products/${cell.row.original._id}`}
                >
                  <i className="ri-eye-fill align-bottom text-muted" style={{ fontSize: '1.1rem' }}></i>{" "}
                
                </Link>
            {/* <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end"> */}
                
{/* 
                <DropdownItem
                  onClick={() => handleClick(cell.row.original, "approved")}
                >
                  Approved
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleClick(cell.row.original, "pending")}
                >
                  Pending
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleClick(cell.row.original, "rejected")}
                >
                  Rejected
                </DropdownItem>

                <DropdownItem
                  onClick={() => handleClick(cell.row.original, "hidden")}
                >
                  Hidden
                </DropdownItem>

                <DropdownItem onClick={() => handleDelete(cell.row.original)}>
                  Delete
                </DropdownItem> */}
              {/* </DropdownMenu>
            </UncontrolledDropdown> */}
          </ul>
        ),
      },
    ],
    []
  );
  document.title = "Listjs | GK Dukaan - Vendor";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Reviews</h4>
                </CardHeader>

                <CardBody>
                  <TableComponent
                    data={reviewList || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    columns={columns}
                    customPageSize={10}
                    divClass="table-responsive mb-1"
                    tableClass="mb-0 align-middle table-borderless"
                    theadClass="table-light text-muted"
                    isProductsFilter={true}
                    SearchPlaceholder="Search ..."
                    name="Add Catalog"
                    buttonLink="/catalogs/add-catalog"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Reviews;
