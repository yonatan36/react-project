import React from "react";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";
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
  return <Typography variant="h6">Nested page 1</Typography>;
};
export default NestedPage1;
