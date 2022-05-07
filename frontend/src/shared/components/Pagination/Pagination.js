import React from "react";

import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = (props) => {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={props.onPageChange}
      pageRangeDisplayed={props.pageRangeDisplayed}
      marginPagesDisplayed={props.marginPagesDisplayed}
      pageCount={props.pageCount}
      previousLabel="<"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
