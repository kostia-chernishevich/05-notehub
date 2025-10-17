import { fetchNotes, deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import toast from "react-hot-toast";
import { Loader } from "../Loader/Loader";





interface NoteListProps {
    page: number;
    perPage: number;
    search?: string;
}


export  function NoteList({page, perPage, search }: NoteListProps) {
    const { data, isError, isLoading } = useQuery({
      queryKey: ['notes', page, perPage, search],
      queryFn: () => fetchNotes({ page, perPage, search }),
  });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            toast.success("Note deleted")
            queryClient.invalidateQueries({ queryKey: ['notes'] });

        },
        onError: () => {
            toast.error("Error deleting note")
        }
    });

    if (isLoading) return <Loader/>;
    if (isError) return <p> Error loading notes</p>;
    if (!data || data.notes.length === 0) return <p>No notes found</p>;

    return (
        <ul className={css.list}>
            {data.notes.map((note: Note) => (
         <li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{ note.content}</p>
    <div className={css.footer}>
                        <span className={css.tag}>{ note.tag}</span>
      <button disabled={mutation.isPending} onClick={()=> mutation.mutate(note.id)} className={css.button}>Delete</button>
    </div>
  </li>
    ))}
 
</ul>
    )
}