import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routes from "./routes/routes";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
