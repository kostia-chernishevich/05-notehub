import css from "./App.module.css";
import { Pagination } from "../Pagination/Pagination";
import { useState } from "react";
import { NoteList } from "../NoteList/NoteList";
import  { Modal } from "../Modal/Modal";
import { NoteForm } from "../NoteForm/NoteForm";
import { SearchBox } from "../SearchBox/SearchBox";
import { useDebounce } from 'use-debounce';
import { Toaster } from "react-hot-toast";


export default function App() {
    const [page, setPage] = useState(1);
    const perPage = 12;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const [search, setSearch] = useState("");

const [debouncedSearch] = useDebounce(search, 500);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={setSearch}/>
                <button onClick={openModal} className={css.button}>Create note +</button>
                   </header>
                
            <NoteList page={page} perPage={perPage} search={ debouncedSearch} />
                <Pagination page={page} totalPages={1}
                onChangePage={setPage} />
            {isModalOpen && (<Modal onClose={closeModal}>
                <NoteForm onClose={closeModal} />
                </Modal>)}
         
           <Toaster position="top-center"/>
     </div>
    )
}
