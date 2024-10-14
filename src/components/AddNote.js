import React, { useState, useContext } from "react";
import notecontext from "../context/Notecontext";

const AddNote = () => {
  const { addNote } = useContext(notecontext);

  const [note, setNotes] = useState({ title: "", description: "" });
  const clicked = (e) => {
    addNote(note._id, note.title, note.description);
    e.preventDefault();
  };

  const onchange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control description"
            id="description"
            name="description"
            onChange={onchange}
          />
        </div>
        <button type="submit" onClick={clicked} className="btn btn-primary">
          Add-Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
