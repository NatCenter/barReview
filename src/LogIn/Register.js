import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "./logInAndRegister.css"
export const Register = () => {
  const [user, setUser] = useState({});
  const conflicingDialog = useRef();
  const history = useHistory();
  const checkForExistingUser = () => {
    return fetch("http://localhost:8088/users?email=${users.email}")
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handletheUserRegistion = (e) => {
    e.preventDefault();
    checkForExistingUser().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("bar_user", createdUser.id);
              history.push("/barlist");
            }
          });
      } else {
        conflicingDialog.current.showModal();
      }
    });
  };
  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
    console.log(setUser(copy));
  };
  return (
    <>
      <div class="RegisterEmailBackground">

      <form className="registerForm" onSubmit={handletheUserRegistion}>
        <h1>Register Email </h1>
        <p>
          E-mail: <input type="text" id="email" onChange={updateUser} />
        </p>
        <p>
          Name: <input type="text" id="name" onChange={updateUser} />
        </p>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
      </div>
    </>
  );
};
