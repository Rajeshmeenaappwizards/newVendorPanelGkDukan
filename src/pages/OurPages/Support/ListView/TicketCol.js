import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const handleValidDate = (value) => {
  const date = new Date(value);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleString("en-GB", options);
  return formattedDate;
};

const TicketsId = (cell) => {
  return (
    <React.Fragment>
      <Link
        to={`/support/${cell.row.original._id}`}
        className="fw-medium link-primary"
      >
        {cell.getValue()}
      </Link>
    </React.Fragment>
  );
};

const Title = (cell) => {
  //   return <React.Fragment>{cell.getValue()}</React.Fragment>;
  return (
    <React.Fragment>
      <Link
        to={`/support/${cell.row.original._id}`}
        className="fw-medium link-primary"
      >
        {cell.getValue()}
      </Link>
    </React.Fragment>
  );
};

const Description = (cell) => {
  return <React.Fragment>{cell.getValue().substring(0, 20)}...</React.Fragment>;
};

const UpdateDate = (cell) => {
  return <React.Fragment>{handleValidDate(cell.getValue())}</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "open" ? (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {cell.getValue()}
        </span>
      ) : cell.getValue() === "closed" ? (
        <span className="badge bg-danger-subtle  text-danger text-uppercase">
          {cell.getValue()}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { TicketsId, Title, Description, UpdateDate, Status };
