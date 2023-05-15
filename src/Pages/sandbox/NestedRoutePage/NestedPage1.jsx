import { useEffect } from "react";

let intervalId;

const NestedPage1 = () => {
  useEffect(() => {
    console.log("component loaded");
    intervalId = setInterval(() => {
      console.log("yes");
    }, 1000);
    return () => {
      clearInterval(intervalId);
      console.log("component terminated");
    };
  }, []);
  return <h2>Nested page 1</h2>;
};
export default NestedPage1;
