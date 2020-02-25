import React from "react";
import "./CartItem.scss";
import { connect } from "react-redux";
import { deleteNote, updateNote } from "../../../store/actions/notes";
import deleteIcon from "../../../assets/trash.svg";
import restoreIcon from "../../../assets/restore.svg";
import { Card } from "react-bootstrap";

interface CartItemProps {
  description: string
  title: string,
  completed: boolean
  deleteNote: Function
  updateNote: Function
  _id: string
}

const CartItem = ({
  _id,
  description,
  title,
  completed,
  deleteNote,
  updateNote
}: CartItemProps) => {
  const moveFromCart = () => {
    const newData = {
      completed: !completed
    };
    updateNote(newData, _id);
  };

  return (
    <Card border="danger" style={{ width: "450px" }} className="cart-item">
      <Card.Header className="cart-item__header">
        <div className="cart-item__icons">
          <img
            src={restoreIcon}
            alt=""
            onClick={() => moveFromCart()}
            className="restore-note"
          />
          <img
            src={deleteIcon}
            alt=""
            onClick={() => deleteNote(_id)}
            className="remove-note"
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default connect(null, { deleteNote, updateNote })(CartItem);
