import React from "react";
import { Link } from "react-router-dom";

const OrderProduct = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex align-items-center ">
            <div className=" avatar-sm  ">
              <img
                src={props.product.productImage}
                alt=""
                className="img-fluid  d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-15">
                <Link
                  to={`/products/${props.product?._id}`}
                  className="link-primary"
                >
                  {props.product?.productName?.substring(0, 20)}...
                </Link>
              </h5>
            </div>
          </div>
        </td>
        <td className="text-end">{props.product?.productQuantity}</td>
        <td className="text-end">₹{props.product?.taxableAmount}</td>
        <td className="text-end">
          ₹{props.product?.taxAmount} - {props.product?.taxPercentage} %
        </td>
        <td className="text-end">{props.product?.grossAmount}</td>
        <td className="text-end">₹{props.product?.total}</td>
        <td className="fw-medium text-end">{props.product?.amount}</td>
      </tr>
    </React.Fragment>
  );
};

export default OrderProduct;
