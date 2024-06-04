import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { flattenProduct } from "../../../helpers/date_helper";

const MultiSelector = (props) => {
  const [disselectMulti, setdisselectMulti] = useState(null);

  const dissortbyMulti = useSelector(state => state.CategorySlice.categoriesData)

  useEffect(() => {
    if (props && props.selectedData && props.selectedData.length > 0) {
      let data = flattenProduct(props.selectedData)
      setdisselectMulti(data);
    }

  }, [props.selectedData])

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
      <Row>
        <Col>
          <div className="">
            <Select
              value={disselectMulti}
              placeholder={`${props.placeholder}`}
              isMulti={true}
              onChange={(sortBy) => {
                props.handleSelectedFnc(sortBy)
                setdisselectMulti(sortBy);
              }}
              options={dissortbyMulti}
              classNamePrefix="js-example-disabled-multi mb-0"
              styles={customStyles}
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MultiSelector;
