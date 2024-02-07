export const SET_TOKEN = "SET_TOKEN";

//Create a file for your Redux actions.
//setToken is an action
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

