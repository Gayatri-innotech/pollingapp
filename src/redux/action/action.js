import {
    GetApiDetails, PostApiDetails, UpdateApiDetails, DeleteApiDetails, GetApiDetailsUser,
    DeleteOptionApiDetails, PostOptionApiDetails, PostVoteApiDetails
} from "../../api/axiosRequest";

const GetApiAction = () => {
    return function (dispatch) {
        return GetApiDetails().then((res) => {
            console.log('GetApiAction Response', res);
            dispatch({
                type: 'GET_DETAILS',
                payload: res.data.data,
            })
        })
    };
};

const GetApiUserAction = () => {
    return function (dispatch) {
        return GetApiDetailsUser().then((res) => {
            console.log('GetApiUserAction Response', res);
            dispatch({
                type: 'GET_DETAILS_USER',
                payload: res.data.data,
            })
        })
    };
};

const PostApiAction = (request) => {
    return function (dispatch) {
        return PostApiDetails(request).then((res) => {
            console.log('PostApiAction Response', res);
            dispatch({
                type: 'POST_DETAILS',
                payload: true,
            });
        });
    };
};

const PostVoteApiAction = (request) => {
    console.log('REQ', request);
    return function (dispatch) {
        return PostVoteApiDetails(request).then((res) => {

            dispatch({
                type: 'POST_VOTE_DETAILS',
                payload: request,
            });
        });
    };
};

const UpdateApiAction = (request, id) => {
    return function (dispatch) {
        return UpdateApiDetails(request, id).then((res) => {
            console.log('UpdateApiAction Response', res);
            dispatch({
                type: 'UPDATE_DETAILS',
                payload: true,
            })
        })
    };
};

const DeleteApiAction = (id) => {
    return function (dispatch) {
        return DeleteApiDetails(id).then((res) => {
            console.log('DeleteApiAction Response', res);
            dispatch({
                type: 'DELETE_DETAILS',
                payload: true,
            })
            dispatch(GetApiAction())
        })
    };
};

const DeleteOptionApiAction = (request) => {
    return function (dispatch) {
        return DeleteOptionApiDetails(request).then((res) => {
            console.log('DeleteOptionApiAction Response', res);
            dispatch({
                type: 'DELETE_OPTION_DETAILS',
                payload: request,
            })
            dispatch(GetApiAction())
        })
    };
};

const PostOptionApiAction = (request, id) => {
    return function (dispatch) {
        return PostOptionApiDetails(request, id).then((res) => {
            console.log('PostOptionApiAction Response', res);
            dispatch({
                type: 'POST_OPTION_DETAILS',
                payload: '',
            });
        });
    };
};

export { GetApiAction, PostApiAction, UpdateApiAction, DeleteApiAction, GetApiUserAction, DeleteOptionApiAction, PostOptionApiAction, PostVoteApiAction };