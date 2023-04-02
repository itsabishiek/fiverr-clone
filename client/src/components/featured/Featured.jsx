import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";

const Featured = () => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> <br /> services for your
            business
          </h1>

          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>

          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => navigate(`/gigs?category=Web Design`)}>
              Web Design
            </button>
            <button onClick={() => navigate(`/gigs?category=AI Artists`)}>
              AI Artists
            </button>
            <button onClick={() => navigate(`/gigs?category=Mobile App`)}>
              Mobile App
            </button>
            <button>Logo Design</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
