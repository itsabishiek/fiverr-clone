import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Register.scss";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    try {
      const res = await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create new account</h1>

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="johndoe"
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
          />

          <label>Profile picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="India"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>I want to become a Seller</h1>

          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label>Phone number</label>
          <input
            type="text"
            name="phone"
            placeholder="+91 8934783324"
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="desc"
            placeholder="A short description of yourself"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>

          <span>
            {`Already have one? `}{" "}
            <Link to="/login" className="link" style={{ color: "#1dbf73" }}>
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
