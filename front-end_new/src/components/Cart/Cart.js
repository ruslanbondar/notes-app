import React, { useEffect, useCallback, useState } from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { getNotes, deleteAll } from "../../store/actions/notes";
import CartItem from "./CartItem/CartItem";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";

const Cart = ({ data = [], getNotes, deleteAll, t }) => {
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
            Clear
          </Button>
        </div>
      ) : null}

      {deletedNotes.length ? (
        <div className="cart">
          {deletedNotes.map(note => (
            <CartItem key={note._id} {...note} />
          ))}
        </div>
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

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default withTranslation()(
  connect(mapStateToProps, { getNotes, deleteAll })(Cart)
);
