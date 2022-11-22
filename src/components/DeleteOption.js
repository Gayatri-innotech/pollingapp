import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOptionApiAction } from '../redux/action/action';

const DeleteOption = ({ id, ids }) => {
  const [shows, setShows] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloses = () => {
    setShows(false);
  };

  const handleShows = () => setShows(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(DeleteOptionApiAction(id));
    setLoading(true);
  };

  return (
    <>
      <button className='remove' value={ids} onClick={handleShows}>
        X
      </button>
      <Modal
        show={shows}
        onHide={handleCloses}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className='mods' closeButton>
          <Modal.Title className='mods'>Delete Option</Modal.Title>
        </Modal.Header>
        <Modal.Body className='titles'>
          Are you sure you want to delete this option? Once you click on Confirm
          Delete, you cannot Undo it!!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloses}>
            Close
          </Button>
          {loading ? (
            <Button variant='primary' disabled>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Confirm Delete
            </Button>
          ) : (
            <Button onClick={handleDelete} variant='primary'>
              Confirm Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteOption;
