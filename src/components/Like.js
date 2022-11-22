import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostVoteApiAction } from "../redux/action/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const Like = ({ idd, idss, iddd }) => {
  const [shows, setShows] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloses = () => {
    setShows(false);
  };

  const handleShows = () => setShows(true);
  const authState = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    dispatch(PostVoteApiAction(idd));
    handleCloses();
    // navigate(`/chart/${iddd}`);
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
          Are you sure you want to vote on this option? If yes click on Submit
          to vote and view Results. 
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>

          {loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Submit...
            </Button>
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
