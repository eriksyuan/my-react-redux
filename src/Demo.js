import React from "react";

import { connect } from "./react-redux";
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { counter, add } = this.props;
    return (
      <div>
        <h1>Demo Page</h1>
        <span>counter:{counter}</span>
        <button onClick={(e) => add(e.target)}>add</button>
      </div>
    );
  }
}

export default connect((state) => ({ counter: state }), {
  add: (e) => {
    console.log(e);
    return { type: "add" };
  }
})(Demo);
