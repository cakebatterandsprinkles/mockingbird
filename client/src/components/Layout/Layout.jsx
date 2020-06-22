import React, {Fragment} from "react";
import NavbarUser from "../NavbarUser/NavbarUser";
import NavbarLanding from "../NavbarLanding/NavbarLanding";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <Fragment>
      {props.isAuthenticated ? <NavbarUser /> : <NavbarLanding />}
      <main>{props.children}</main>
    </Fragment>
  );
};
export default layout;
