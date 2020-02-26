import React, { useEffect, useState, useCallback, ReactNode } from "react";
import { connect } from "react-redux";
import "./Home.scss";
import { getNotes, addNote } from "../../store/actions/notes";
import Notes from "./Notes/Notes";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import { Note, NewNote } from "types/note";
import { AppState } from "store/store";
import { AppActions } from "types/actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";

interface HomeProps {
  t: (key: string) => ReactNode
}

type Props = HomeProps & LinkStateProps & LinkDispatchProps;

const Home: React.FunctionComponent<Props> = ({ getNotes, data = [], addNote, t, loading }) => {
  const getNotesCallback = useCallback(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    getNotesCallback();
  }, [getNotesCallback]);

  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');

  const postNote = () => {
    const newData: NewNote = {
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
        <>
          {loading ? (
            <Spinner />
          ) : (
              <div className="home__card-container">
                {activeNotes
                  .map(note => <Notes {...note} key={note._id} />)
                  .reverse()}
              </div>
            )}
        </>
      ) : (
          <h1 className="home__empty">{t("homeEmpty")}</h1>
        )}

      <form onSubmit={submitChanges} className="home__add-note-form">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              {t("addForm.title")}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className="add-title"
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
            className="add-description"
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

interface LinkStateProps {
  data: Note[]
  loading: boolean
}

interface LinkDispatchProps {
  getNotes: () => void
  addNote: (newData: NewNote) => void
}

const mapStateToProps = (state: AppState, ownProps: HomeProps): LinkStateProps => {
  return {
    data: state.notes.data,
    loading: state.notes.loading
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomeProps): LinkDispatchProps => {
  return {
    getNotes: bindActionCreators(getNotes, dispatch),
    addNote: bindActionCreators(addNote, dispatch)
  }
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
