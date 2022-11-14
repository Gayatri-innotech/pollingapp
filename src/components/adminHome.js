import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetApiAction, PostVoteApiAction } from "../redux/action/action";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/authSlice";
import Edit from "./Edit";
import Delete from "./Delete";
import DeleteOption from "./DeleteOption";
import Like from "./Like";

const AdminHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authSlice.user);
  const responseData = useSelector((state) => state.reducer.details);
  const dispatch = useDispatch();

  const handleOut = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    dispatch(GetApiAction());
  }, []);

  const result = responseData
    ? responseData.map((data, index) => {
        return (
          <div key={index}>
            <div className="card">
              <h5 className="card-header">
                {data["title"]}&nbsp;
                <span className="head">
                  {user?.role === "admin" && <Edit id={data._id} />}
                </span>
                <span className="head">
                  {user?.role === "admin" && <Delete id={data._id} />}
                </span>
              </h5>
              <div className="card-body">
                {data.options.map((item, index) => (
                  <h6 key={index}>
                    <span>
                      <span name={data["_id"]} value={item.option} />

                      <Like
                        idd={{ id: data._id, option: item.option }}
                        idss={item.option}
                        iddd={data._id}
                      />

                      {user?.role === "admin" && (
                        <DeleteOption
                          id={{ pollid: data._id, option: item.option }}
                          ids={item.option}
                        />
                      )}
                      {item.option}
                      <hr />
                    </span>{" "}
                    &nbsp;
                  </h6>
                ))}

                {user?.role === "admin" && (
                  <Link to={`/forms/${data._id}`}>
                    <button type="button" className="btnns">
                      + Add New Options
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })
    : null;

  return (
    <div className="container">
      <h1>Polling Page</h1>

      <button type="button" onClick={handleOut} className="btn btn-danger">
        Logout
      </button>

      {user?.role === "admin" && (
        <Link to="/form">
          <button type="button" className="btn btn-success">
            Add New Poll
          </button>
        </Link>
      )}

      {user?.role === "admin" && (
        <Link to="/user">
          <button type="button" className="btn btn-warning">
            List Users
          </button>
        </Link>
      )}
      <br />
      <br />
      <hr />
      <h1>{result}</h1>
    </div>
  );
};

export default AdminHome;
