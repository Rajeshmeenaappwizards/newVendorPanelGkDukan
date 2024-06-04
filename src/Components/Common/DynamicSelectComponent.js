import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setCategoryId, setVendorId } from "../../slices/catalog/reducer";
import { setCustomerIdOrder, setVendorIdOrder } from "../../slices/orders/reducer";
import { setCategoriesProduct, setVendorIdProduct } from "../../slices/product/reducer";
import { setVendorIdSupport } from "../../slices/supportTicket/reducer";

const DynamicSelectComponent = ({ options, placeholder, className, id, handleOptionChange, handleVendorSelect = () => { } }) => {
    const dispatch = useDispatch();
    const [disselectMulti, setdisselectMulti] = useState(null);

    const transformedOptions = options.map(option => ({
        value: option._id || option.value,
        label: option.name || option.label,
    }));

    const handleInputChange = useCallback(
        debounce((inputValue) => {
            handleOptionChange(inputValue)
        }, 300),
        []
    );


    return (
        <React.Fragment>
            <Col sm={3} className="col-xxl-3">
                <div>
                    <Select
                        value={disselectMulti}
                        placeholder={placeholder}
                        onChange={(sortBy) => {
                            if (id === "idVendor") {
                                dispatch(setVendorId(sortBy.value))
                            }
                            if (id === "idVendorOrder") {
                                dispatch(setVendorIdOrder(sortBy.value))
                            }
                            if (id === "idVendorSupport") {
                                dispatch(setVendorIdSupport(sortBy.value))
                            }
                            if (id === "idVendorProduct") {
                                dispatch(setVendorIdProduct(sortBy.value))
                            }
                            if (id === "idCategories") {
                                dispatch(setCategoryId(sortBy.value))
                            }
                            if (id === "idCustomer") {
                                dispatch(setCustomerIdOrder(sortBy.value))
                            }
                            if (id === "idCategoriesProduct") {
                                dispatch(setCategoriesProduct(sortBy.value))
                            }
                            if (id === "VendorSelectAddCatalog") {
                                handleVendorSelect(sortBy.value)
                            }
                            setdisselectMulti(sortBy);
                        }}
                        options={transformedOptions}
                        onInputChange={handleInputChange}
                        name={className}
                        id={id}
                    />
                </div>
            </Col>
        </React.Fragment>
    );
};

export default DynamicSelectComponent;
