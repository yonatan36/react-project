import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const NestedRoutePage = () => {
  return (
    <Fragment>
      <h1>Nested page</h1>
      <Link to="/nr/nestedpage1">nested page 1</Link> |
      <Link to="/nr/nestedpage2">nested page 2</Link>
      <Outlet />
    </Fragment>
  );
};

export default NestedRoutePage;
