import React from "react";
import "./styles.css";
import Demo from "./Demo";
import store from "./store/index";
import { Provider } from "./react-redux";
export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Demo />
      </div>
    </Provider>
  );
}
