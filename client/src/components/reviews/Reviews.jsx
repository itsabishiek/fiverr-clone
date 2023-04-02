import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "../review/Review";
import newRequest from "../../utils/newRequest";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      mutation.mutate({ gigId, desc, star });
      e.target[0].value = "";
      e.target[1].value = "";
    } catch (error) {
      console.log("handleSubmit Error", error);
    }
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}

      <div className="add">
        <h3>Add a review</h3>

        <form className="addForm" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write your opinion..." />
          <select>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
