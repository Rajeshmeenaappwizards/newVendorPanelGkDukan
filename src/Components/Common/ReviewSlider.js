import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardBody } from "reactstrap";
import avatar3 from "../../assets/images/users/avatar-3.jpg";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Mousewheel } from "swiper/modules";
import StarRating from "./StarRating";

const ReviewSlider = ({ reviewData, key }) => {
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={2}
      spaceBetween={5}
      mousewheel={true}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Mousewheel]}
      className="mySwiper vertical-swiper"
      style={{ height: "250px" }}
    >
      <SwiperSlide>
        <Card className="border border-dashed shadow-none">
          <CardBody>
            <div className="d-flex">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <img src={avatar3} alt="" height="30" />
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <div>
                  <p className="text-muted mb-1 fst-italic text-truncate-two-lines">
                    {reviewData.comment}
                  </p>
                  <StarRating rating={reviewData.rating} />
                </div>
                <div className="text-end mb-0 text-muted">
                  - by <cite title="Source Title">{reviewData?.customer_id?.name || reviewData?.customer_id?.phoneNumber}</cite>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </SwiperSlide>
    </Swiper>
  );
};

export default ReviewSlider;

