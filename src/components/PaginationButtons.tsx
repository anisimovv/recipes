import React, { type Dispatch, type SetStateAction } from 'react';
import classNames from 'classnames';

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const PaginationButtons = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const renderPageButtons = () => {
  //   const pageButtons = [currentPage - 1, currentPage, currentPage + 1].filter(
  //     (page) => page > 0 && page <= totalPages
  //   );

  //   return pageButtons.map((pageNumber) => (
  //     <button
  //       key={pageNumber}
  //       onClick={() => handlePageChange(pageNumber)}
  //       disabled={pageNumber === currentPage}
  //       className={classNames(
  //         'easy-in-out rounded border-2 border-solid border-black px-3 py-2 text-black duration-300',
  //         {
  //           'bg-black text-white': pageNumber === currentPage,
  //           'hover:bg-black hover:text-white': pageNumber !== currentPage,
  //         }
  //       )}
  //     >
  //       {pageNumber}
  //     </button>
  //   ));
  // };

  return (
    <div className="mb-3 flex justify-center gap-5">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={classNames(
          'easy-in-out rounded border-2 border-solid border-black px-3 py-2 text-black duration-300',
          {
            'border-slate-400 bg-slate-400 text-white': currentPage === 1,
            'hover:bg-black hover:text-white': currentPage !== 1,
          }
        )}
      >
        PREV
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          className={classNames(
            'easy-in-out rounded border-2 border-solid border-black px-3 py-2 text-black duration-300',
            {
              'bg-black text-white': pageNumber === currentPage,
              'hover:bg-black hover:text-white': pageNumber !== currentPage,
            }
          )}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={classNames(
          'easy-in-out rounded border-2 border-solid border-black px-3 py-2 text-black duration-300',
          {
            'border-slate-400 bg-slate-400 text-white':
              currentPage === totalPages,
            'hover:bg-black hover:text-white': currentPage !== totalPages,
          }
        )}
      >
        NEXT
      </button>
    </div>
  );
};

export default PaginationButtons;
