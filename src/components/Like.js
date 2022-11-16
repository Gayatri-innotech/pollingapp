import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostVoteApiAction } from "../redux/action/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Like = ({ idd, idss, iddd }) => {
  const [shows, setShows] = useState(false);

  const handleCloses = () => {
    setShows(false);
  };

  const handleShows = () => setShows(true);
  const authState = useSelector ((state) => state.authSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(PostVoteApiAction(idd));
    navigate(`/chart/${iddd}`);
  };

  return (
    <div>
      <input
        type="radio"
        className="like"
        name="select"
        value="radioval"
        onClick={handleShows}
      />

      <Modal
         show={shows}
         onHide={handleCloses}
         backdrop="static"
         keyboard={false}
       >
         <Modal.Header className="mods" closeButton>
           <Modal.Title className="mods">Confirm Voting</Modal.Title>
         </Modal.Header>
         <Modal.Body className="titles">
           Are you sure you want to vote on this option? If yes click on Submit to vote and view Results.
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleCloses}>
             Close
           </Button>

          {authState.loading ? (
              <div className="loader">
                <img
                  src="https://acegif.com/wp-content/uploads/loading-13.gif"
                  alt="Loading"
                />
              </div>
            ) : (
          
              <Button onClick={handleSubmit} variant="primary">
              Submit
            </Button>
            )}

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Like;
