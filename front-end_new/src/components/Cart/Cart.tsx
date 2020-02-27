import React, { useEffect, useCallback, useState, ReactNode } from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { getNotes, deleteAll } from "../../store/actions/notes";
import CartItem from "./CartItem/CartItem";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import { Note } from "types/note";
import { AppState } from "store/store";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "types/actions";

interface CartProps {
  t: (key: string) => ReactNode
}

type Props = CartProps & LinkStateProps & LinkDispatchProps;

const Cart: React.FunctionComponent<Props> = ({ data = [], getNotes, deleteAll, t, loading }) => {
  const getNotesCallback = useCallback(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    getNotesCallback();
  }, [getNotesCallback]);

  const deletedNotes = data.filter(note => note.completed === true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {deletedNotes.length ? (
        <div className="clear-block">
          <Button variant="outline-danger" onClick={handleShow}>
            {t("clearButton")}
          </Button>
        </div>
      ) : null}

      {deletedNotes.length ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
              <div className="cart">
                {deletedNotes
                  .map(note => <CartItem key={note._id} {...note} />)
                  .reverse()}
              </div>
            )}
        </>
      ) : (
          <h1 className="empty-cart">{t("cartEmpty")}</h1>
        )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("confirmModal.question")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("confirmModal.text")}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              deleteAll();
            }}
          >
            {t("confirmModal.confirmButton")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("confirmModal.cancelButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface LinkStateProps {
  data: Note[]
  loading: boolean
}

interface LinkDispatchProps {
  getNotes: () => void
  deleteAll: () => void
}

const mapStateToProps = (state: AppState, ownProps: CartProps): LinkStateProps => {
  return {
    data: state.notes.data,
    loading: state.notes.loading
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: CartProps): LinkDispatchProps => {
  return {
    getNotes: bindActionCreators(getNotes, dispatch),
    deleteAll: bindActionCreators(deleteAll, dispatch)
  }
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
