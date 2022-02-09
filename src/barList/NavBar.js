import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme } from '@mui/material/styles';

import "./NavBar.css";

export const NavBar = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("bar_user");
    return fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then((currentUser) => setName(currentUser.name));
  }, []);

  return (
    <Box sx={{ flexGrow: 20 }}>
      <AppBar position="static" style={{ background: '#f1982b;' }}>
        <Toolbar>
        
          <IconButton
            size="small"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: -3 }}
          ></IconButton>

          <Button  variant="h6" component={Link} sx={{ fontSize: 22} } to="/barlist"  >
            Home
          </Button>{" "}
          <Typography variant="h6"  sx={{ flexGrow: 265 }}>
          {name}
          </Typography>

  
            <Button className="logout" color="inherit" sx={{ flexGrow: 4 }}  href="/login"  onClick={() => {
            localStorage.removeItem("bar_user");
          }}>
              logout
            </Button>{" "}
         
        </Toolbar>
      </AppBar>
    </Box>
  );


};
