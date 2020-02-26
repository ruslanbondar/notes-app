export interface Note {
  _id: string;
  title: string;
  description: string;
  completed: false;
}

export interface NoteState {
  data: Note[];
  error: string;
  loading: boolean;
}
