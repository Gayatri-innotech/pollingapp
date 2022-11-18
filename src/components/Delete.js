import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { DeleteApiAction, GetApiAction } from "../redux/action/action";

const Delete = ({ id }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    dispatch(DeleteApiAction(id));
    setLoading(true)
    handleClose();
  };

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    dispatch(GetApiAction());
  };

  const handleShow = () => setShow(true);
  return (
    <>
      <span className="head">
        <FontAwesomeIcon
          className="trash"
          onClick={handleShow}
          icon={faTrash}
        />
      </span>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="mods" closeButton>
          <Modal.Title className="titles">Delete Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mods">
          Are you sure you want to delete? Poll Once you click on Confirm
          Delete, you cannot Undo it!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
              Confirm Delete
            </Button>
          ) : (
            <Button onClick={handleClick} variant="primary">
              Confirm Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Delete;
