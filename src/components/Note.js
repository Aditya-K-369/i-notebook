import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import notecontext from "../context/Notecontext";
import AddNote from "./AddNote";
import cookies from "js-cookie";
const Note = () => {
  const context = useContext(notecontext);
  const { notes, getnote, editNote } = context;

  useEffect(() => {
    try {
      let value = cookies.get("token");
      if (value) {
        getnote();      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });
  const ref = useRef(null);
  const refClose = useRef(null); // To close the modal programmatically after submitting

  // This function is to handle launching the modal and setting the note's current data
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
    });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    // Add logic to handle the note update here (like calling an API to update the note)
    editNote(note.id, note.etitle, note.edescription);
    // Close the modal after updating
    refClose.current.click();
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      {/* Hidden button to trigger the modal */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary my-2 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    id="etitle"
                    value={note.etitle} // Correctly bind value to state
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription} // Correctly bind value to state
                    onChange={onchange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdateClick} // Submit updated note
                >
                  Save changes
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose} // Reference to close button to close programmatically
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying the notes */}
      <div className="row my-5">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} updatenote={updatenote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Note;
