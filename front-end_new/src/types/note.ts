export interface Note {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface NewNote {
  title: string;
  description: string;
}

export interface UpdatedTitle {
  title: string;
}

export interface UpdatedDescription {
  description: string;
}

export interface CompletedNote {
  completed: boolean
}

export interface NoteState {
  data: Note[];
  error: string;
  loading: boolean;
}
