import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RP2 = () => {
  const counter = useSelector((bigState) => bigState.counterSlice.counter);
  return (
    <Fragment>
      <h2>{counter}</h2>
      <Link to="/rp1">to rp1</Link>
    </Fragment>
  );
};

export default RP2;
