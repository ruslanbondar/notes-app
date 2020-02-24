import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Cart from "../components/Cart/Cart";
// import Note from "../components/Note/Note";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        {/* <Route path="/note/:id" component={Note} /> */}
      </Switch>
    </>
  );
};
export default Routes;
