import React from "react";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  return (
    <div>
      <NavLink
        to={props.link}
        exact
        activeStyle={{
          backgroundColor: `#ffd100`,
        }}
        className={props.buttonStyle}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Button;
