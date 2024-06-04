import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Select from "react-select";
import { useSelector } from "react-redux";

const CategoriesDropdown = (props) => {

  const [disable, setdisable] = useState(false);

  const dissortbyMulti = useSelector(
    (state) => state.CategorySlice.categoriesData
  );

  const customStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#3762ea",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#405189",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#405189",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };

  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      <Row>
        <Col>
          <div className="">
            <Select
              isMulti={false}
              onChange={(sortBy) => {
                props.setSelectedCategory(sortBy);
              }}
              options={dissortbyMulti}
              placeholder={`${props.placeholder}`}
              classNamePrefix="js-example-disabled-multi mb-0"
              isDisabled={disable}
              styles={customStyles}
            />
          </div>
        </Col>
      </Row>
      {/* </div> */}
    </React.Fragment>
  );
};

export default CategoriesDropdown;
