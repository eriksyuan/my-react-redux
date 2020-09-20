export const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let mapListerner = [];
  function dispatch(action) {
    currentState = reducer(currentState, action);
    mapListerner.map((cb) => cb());
  }
  function getState() {
    return currentState;
  }
  function subscribe(fn) {
    mapListerner.push(fn);
  }
  dispatch({ type: "asdasdahjdfgjafsdg" });
  return {
    dispatch,
    getState,
    subscribe
  };
};
export function applyMidderware(...midware) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    const midApi = {
      dispatch: store.dispatch,
      getState: store.getState
    };
    const chain = midware.map((mid) => mid(midApi));
    const dispatch = compose(chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

function compose(args) {
  if (!args || args.length === 0) {
    return (arg) => arg;
  }
  if (args.length === 1) {
    return args[0];
  }
  return args.reduce(
    (left, right) => {
      return (...arg) => right(left(...arg));
    },
    () => {}
  );
}
