import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import homeIcon from "../../assets/home.svg";
import trashIcon from "../../assets/trash-header.svg";
import { withTranslation } from "react-i18next";

const Header = ({ data = [], i18n }) => {
  const countCartItems = data.filter(note => note.completed === true).length;

  return (
    <div className="header">
      <Link to="/">
        <img src={homeIcon} alt="" />
      </Link>

      <div className="header__language-block">
        <span
          style={{ fontWeight: i18n.language === "en" && "bold" }}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </span>
        <span
          style={{ fontWeight: i18n.language === "cz" && "bold" }}
          onClick={() => {
            i18n.changeLanguage("cz");
          }}
        >
          CZ
        </span>
      </div>

      <div className="header__cart">
        <Link to="/cart">
          <img src={trashIcon} alt="" className="trash-icon" />
        </Link>
        {countCartItems ? (
          <span className="header__cart-counter">{countCartItems}</span>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default withTranslation()(connect(mapStateToProps, {})(Header));
