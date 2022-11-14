import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  user: localStorage.getItem("user"),
  loading: "",
  error: "",
};

export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  const res = await fetch(
    `https://secure-refuge-14993.herokuapp.com/add_user?username=${body.name}&password=${body.password}&role=${body.role}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body)
    }
  );
  return await res.json();
});

export const getToken = async ({ username, password }) => {
  const res = await fetch(
    `https://secure-refuge-14993.herokuapp.com/login?username=${username}&password=${password}`
  );
  return await res.json();
};

export const signInUser = createAsyncThunk("signinuser", async (body) => {
  const res = await fetch(
    `https://secure-refuge-14993.herokuapp.com/list_users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const jsonRes = await res.json();
  const loggedIn = jsonRes.data.find(
    (user) => user.username === body.username && user.password === body.pass
  );

  if (loggedIn) {
    const { token } = await getToken({
      username: body.username,
      password: body.pass,
    });
    loggedIn.token = token;
    return { user: loggedIn };
  }

  return { error: "User does not exist" };
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },

    addUser: (state, action) => {
      state.token = localStorage.getItem("user");
    },

    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [signInUser.pending]: (state, action) => {
      state.loading = true;
    },
    // register user
    [signInUser.fulfilled]: (state, { payload: { error, user } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.user = user;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(user));
      }
    }, // reg success
    [signInUser.rejected]: (state, action) => {
      state.loading = false;
    },

    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },

    [signUpUser.fulfilled]: (
      state,
      { payload: { error, msg, token, data } }
    ) => {
      console.log(error, msg, token, data);
      state.loading = false;
      if (error) {
        state.error = data;
      } else {
        state.msg = msg;
        state.error = null;
      }
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
