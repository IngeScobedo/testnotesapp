import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const NotesLayout = memo(() => {
  console.log("render NotesLayout");
  const { notes } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.login);

  const userNotes = notes.filter((note) => note.user === user.name);

  return (
    <div className="flex justify-center w-full" >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {userNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>
    </div>
  );
});

export default NotesLayout;
