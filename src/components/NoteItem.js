import React, { useContext, useRef } from "react";
import notecontext from "../context/Notecontext";
const NoteItem = (props) => {
  const { note, updatenote } = props;
  const { deleteNote, editNote } = useContext(notecontext);
  const deletebutton = () => {
    deleteNote(note._id);
  };
  const editbutton = () => {
    updatenote(note);
    editNote(note._id, note.title, note.description);
  };

  return (
    <>
      <div className="card col-md-3 my-2 mx-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-3" onClick={deletebutton}></i>
          <i
            className="fa-solid fa-pen-to-square mx-3"
            onClick={editbutton}
          ></i>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
