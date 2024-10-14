import notecontext from "./Notecontext";
import { useState } from "react";
import Cookies from "js-cookie";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initalNotes = [];
  // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YUBnZiIsInVzZXJJZCI6IjY3MDIwYmI1OGViOTE3YWVhYWE3MzFhNyIsImlhdCI6MTcyODYzODc2M30.EaOmDjtUWQhYKFRn2jxzvmR5sQyc5L6yT9xjb5MO9V0";
  const [notes, setnotes] = useState(initalNotes);
  const addNote = async (id, title, description) => {
    // const token = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    //   "$1"
    // );
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const newNote = await response.json();
    setnotes([...notes, newNote]);
    getnote();
  };

  const getnote = async () => {
    if (Cookies.get("token")) {
      try {
        const response = await fetch(`${host}/notes/fetchnote`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching notes: ${response.statusText}`);
        }

        const fetchedNotes = await response.json();
        setnotes(fetchedNotes); // Set the fetched notes to state
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    } else {
      console.log("something went wrong");
    }
  };

  const deleteNote = async (id) => {
    let response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let notes1 = await response.json();
    console.log(notes1);
    const newNotes = notes.filter((note) => note._id !== id);
    setnotes(newNotes);
  };

  const editNote = async (id, title, description) => {
    const response = await fetch(
      `http://localhost:5000/notes/updatenote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));

    let newnotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        break;
      }
    }
    setnotes(newnotes);
  };
  return (
    <notecontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getnote }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;
