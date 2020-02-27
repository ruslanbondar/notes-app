import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home.tsx";
import Cart from "../components/Cart/Cart";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </>
  );
};
export default Routes;
