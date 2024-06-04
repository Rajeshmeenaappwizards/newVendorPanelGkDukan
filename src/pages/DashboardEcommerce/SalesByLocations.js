import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { VectorMap } from '@south-paw/react-vector-maps'
import world from '../../common/world.svg.json';
import { useSelector } from 'react-redux';

const SalesByLocations = () => {

    const dashboardRes = useSelector((state) => state.DashboardEcommerce.widgetsData)

    return (
        <React.Fragment>
            <Col xl={4}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">Sales by Locations</h4>
                    </CardHeader>

                    <CardBody>

                        <div
                            data-colors='["--vz-light", "--vz-success", "--vz-primary"]'
                            style={{ height: "269px" }} dir="ltr">
                            <div id="world_map_line_markers" className="custom-vector-map">
                                <VectorMap {...world} />
                            </div>
                        </div>

                        {dashboardRes && dashboardRes.success && dashboardRes.data && dashboardRes.data.sales_by_location && dashboardRes.data.sales_by_location.map((val, inx) => {
                            return (
                                <div key={inx} className="px-2 py-2 mt-1">
                                    <p className="mb-1">{val.name} <span className="float-end">{val.percentage.toFixed(2)}%</span></p>
                                    <div className="progress mt-2" style={{ height: "6px" }}>
                                        <div className="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                            style={{ width: `${val.percentage.toFixed(2)}%` }} aria-valuenow={`${val.percentage.toFixed(2)}`} aria-valuemin="0" aria-valuemax={`${val.percentage.toFixed(2)}`}>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default SalesByLocations;