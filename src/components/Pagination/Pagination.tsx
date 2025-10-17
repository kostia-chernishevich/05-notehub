import css from "./Pagination.module.css";

import ReactPaginate from 'react-paginate';
  
interface PaginationProps {
    page: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

export function Pagination({ page, totalPages, onChangePage }: PaginationProps) {
    if (totalPages <= 1) return null;
    return(<ReactPaginate
	pageCount={totalPages}
	pageRangeDisplayed={5}
	marginPagesDisplayed={1}
	onPageChange={ event  => onChangePage(event.selected + 1)}
	forcePage={page - 1}
	containerClassName={css.pagination}
	activeClassName={css.active}
	nextLabel="→"
	previousLabel="←"
/>)
    
}