import * as axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

export const notesAPI = {
  async getNotes() {
    const res = await axios.get("notes");
    return res.data;
  },
  async getNoteById(id) {
    const res = await axios.get(`notes?${id}`);
    return res.data;
  },
  async addNote(newData) {
    const res = await axios.post("notes", newData);
    return res.data;
  },
  async updateNote(newData, id) {
    const res = await axios.put(`notes/${id}`, newData);
    return res.data;
  },
  async deleteNote(id) {
    const res = await axios.delete(`notes/${id}`);
    return res.data;
  },
  async deleteAll() {
    const res = await axios.delete("notes");
    return res.data;
  }
};
