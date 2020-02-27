import React from "react";
import "./CartItem.scss";
import { connect } from "react-redux";
import { deleteNote, updateNote } from "../../../store/actions/notes";
import deleteIcon from "../../../assets/trash.svg";
import restoreIcon from "../../../assets/restore.svg";
import { Card } from "react-bootstrap";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CompletedNote } from "types/note";

interface CartItemProps {
  _id: string
  description: string
  title: string
  completed: boolean
}

type Props = CartItemProps & LinkDispatchProps;

const CartItem: React.FunctionComponent<Props> = ({
  _id,
  description,
  title,
  completed,
  deleteNote,
  updateNote
}) => {
  const moveFromCart = () => {
    const newData: CompletedNote = {
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

interface LinkDispatchProps {
  deleteNote: (_id: string) => void
  updateNote: (newData: CompletedNote, _id: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: CartItemProps): LinkDispatchProps => {
  return {
    deleteNote: bindActionCreators(deleteNote, dispatch),
    updateNote: bindActionCreators(updateNote, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(CartItem);
