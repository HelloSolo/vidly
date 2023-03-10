import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ pageSize, itemsCount, currentPage, onPageChange }) => {
   const pageCount = Math.ceil(itemsCount / pageSize);
   if (pageCount === 1) return null;

   const pages = _.range(1, pageCount + 1);

   return (
      <ul className="pagination">
         {pages.map((page) => (
            <li
               onClick={() => onPageChange(page)}
               style={{ cursor: "pointer" }}
               className={
                  currentPage === page ? "page-item active" : "page-item"
               }
               key={page}
            >
               <span className="page-link">{page}</span>
            </li>
         ))}
      </ul>
   );
};

Pagination.propTypes = {
   pageSize: PropTypes.number.isRequired,
   itemsCount: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
