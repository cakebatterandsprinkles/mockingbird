import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";

const ConfirmEmail = (props) => {
  const history = useHistory();
  const queryParams = new URLSearchParams(useLocation().search);

  const email = queryParams.get("email");
  const token = queryParams.get("token");

  if (!email || !token) {
    history.push("/signup");
    toast.error("Confirmation URL does not include user email or token.");
  }

  useEffect(() => {
    fetch("/confirm", {
      method: "POST",
      body: JSON.stringify({ email, token }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 200) {
        history.push("/signup");
        response.text().then((text) => toast.error(text));
      } else {
        history.push("/login");
        toast.success("Email confirmed successfully. You can login now!");
      }
    });
  }, [email, token, history]);

  return <div></div>;
};

export default ConfirmEmail;
