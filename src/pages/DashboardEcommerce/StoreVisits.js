import React, { useEffect } from 'react';
import { Card, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { StoreVisitsCharts } from './DashboardEcommerceCharts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTopCategoriesApiData } from '../../slices/thunks';
const StoreVisits = () => {
    const dispatch = useDispatch();

    const topCategoriesRes = useSelector((state) => state.DashboardEcommerce.topCategoriesData)


    useEffect(() => {
        fetchTopCategoriesApi();
    }, [])

    const fetchTopCategoriesApi = () => {
        dispatch(getTopCategoriesApiData())
    }


    return (
        <React.Fragment>
            <Col xl={4}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Top Categories</h4>
                        <div className="flex-shrink-0">
                            {/* <UncontrolledDropdown className="card-header-dropdown" >
                                <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                    <span className="text-muted">Report<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>Download Report</DropdownItem>
                                    <DropdownItem>Export</DropdownItem>
                                    <DropdownItem>Import</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </div>
                    </CardHeader>

                    <div className="card-body">
                        <StoreVisitsCharts chartId="store-visits-source" topCategories={topCategoriesRes.success ? topCategoriesRes?.data : []}/>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default StoreVisits;