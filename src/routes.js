import React from "react";
import Login from "./components/login/login";

const routes = [
  { name: "Login", path: "/", exact: true, main: () => <Login /> }
];

export default routes;