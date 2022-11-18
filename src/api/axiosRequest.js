import axios from "axios";
import store from "../redux/store";

export async function AxiosRequest(url, method, headers, params) {
  return axios({
    url: url,
    method: method,
    headers: headers,
    data: params ?? {},
  });
}

const GetApiDetails = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/list_polls`,
    "GET",
    headers,
    {}
  );
};

const GetApiDetailsUser = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/list_users`,
    "GET",
    headers,
    {}
  );
};

const PostApiDetails = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/add_poll?title=${
      data["title"]
    }&options=${data["options"].map((o) => o.option).join("____")}`,
    "POST",
    headers,
    data
  );
};

const PostVoteApiDetails = (payload) => {
  const headers = {
    access_token: store.getState().authSlice.user.token,
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/do_vote?option_text=${payload.option}&id=` +
      payload.id,
    "POST",
    headers,
    payload
  );
};

const GetDetailsById = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/list_poll?id=` + id,
    "GET",
    headers,
    {}
  );
};

const UpdateApiDetails = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/update_poll_title?title=${data["title"]}&id=` +
      id,
    "PUT",
    headers,
    data
  );
};

const DeleteApiDetails = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/delete_poll?id=` + id,
    "DELETE",
    headers,
    {}
  );
};

const DeleteOptionApiDetails = (payload) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/delete_poll_option?option_text=${payload.option}&id=` +
      payload.pollid,
    "DELETE",
    headers,
    payload
  );
};

const PostOptionApiDetails = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxiosRequest(
    `https://secure-refuge-14993.herokuapp.com/add_new_option?option_text=${data["title"]}&id=` +
      id,
    "POST",
    headers,
    data
  );
};

export {
  GetApiDetails,
  PostApiDetails,
  GetDetailsById,
  UpdateApiDetails,
  DeleteApiDetails,
  GetApiDetailsUser,
  DeleteOptionApiDetails,
  PostOptionApiDetails,
  PostVoteApiDetails,
};
