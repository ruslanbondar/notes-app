import React, { useEffect, useState, ReactNode, FormEvent } from "react";
import "./Notes.scss";
import { connect } from "react-redux";
import { updateNote, completeNote } from "../../../store/actions/notes";
import deleteButton from "../../../assets/delete.svg";
import editButton from "../../../assets/edit.svg";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { UpdatedNote, CompletedNote } from "types/note";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface NotesProps {
  t: (key: string) => ReactNode
  _id: string
  description: string
  title: string
  completed: boolean
}

type Props = NotesProps & LinkDispatchProps;

const Notes: React.FunctionComponent<Props> = ({ updateNote, _id, description, title, completed, t, completeNote }) => {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (note || newTitle) {
      setNote(note);
      setNewTitle(newTitle);
    }
  }, [note, newTitle]);

  const setUpdate = () => {
    const newData: UpdatedNote = {
      description: note,
      title: newTitle
    };
    updateNote(newData, _id);
  };

  const moveToCart = () => {
    const newData: CompletedNote = {
      completed: !completed
    };
    completeNote(newData, _id);
  };

  const submitChanges = (e: FormEvent<HTMLFormElement>) => {
    setUpdate();
    setEditing(false);
    e.preventDefault();
  };

  return (
    <div className="notes-container">
      {!editing ? (
        <Card border="success" style={{ width: "335px" }}>
          <Card.Header className="notes-container__header">
            <div className="notes-container__icons">
              <img src={editButton} alt="" onClick={() => setEditing(true)} className="edit-note" />
              <img
                src={deleteButton}
                alt=""
                onClick={() => moveToCart()}
                className="delete-note"
              />
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title className="note-title">{title}</Card.Title>
            <Card.Text className="note-description">{description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
          <div className="notes-container__editing">
            <form onSubmit={submitChanges}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {t("addForm.title")}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-describedby="basic-addon1"
                  defaultValue={title}
                  onChange={e => setNewTitle(e.target.value)}
                  className="title-edit"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {t("addForm.description")}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-describedby="basic-addon1"
                  defaultValue={description}
                  onChange={e => setNote(e.target.value)}
                  className="description-edit"
                />
              </InputGroup>

              <div className="note-container__save-button">
                <Button type="submit" variant="outline-primary" className="update-button">
                  {t("saveButton")}
                </Button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
};

interface LinkDispatchProps {
  updateNote: (newData: UpdatedNote, _id: string) => void
  completeNote: (newData: CompletedNote, _id: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: NotesProps): LinkDispatchProps => {
  return {
    updateNote: bindActionCreators(updateNote, dispatch),
    completeNote: bindActionCreators(completeNote, dispatch)
  }
}

export default withTranslation()(connect(null, mapDispatchToProps)(Notes));
