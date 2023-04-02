import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./Orders.scss";

const Orders = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get("/orders").then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/${id}`);

      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post("/conversations", {
          to: currentUser.isSeller ? buyerId : sellerId,
        });

        navigate(`/message/${res.data.id}`);
      }
      console.log(error);
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>

          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/gig/${order.gigId}`}>
                      <img className="image" src={order.img} alt="" />
                    </Link>
                  </td>
                  <td>{order.title}</td>
                  <td>₹ {order.price}</td>
                  <td>
                    {currentUser.isSeller ? order.buyerId : order.sellerId}
                  </td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
                    />
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
