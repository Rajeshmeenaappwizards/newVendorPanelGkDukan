import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import CategoryModal from "./CategoryModal";
import CategoriesTable from "./CategoriesTable";
import { useSelector } from "react-redux";
import { clearEditOneCategoriesData } from "../../../slices/categories/reducer";
import { editCategoriesData } from "../../../slices/categories/thunk";
import { useDispatch } from "react-redux";

function Categories() {
  const [show, setShow] = useState(false);
  const allCategoriesData = useSelector((state) => state.CategorySlice.categoriesData);
  const dispatch = useDispatch();


  const addCategory = () => {
    setShow(!show);
    if (editCategoriesData.length > 0) {
      dispatch(clearEditOneCategoriesData());
    }
  };

  return (
    <React.Fragment>
      <CategoryModal show={show} tog_grid={addCategory} />
      <div className="page-content">
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Categories</h4>
            <Button color="primary" onClick={addCategory}>
              Add Category
            </Button>
          </CardHeader>
        </Card>
        <CategoriesTable data={allCategoriesData} />
      </div>
    </React.Fragment>
  );
}

export default Categories;
