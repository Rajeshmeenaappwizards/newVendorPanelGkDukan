import React, { useEffect } from 'react';
import CountUp from "react-countup";
import { Card, CardBody, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getSupportStatsData } from '../../../../slices/thunks';
import { useSelector } from 'react-redux';

const Widgets = () => {

    const disptach = useDispatch();

    const SupportTicketStatsRes = useSelector((state) => state.SupportTicket.getSupportStatsDataState);

    useEffect(() => {
        fetchSupportStats();
    }, [])

    const fetchSupportStats = () => {
        disptach(getSupportStatsData());
    }
    return (
        <React.Fragment>
            {SupportTicketStatsRes && SupportTicketStatsRes?.success && SupportTicketStatsRes?.data && SupportTicketStatsRes?.data?.length > 0 && SupportTicketStatsRes?.data?.map((item, key) => (
                <Col xxl={3} sm={6} key={key}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">{item.title}</p>
                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                        <span className="counter-value" data-target="547">
                                            <CountUp
                                                start={0}
                                                end={item.counter}
                                                duration={3}
                                                suffix={item.suffix}
                                                prefix={item.prefix}
                                                decimals={item.decimals}
                                            />
                                        </span>
                                    </h2>
                                    {/* <p className="mb-0 text-muted"><span className={"badge bg-" + item.percentageClass + "-subtle text-" + item.percentageClass + " mb-0"}>
                                        <i className={item.arrowIcon + " align-middle"}></i> {item.percentage}
                                    </span> vs. previous month</p> */}
                                </div>
                                <div>
                                    <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-info-subtle text-info rounded-circle fs-4">
                                            <i className={item.icon}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </React.Fragment>
    );
};

export default Widgets;