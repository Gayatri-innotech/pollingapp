import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
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
      {/* <FontAwesomeIcon
                className='like'
                value={idss}
                onClick={handleShows}
                icon={faThumbsUp}
            /> */}

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
        <Modal.Header closeButton>
          <Modal.Title>Confirm Voting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
