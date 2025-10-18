import css from "./App.module.css";
import { Pagination } from "../Pagination/Pagination";
import { useState, useEffect } from "react";
import { NoteList } from "../NoteList/NoteList";
import { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import { SearchBox } from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { Toaster, toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../services/noteService";

export default function App() {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const queryClient = useQueryClient();


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", page, perPage, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });


  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Note deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Error deleting note");
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

     
      {data?.notes && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          onDelete={(id) => mutation.mutate(id)}
          isDeleting={mutation.isPending}
          isLoading={isLoading}
          isError={isError}
        />
      )}

      
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChangePage={setPage} />
      )}

      
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <Toaster position="top-center" />
    </div>
  );
}
