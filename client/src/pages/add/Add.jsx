import React, { useReducer, useState } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import "./Add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const queryClient = useQueryClient();

  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(file);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFeature = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      mutation.mutate(state);
      navigate("/myGigs");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);

  return (
    <div className="add">
      <div className="container">
        <h1>Add new gig</h1>

        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="AI Artists">AI Artists</option>
              <option value="Web Design">Web Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Animation">Animation</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>

              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit}>Create</button>
          </div>

          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              name="shortTitle"
              type="text"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="">{`Delivery Time (e.g. 3 days)`}</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />

            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionTime" onChange={handleChange} />

            <label htmlFor="">Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button>
                    {f}{" "}
                    <span
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: f })
                      }
                    >
                      X
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
