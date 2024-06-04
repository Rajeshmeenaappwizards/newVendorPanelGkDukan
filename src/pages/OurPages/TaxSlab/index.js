import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { editTaxSlabs, getTaxSlabs } from "../../../slices/thunks";
import { useMemo } from "react";
import TableComponent from "../Components/TableComponent";
import { Link } from "react-router-dom";
import TaxSlabModal from "./TaxSlabModal";
import { clearEdiSlabs } from "../../../slices/TaxSlabs/reducer";
function Tax() {
  const [show, setShow] = useState(false);
  const [tax_slab_data, setTax_slab_data] = useState({});
  const [edit_or_add, setEdit_or_add] = useState("add");
  const [taxSlabs, setTaxSlabs] = useState([]);
  const dispatch = useDispatch();

  const allCategoriesData = useSelector(
    (state) => state.CategorySlice.categoriesData
  );

  const taxSlabsData = useSelector((state) => state.TaxSlabs.taxSlabs);
  const taxSlabRes = useSelector((state) => state.TaxSlabs.data);

  const fetchTaxSlabs = () => {
    dispatch(getTaxSlabs());
  };

  useEffect(() => {
    fetchTaxSlabs();
  }, []);

  useEffect(() => {
    if (taxSlabRes && taxSlabRes.success) {
      fetchTaxSlabs();
    }
  }, [taxSlabRes]);

  useEffect(() => {
    setTaxSlabs(taxSlabsData.data);
  }, [taxSlabsData]);

  function tog_grid() {
    setShow(!show);
  }

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to="/apps-ecommerce-taxslab-details"
            className="fw-medium link-primary"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Percentage",
        accessorKey: "percentage",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Categories",
        accessorKey: "categories",
        enableColumnFilter: false,
        cell: (cell) =>
          cell
            .getValue()
            .map((item) => item.title)
            .join(", "),
      },
      {
        header: "Date Published",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {new Date(cell.getValue()).toLocaleDateString()},
            <small className="text-muted">
              {" "}
              {new Date(cell.getValue()).toLocaleTimeString()}
            </small>
          </>
        ),
      },
      {
        header: "Action",
        cell: (cellProps) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Link
                to="#"
                className="text-primary d-inline-block edit-item-btn"
                onClick={() => {
                  const taxSlabData = cellProps.row.original;
                  setTax_slab_data(taxSlabData);
                  setEdit_or_add("edit");
                  setShow(true);
                }}
              >
                <i className="ri-pencil-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <TaxSlabModal
        show={show}
        tog_grid={tog_grid}
        tax_slab_data={tax_slab_data}
        edit_or_add={edit_or_add}
      />
      <div className="page-content">
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Tax</h4>
            <Button
              color="primary"
              onClick={() => {
                setTax_slab_data({});
                setEdit_or_add("add");
                setShow(true);
                if (editTaxSlabs.length > 0) {
                  dispatch(clearEdiSlabs());
                }
              }}
            >
              Add New TaxSlab
            </Button>
          </CardHeader>
          <CardBody>
            <TableComponent
              data={taxSlabs || []}
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
      </div>
    </React.Fragment>
  );
}

export default Tax;
