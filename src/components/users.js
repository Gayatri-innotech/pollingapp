import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetApiUserAction } from "../redux/action/action";

const Users = () => {
  const dispatch = useDispatch();
  const responseData = useSelector((state) => state.reducer);
  console.log("data+++", responseData);
  useEffect(() => {
    dispatch(GetApiUserAction());
  }, [dispatch]);

  const result = responseData?.userDetails.length
    ? [...responseData?.userDetails].map((data, index) => {
        return (
          <div key={index}>
            <ul>
              <li>{data.username}</li>
            </ul>
          </div>
        );
      })
    : responseData.loading && (
        <div className="loaders">
          <img
            src="https://media0.giphy.com/media/LjGYFXjfRecLqqMkDQ/giphy.gif?cid=6c09b9524f9fb0dab4a2c066550b0f169f2dade72b11f58c&rid=giphy.gif&ct=ts"
            alt="Loading"
          />
        </div>
      );

  return (
    <div className="container">
      <Link to="/homes">
        <button className="btn btn-danger">Back</button>
      </Link>
      <div className="table">
        <div className="thead-dark">
          <h1>List Of Users</h1>
          <hr />
          <p className="results">{result}</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
