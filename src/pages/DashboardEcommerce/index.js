import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import { useDispatch } from "react-redux";
import { getProfileThunk, getRevenueChartDashboardData, getWidgetsData } from "../../slices/thunks";
import { formatDate } from "../../helpers/date_helper";
import { getGetCategoriesData } from "../../slices/categories/thunk";
import { useSelector } from "react-redux";

const DashboardEcommerce = () => {

  const [months, setMonths] = useState(12);
  document.title = "Dashboard | GK Dukaan - Ghar Ki Dukaan";
  const dispatch = useDispatch();


  const revenueDataRes = useSelector((state) => state.DashboardEcommerce.getRevenueChartDashboard)

  useEffect(() =>{
    dispatch(getProfileThunk())
  },[])
  
  useEffect(() => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30);
    let params = {
      fromDate: formatDate(pastDate),
      toDate: formatDate(currentDate)
    }
    fetchDashBoardApiData(params)
  }, [])
  useEffect(() => {
    let param = { months };
    dispatch(getRevenueChartDashboardData(param));
  }, [months, dispatch]);

  const fetchDashBoardApiData = (data) => {
    dispatch(getWidgetsData(data))
  }

  const onChangeChartPeriod = (number) => {
    setMonths(number)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section
                  fetchDashBoardApiData={fetchDashBoardApiData}
                />
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <Col xl={8}>
                    <Revenue handleChangeFnc={onChangeChartPeriod} revenueData={revenueDataRes} />
                  </Col>
                  <SalesByLocations />
                </Row>
                <Row>
                  <BestSellingProducts />
                  <TopSellers />
                </Row>
                <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
