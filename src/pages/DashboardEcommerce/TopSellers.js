import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getTopVendorsApiData } from '../../slices/thunks';
import { useSelector } from 'react-redux';
import company2 from "../../assets/images/companies/img-2.png";

const TopSellers = () => {
    const dispatch = useDispatch();

    const topVendorsRes = useSelector((state) => state.DashboardEcommerce.topVendorsData)


    useEffect(() => {
        let params = {
            dateFilter: 'last_30_days'
        }
        fetchTopVendoresApi(params, 'Last 30 Days');
    }, [])

    const fetchTopVendoresApi = (data) => {
        dispatch(getTopVendorsApiData(data))
    }

    return (
        <React.Fragment>
            <Col xl={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Top Sellers</h4>
                        <div className="flex-shrink-0">
                          <Link to={"/vendors"}>View All Vendors</Link>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                                <tbody>
                                    {topVendorsRes && topVendorsRes.success && topVendorsRes.data && topVendorsRes.data.map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <img src={company2} alt="" className="avatar-sm p-2" />
                                                    </div>
                                                    <div>
                                                        <h5 className="fs-14 my-1 fw-medium"><Link to="/apps-ecommerce-seller-details" className="text-reset">{item.storeName}</Link></h5>
                                                        <span className="text-muted">{item.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-muted">{item.product}</span>
                                            </td>
                                            <td>
                                                <p className="mb-0">{item.totalProducts}</p>
                                                <span className="text-muted">Total Products</span>
                                            </td>
                                            <td>
                                                <p className="mb-0">₹{item.totalSales}</p>

                                                <span className="text-muted">Total Sales</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                                <div className="text-muted">Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">25</span> Results
                                </div>
                            </div>
                            <div className="col-sm-auto mt-3 mt-sm-0">
                                <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                    <li className="page-item disabled">
                                        <Link to="#" className="page-link">←</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">1</Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link to="#" className="page-link">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">3</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">→</Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
};

export default TopSellers;