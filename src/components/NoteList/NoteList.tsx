import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { Loader } from "../Loader/Loader";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export function NoteList({
  notes,
  onDelete,
  isDeleting,
  isLoading,
  isError,
}: NoteListProps) {
  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading notes</p>;
  if (!notes || notes.length === 0) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              disabled={isDeleting}
              onClick={() => onDelete(note.id)}
              className={css.button}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
