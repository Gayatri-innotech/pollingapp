import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetApiUserAction } from '../redux/action/action';

const Users = () => {
    const dispatch = useDispatch();
    const responseData = useSelector((state) => state.reducer.userDetails);
    console.log('data+++', responseData);
    useEffect(() => {
        dispatch(GetApiUserAction());
    }, [dispatch]);

    const result = responseData?.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.username}</td>
            </tr>

        )
    })

    return (
        <div
            className='container'>

            <Link
                to='/homes'>
                <button
                    className='btn btn-danger'>
                    Back
                </button>

            </Link>
            <table
                className="table">
                <thead
                    className="thead-dark">
                    <tr>
                        <th
                            scope="col">
                            List Of Users
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <>{result}</>
                </tbody>
            </table>

        </div>
    )
}

export default Users