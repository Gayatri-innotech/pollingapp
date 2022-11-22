import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Edit = ({ id }) => {
  return (
    <Link to={`/edit/${id}`}>
      <span className='head'>
        <FontAwesomeIcon className='pen' icon={faPen} />
      </span>
    </Link>
  );
};

export default Edit;
