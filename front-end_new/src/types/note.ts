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

export interface UpdatedNote {
  title: string;
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
