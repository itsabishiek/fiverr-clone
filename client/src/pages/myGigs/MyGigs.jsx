import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";
import "./MyGigs.scss";

const MyGigs = () => {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  console.log(getCurrentUser()?._id);

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>

          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add new gig</button>
            </Link>
          )}
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>

          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <Link to={`/gig/${gig._id}`}>
                      <img className="image" src={gig.cover} alt="" />
                    </Link>
                  </td>
                  <td>{gig.title}</td>
                  <td>₹ {gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      src="./img/delete.png"
                      className="delete"
                      alt=""
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
