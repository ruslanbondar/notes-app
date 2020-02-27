import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import homeIcon from "../../assets/home.svg";
import trashIcon from "../../assets/trash-header.svg";
import { withTranslation } from "react-i18next";
import { Note } from "types/note";
import { AppState } from "store/store";

interface HeaderProps {
  i18n: { language: string, changeLanguage: (key: string) => void }
}

type Props = HeaderProps & LinkStateProps;

const Header: React.FunctionComponent<Props> = ({ data = [], i18n }) => {
  const countCartItems = data.filter(note => note.completed === true).length;

  return (
    <div className="header">
      <Link to="/">
        <img src={homeIcon} alt="" />
      </Link>

      <div className="header__language-block">
        <span
          style={{ fontWeight: i18n.language === "en" && "bold" } as React.CSSProperties}
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </span>
        <span
          style={{ fontWeight: i18n.language === "cz" && "bold" } as React.CSSProperties}
          onClick={() => i18n.changeLanguage("cz")}
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

interface LinkStateProps {
  data: Note[]
}

const mapStateToProps = (state: AppState, ownProps: HeaderProps): LinkStateProps => {
  return {
    data: state.notes.data
  };
};

export default withTranslation()(connect(mapStateToProps, {})(Header));
