import React, { useState, useContext, useEffect } from "react";

const Context = React.createContext();

export function Provider(props) {
  return (
    <Context.Provider value={props.store}>{props.children}</Context.Provider>
  );
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (Comp) => {
    return () => {
      const store = useContext(Context);

      function getProps() {
        const state = mapStateToProps(store.getState());
        const dispatch = bindActionCreators(mapDispatchToProps, store.dispatch);
        return {
          ...state,
          ...dispatch
        };
      }
      const [props, setProps] = useState(getProps());
      useEffect(() => {
        store.subscribe(() => {
          setProps({ ...props, ...getProps() });
        });
      });
      return <Comp {...props} />;
    };
  };
}
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch);
    return ret;
  }, {});
}
