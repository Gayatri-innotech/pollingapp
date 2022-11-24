import React, { useState, useEffect } from "react";
import { UpdateApiAction } from "../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getDetailsByHooks from "../hooks/getDetailsByHooks";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const UpdateDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [wrong, setWrong] = useState("");
  const [loading, setLoading] = useState(false);

  const authLoad = useSelector((state) => state.reducer.updateDetails);
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
      setLoading(true);
      console.log("****", finalData);
      navigate("/homes");
    }
  };

  return (
    <>
      {authLoad?.loading ? (
        <div className="loader">
          <img
            src="https://acegif.com/wp-content/uploads/loading-13.gif"
            alt="Loading"
          />
        </div>
      ) : (
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

          {authLoad?.error ? (
            <div>
              <label className="errors">ERROR</label>
            </div>
          ) : (
            <>
            {loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Confirm Delete
            </Button>
          ) : (
            <Button onClick={(e) => {
              clickHandler(e);
            }}
            className="btn btn-info" variant="primary">
              Update Title
            </Button>
          )}
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateDetails;
