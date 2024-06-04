import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAttributeByIdData,
  getAttributesData,
} from "../../../slices/attributes/thunk";
import TableComponent from "../Components/TableComponent";
import { Link } from "react-router-dom";
import AttributeModal from "./AttributeModal";

function AttributeTable() {
  const [show, setShow] = useState(false);
  const [attribute_data, setAttribute_data] = useState({});
  const [edit_or_add, setEdit_or_add] = useState("add");
  const [attributes, setAttributes] = useState([]);
  const dispatch = useDispatch();

  const getAttributes = useSelector(
    (state) => state.AttributesSlice.getAttributesData
  );
  const attributeRes = useSelector((state) => state.AttributesSlice.data);

  const fetchAttributes = () => {
    dispatch(getAttributesData());
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  useEffect(() => {
    if (attributeRes && attributeRes.success) {
      fetchAttributes();
    }
  }, [attributeRes]);

  useEffect(() => {
    setAttributes(getAttributes);
  }, [getAttributes]);

  const tog_grid = () => {
    setShow(!show);
  };

  const handleDelete = (data) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attribute?"
    );
    if (confirmed) {
      dispatch(deleteAttributeByIdData(data._id));
      fetchAttributes();
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Attribute Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <Link
            to="/apps-ecommerce-attribute-details"
            className="fw-medium link-primary"
          >
            {cell.getValue()}
          </Link>
        ),
      },
      {
        header: "Category",
        accessorKey: "categories_id",
        enableColumnFilter: false,
        cell: (cell) =>
          cell
            .getValue()
            .map((val) => val.title)
            .join(", "),
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Options",
        accessorKey: "values",
        enableColumnFilter: false,
        cell: (cell) =>
          cell
            .getValue()
            .map((val) => val)
            .join(", "),
      },
      {
        header: "Action",
        cell: (cellProps) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const attributeData = cellProps.row.original;
                    setAttribute_data(attributeData);
                    setEdit_or_add("edit");
                    setShow(true);
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    const attributeData = cellProps.row.original;
                    handleDelete(attributeData);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <AttributeModal
        show={show}
        tog_grid={tog_grid}
        attribute_data={attribute_data}
        edit_or_add={edit_or_add}
      />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Attributes</h4>
                  <Button
                    color="primary"
                    onClick={() => {
                      setAttribute_data({});
                      setEdit_or_add("add");
                      setShow(true);
                    }}
                  >
                    Add Attribute
                  </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <TableComponent
                    data={attributes || []}
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
}

export default AttributeTable;
