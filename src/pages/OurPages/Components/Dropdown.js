import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Select from "react-select";

const Dropdown = (props) => {
  const [disselectMulti, setdisselectMulti] = useState(null);

  const [disable, setdisable] = useState(false);

  const dissortbyMulti = [
    {
      label: "UK",
      options: [
        { label: "London", value: "London" },
        { label: "Manchester", value: "Manchester" },
        { label: "Liverpool", value: "Liverpool" },
      ],
    },
    {
      label: "FR",
      options: [
        { label: "Paris", value: "Paris" },
        { label: "Lyon", value: "Lyon" },
        { label: "Marseille", value: "Marseille" },
      ],
    },
    {
      label: "SP",
      options: [
        { label: "Madrid", value: "Madrid" },
        { label: "Barcelona", value: "Barcelona" },
        { label: "Malaga", value: "Malaga" },
      ],
    },
    {
      label: "CA",
      options: [
        { label: "Montreal", value: "Montreal" },
        { label: "Toronto", value: "Toronto" },
        { label: "Vancouver", value: "Vancouver" },
      ],
    },
  ];

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
          <Col >
            <div className="">
              <Select
                isMulti={false}
                onChange={(sortBy) => {
                  setdisselectMulti(sortBy);
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

export default Dropdown;
