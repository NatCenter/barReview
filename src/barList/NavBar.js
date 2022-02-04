import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

export const NavBar = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("bar_user");
    return fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then((currentUser) => setName(currentUser.name));
  }, []);

  return (
    <>
      <p>
        Hello {name} <Link to="/login">logout</Link>{" "}
        <Link to="/barlist"> Home</Link>
      </p>
    </>
  );
};
