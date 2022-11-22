import React, { useState, useEffect } from "react";
import { UpdateApiAction } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getDetailsByHooks from "../hooks/getDetailsByHooks";
import { Link } from "react-router-dom";

export const UpdateDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [wrong, setWrong] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [detailsById] = getDetailsByHooks(id);
  useEffect(() => {
    const data = () => {
      if (detailsById.data) {
        setTitle(detailsById.data.data["title"]);
      }
    };
    data();
  }, [detailsById.data]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const clickHandler = (e) => {
    if (title?.length === 0) {
      setWrong(true);
    } else {
      e.preventDefault();
      const finalData = {
        title: title,
      };
      dispatch(UpdateApiAction(finalData, id));
      console.log("****", finalData);
      navigate("/homes");
    }
  };

  return (
    <div className="container">
      <h1>Edit Details</h1>

      <input
        defaultValue={title}
        onChange={(e) => titleHandler(e)}
        type="text"
        placeholder="Add Title"
        className="form-control"
      />
      <br />

      <button
        onClick={(e) => {
          clickHandler(e);
        }}
        className="btn btn-info"
      >
        Update Title
      </button>

      {wrong && title.length <= 0 ? (
        <label className="errors">Title can't be empty!</label>
      ) : (
        ""
      )}

      <Link to="/homes">
        <button className="btn btn-danger">Back</button>
      </Link>
    </div>
  );
};

export default UpdateDetails;
