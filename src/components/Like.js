import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostVoteApiAction } from "../redux/action/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Like = ({ idd, idss, iddd }) => {
  const [shows, setShows] = useState(false);
  const [show, setShow] = useState(false);

  const handleCloses = () => {
    setShows(false);
  };

  const handleShows = () => setShows(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(PostVoteApiAction(idd));
    setShow(!show);
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
        onClick={handleShows}
      >
        <Modal.Header className="mods" closeButton>
          <Modal.Title className="titles">Confirm Voting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mods">
          Click on View Results to check the number of votes! If you do not want
          to vote click on close.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
          <Button onClick={handleClick} variant="primary">
            {show === true ? "View Results" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Like;
