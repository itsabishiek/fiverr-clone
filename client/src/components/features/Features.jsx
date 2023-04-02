import React from "react";
import "./Features.scss";

const Features = ({ dark }) => {
  return (
    <>
      {!dark && (
        <div className="features">
          <div className="container">
            <div className="item">
              <h1>A whole world of freelance talent at your fingertips</h1>

              <div className="title">
                <img src="/img/check.png" alt="" />
                The best for every budget
              </div>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>

              <div className="title">
                <img src="./img/check.png" alt="" />
                Quality work done quickly
              </div>
              <p>
                Find the right freelancer to begin working on your project
                within minutes.
              </p>
              <div className="title">
                <img src="./img/check.png" alt="" />
                Protected payments, every time
              </div>
              <p>
                {`Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.`}
              </p>
              <div className="title">
                <img src="./img/check.png" alt="" />
                24/7 support
              </div>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </div>

            <div className="item">
              <video src="/video/video.mp4" controls />
            </div>
          </div>
        </div>
      )}

      {dark && (
        <div className="features dark">
          <div className="container">
            <div className="item">
              <h1>
                fiverr <i>business.</i>
              </h1>
              <h1>
                A business solution designed for <i>teams</i>
              </h1>
              <p>
                Upgrade to a curated experience packed with tools and benefits,
                dedicated to businesses
              </p>
              <div className="title">
                <img src="./img/check.png" alt="" />
                Connect to freelancers with proven business experience
              </div>

              <div className="title">
                <img src="./img/check.png" alt="" />
                Get matched with the perfect talent by a customer success
                manager
              </div>

              <div className="title">
                <img src="./img/check.png" alt="" />
                Manage teamwork and boost productivity with one powerful
                workspace
              </div>
              <button>Explore Liverr Business</button>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Features;
