import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import "./Home.scss";
import { getNotes, addNote } from "../../store/actions/notes";
import Notes from "./Notes/Notes";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";

const Home = ({ getNotes, data = [], addNote, t }) => {
  const getNotesCallback = useCallback(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    getNotesCallback();
  }, [getNotesCallback]);

  const [note, setNote] = useState();
  const [title, setTitle] = useState();

  const postNote = () => {
    const newData = {
      description: note,
      title
    };
    addNote(newData);
  };

  const submitChanges = e => {
    const form = e.target;
    postNote();
    e.preventDefault();
    form.reset();
  };

  const activeNotes = data.filter(note => note.completed === false);

  return (
    <div className="home">
      {activeNotes.length ? (
        <div className="home__card-container">
          {activeNotes.map(note => (
            <Notes {...note} key={note._id} />
          ))}
        </div>
      ) : (
        <h1 className="home__empty">{t('homeEmpty')}</h1>
      )}

      <form onSubmit={submitChanges} className="home__add-note-form">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              {t("addForm.title")}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-describedby="basic-addon1"
            onChange={e => setTitle(e.target.value)}
            required
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
            onChange={e => setNote(e.target.value)}
            required
          />
        </InputGroup>

        <Button
          type="submit"
          variant="outline-primary"
          className="home__add-button"
        >
          {t("addForm.addButton")}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default withTranslation()(
  connect(mapStateToProps, { getNotes, addNote })(Home)
);
