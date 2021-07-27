import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';

const Customer = ({ customers }) => {
  return (
    <div className="customer">
      <div className="container">
        <h1 className="title">
          What customers say <br />
          about us
        </h1>

        <div className="list">
          <Swiper
            slidesPerView={2}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
              },
              '@0.75': {
                slidesPerView: 1,
              },
              '@1.00': {
                slidesPerView: 2,
              },
              '@1.50': {
                slidesPerView: 2,
              },
            }}
          >
            {customers.map((customer) => (
              <SwiperSlide key={customer.id}>
                <div className="item">
                  <div className="profile-image">
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${customer.imageUrl})` }}
                    ></div>
                  </div>
                  <div className="name">
                    <div className="sub-title">{customer.name}</div>
                    <h6>{customer.time}</h6>
                  </div>

                  <div className="desc">
                    <p>{customer.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Customer;
