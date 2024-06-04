import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Table,
  Card,
  CardBody,
} from "reactstrap";
import CategoryModal from "./CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesData,
  editCategoriesData,
  getGetCategoriesData,
} from "../../../slices/categories/thunk";
import { ToastContainer, toast } from "react-toastify";
import { clearDeleteCategoryByIdData } from "../../../slices/categories/reducer";
import Pagination from "../../../Components/Common/Pagination";

function CategoriesTable({ data }) {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  const getDeletedRes = useSelector(
    (state) => state.CategorySlice.deleteCategoriesData
  );

  const fetchCategories = () => {
    dispatch(getGetCategoriesData());
  };

  const handleEdit = (id) => {
    setId(id);
    setShow(!show);
    if (id) {
      dispatch(editCategoriesData(id));
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (confirmed) {
      dispatch(deleteCategoriesData(id));
    }
  };

  return (
    <Card>
      <CardBody>
        <ToastContainer />
        <CategoryModal show={show} tog_grid={handleEdit} name={"edit"} id={id} />
        <Row>
          <div className="table-responsive">
            <Table className="table-striped table-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((category, index) => (
                  <tr key={category.value}>
                    <td className="fw-medium">{index + 1}</td>
                    <td className="fw-medium"></td>
                    <td>{category.label}</td>
                    <td>{category.date}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <Link>
                          <i
                            onClick={() => handleEdit(category.value)}
                            className="ri-edit-2-line"
                          ></i>
                        </Link>
                        <Link to="#" className="link-danger fs-15">
                          <i
                            onClick={() => {
                              handleDelete(category?.value);
                            }}
                            className="ri-delete-bin-line"
                          ></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
        <Row className="mt-3">
          <Pagination
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={itemsPerPage}
          />
        </Row>
      </CardBody>
    </Card>
  );
}

export default CategoriesTable;



// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Row, Col, Button, Card, CardHeader, CardBody } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCategoriesData, editCategoriesData, getGetCategoriesData } from "../../../slices/categories/thunk";
// import TableComponent from "../Components/TableComponent";
// import CategoryModal from "./CategoryModal";
// import { clearDeleteCategoryByIdData } from "../../../slices/categories/reducer";
// import { ToastContainer, toast } from "react-toastify";
// import TableContainer from "../../../Components/Common/TableContainer";

// function CategoriesTable() {
//   const [show, setShow] = useState(false);
//   const [id, setId] = useState();
//   const [cateData,setCateData] = useState([])
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.CategorySlice.getCategoriesData);

//   useEffect(() =>{
//     setCateData(categories)
//   },[categories])

//   useEffect(() => {
//     dispatch(getGetCategoriesData());
//   }, [dispatch]);

//   const handleEdit = (id) => {
//     setId(id);
//     setShow(!show);
//     if (id) {
//       dispatch(editCategoriesData(id));
//     }
//   };

//   const handleDelete = (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this Category?"
//     );
//     if (confirmed) {
//       dispatch(deleteCategoriesData(id));
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         header: "No.",
//         accessorKey: "index",
//         // enableColumnFilter: false,
//         // cell: (cell) => <span className="fw-medium">{cell.getValue()}</span>,
//       },
//       {
//         header: "Title",
//         accessorKey: "label",
//         // enableColumnFilter: false,
//         // cell: (cell) => cell.getValue(),
//       },
//       {
//         header: "Date",
//         accessorKey: "date",
//         // enableColumnFilter: false,
//         // cell: (cell) => cell.getValue(),
//       },
//       {
//         header: "Action",
//         cell: (cellProps) => (
//           <ul className="list-inline hstack gap-2 mb-0">
//             <li className="list-inline-item">
//               <Link
//                 to="#"
//                 onClick={() => handleEdit(cellProps.row.original.value)}
//                 className="btn btn-soft-primary btn-sm"
//               >
//                 <i className="ri-edit-2-line" /> Edit
//               </Link>
//             </li>
//             <li className="list-inline-item">
//               <Link
//                 to="#"
//                 onClick={() => handleDelete(cellProps.row.original.value)}
//                 className="btn btn-soft-danger btn-sm"
//               >
//                 <i className="ri-delete-bin-line" /> Delete
//               </Link>
//             </li>
//           </ul>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <div>
//       <ToastContainer />
//       <CategoryModal show={show} tog_grid={handleEdit} name={"edit"} id={id} />
//       <div className="page-content">
//         <Row>
//           <Col lg={12}>
//             <Card>
//               <CardHeader>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h4 className="card-title mb-0">Categories</h4>
//                   <Button
//                     color="primary"
//                     onClick={() => {
//                       setId(null);
//                       setShow(true);
//                     }}
//                   >
//                     Add Category
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardBody>
//                 <TableContainer
//                   data={cateData}
//                   columns={columns}
//                 />
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default CategoriesTable;
