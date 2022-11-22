import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetApiAction } from "../redux/action/action";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/authSlice";
import Edit from "./Edit";
import Delete from "./Delete";
import DeleteOption from "./DeleteOption";
import Like from "./Like";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authSlice.user);
  const responseData = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const handleOut = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    dispatch(GetApiAction());
  }, [dispatch]);

  const result = responseData?.details.length
    ? [...responseData?.details].reverse().map((data, index) => {
        return (
          <>
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
                        {/*{item.vote} */}
                        <hr />
                      </span>{" "}
                    </h6>
                  ))}

                  <Link to={`/chart/${data._id}`}>
                    <FontAwesomeIcon
                      className="results"
                      icon={faSquarePollVertical}
                    />
                  </Link>

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
          </>
        );
      })
    : responseData.loading && (
        <div className="loaders">
          <img
            src="https://ieee-pdf-express.org/Content/images/loading.gif"
            alt="Loading"
          />
        </div>
      );

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
            All Users
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
