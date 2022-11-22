import React, { useState, useEffect } from 'react';
import { PostOptionApiAction } from '../redux/action/action';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import getDetailsByHooks from '../hooks/getDetailsByHooks';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/esm/Spinner';

export const Forms1 = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [detailsById] = getDetailsByHooks(id);

  useEffect(() => {
    const data = () => {
      if (detailsById.data) {
        setTitle(detailsById.data.data['title']);
      }
    };
    data();
  }, [detailsById.data]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const clickHandler = (e) => {
    setLoading(true);
    if (title?.length === 0) {
      setError(true);
    } else {
      e.preventDefault();
      const finalData = {
        title: title,
      };
      dispatch(PostOptionApiAction(finalData, id));
      console.log('****', finalData);
      // navigate('/homes');
    }
  };
  return (
    <div className='container add'>
      <h1>Add New Option</h1>
      <input
        onChange={(e) => titleHandler(e)}
        type='text'
        placeholder='Add Options'
        className='form-control'
      />{' '}
      <br />
      <button onClick={clickHandler} className='btn btn-info'>
        Submit
      </button>
      {error && title.length <= 0 ? (
        <label className='error'>Input field can't be empty!</label>
      ) : (
        ''
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className='mods' closeButton>
          <Modal.Title className='mods'>Add Option</Modal.Title>
        </Modal.Header>
        <Modal.Body className='titles'>
          Are you sure you want to add this option? Once you click on Submit,
          the new option will be saved!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
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
              Submit...
            </Button>
          ) : (
            <Button onClick={clickHandler} variant='primary'>
              Confirm Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Link to='/homes'>
        <button className='btn btn-danger'>Back</button>
      </Link>
    </div>
  );
};

export default Forms1;
