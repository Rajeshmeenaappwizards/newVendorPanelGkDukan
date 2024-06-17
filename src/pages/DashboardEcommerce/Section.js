import React from 'react';
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import { formatDate } from '../../helpers/date_helper';
import { useSelector } from 'react-redux';

const Section = (props) => {

    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);


    const profileRes = useSelector((state) => state.Profile.getProfileState.vendor);
    console.log('profileRes',profileRes)

    return (
        <React.Fragment>
            <Row className="mb-3 pb-1">
                <Col xs={12}>
                    <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                            <h4 className="fs-16 mb-1">HELLO, <span style={{color:'green'}} >{profileRes?.store_name}</span></h4>
                            <p className="text-muted mb-0">Here's what's happening with your store today.</p>
                        </div>
                        <div className="mt-3 mt-lg-0">
                            <form action="#">
                                <Row className="g-3 mb-0 align-items-center">
                                    <div className="col-sm-auto">
                                        <div className="input-group">
                                            <Flatpickr
                                                className="form-control border-0 dash-filter-picker shadow "
                                                style={{ fontSize: '0.80rem' }}
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d M, Y",
                                                    defaultDate: [pastDate, currentDate]
                                                }}
                                                onChange={(date) => {
                                                    if (date && date.length > 1) {
                                                        let params = {
                                                            fromDate: formatDate(date[0]),
                                                            toDate: formatDate(date[1])
                                                        }
                                                        props.fetchDashBoardApiData(params)
                                                    }
                                                }}
                                            />
                                            <div className="input-group-text bg-primary border-primary text-white"><i className="ri-calendar-2-line"></i></div>
                                        </div>
                                    </div>
                                    {/* <div className="col-auto">
                                        <button type="button" className="btn btn-soft-success"><i className="ri-add-circle-line align-middle me-1"></i> Add Product</button>
                                    </div> */}
                                </Row>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Section;