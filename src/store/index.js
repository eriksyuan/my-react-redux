import { createStore, applyMidderware } from "../redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state;
  }
};
const store = createStore(reducer, applyMidderware(logger));

export default store;

function logger({ dispatch, getState }) {
  return (dispatch) => (action) => {
    console.log(action.type, getState());
    return dispatch(action);
  };
}
