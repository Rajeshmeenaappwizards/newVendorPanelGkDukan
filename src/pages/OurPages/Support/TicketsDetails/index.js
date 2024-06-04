import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import Section from "./Section";
import TicketDescription from "./TicketDescription";
import TicketDetails from "./TicketDetails";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSupportTicket } from "../../../../slices/supportTicket/thunk";
import { useParams } from "react-router-dom";

const TicketsDetaiks = () => {
  const dispatch = useDispatch();
  const ticketId = useParams()._id;
  const [singleTicketDetails, setSingleTicketDetails] = useState({});

  const singleTicketData = useSelector(
    (state) => state.SupportTicket.singleSupportTicketState
  );

  const fetchData = (id) => {
    dispatch(getSingleSupportTicket(id));
  };

  useEffect(() => {
    fetchData(ticketId);
  }, [dispatch]);

  useEffect(() => {
    if (singleTicketData) {
      setSingleTicketDetails(singleTicketData);
    }
  }, [singleTicketData]);
  document.title = "Ticket Details | GK Dukaan - Ghar Ki Dukaan";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Section singleTicketDetails={singleTicketDetails} />
          </Row>
          <Row>
            <TicketDescription
              singleTicketDetails={singleTicketDetails}
              reFetchData={fetchData}
            />
            <TicketDetails singleTicketDetails={singleTicketDetails} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TicketsDetaiks;
