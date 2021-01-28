import React, { Fragment } from "react";
import NavbarLanding from "../NavbarLanding/NavbarLanding";
import NavbarUser from "../NavbarUser/NavbarUser";

const layout = (props) => {
  return (
    <Fragment>
      {props.isAuthenticated ? <NavbarUser /> : <NavbarLanding />}
      <main>{props.children}</main>
    </Fragment>
  );
};
export default layout;
