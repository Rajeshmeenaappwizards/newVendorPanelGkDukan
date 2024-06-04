import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row } from "reactstrap";

const Pagination = ({ data, currentPage, setCurrentPage, perPageData }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / perPageData); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((nextPage) => Math.min(nextPage + 1, pageNumbers.length));
  };

  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [pageNumbers.length, currentPage, setCurrentPage]);

  const renderPageNumbers = () => {
    const totalPages = pageNumbers.length;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 3, totalPages);

    if (endPage - startPage < 3) {
      startPage = Math.max(endPage - 3, 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(
        <li className="page-item" key={i}>
          <Link
            to="#!"
            className={currentPage === i ? "page-link active" : "page-link"}
            onClick={() => handleClick(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return visiblePages;
  };

  return (
    <React.Fragment>
      <Row className="g-0 justify-content-end mb-4">
        <div className="col-sm-auto">
          <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            {currentPage <= 1 ? (
              <Link className="page-item pagination-prev disabled" to="#!">
                Previous
              </Link>
            ) : (
              <li className="page-item">
                <Link to="#!" className="page-link" onClick={handlePrevPage}>
                  Previous
                </Link>
              </li>
            )}
            {renderPageNumbers()}
            {currentPage >= pageNumbers.length ? (
              <Link className="page-item pagination-next disabled" to="#!">
                Next
              </Link>
            ) : (
              <li className="page-item">
                <Link to="#!" className="page-link" onClick={handleNextPage}>
                  Next
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
