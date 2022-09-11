import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
   const { pageSize, itemsCount, currentPage, onPageChange } = props;

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
               <a className="page-link">{page}</a>
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
