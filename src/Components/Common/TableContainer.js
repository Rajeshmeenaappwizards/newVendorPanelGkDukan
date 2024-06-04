import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";

import {
  // Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  InvoiceListGlobalSearch,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
  CatalogGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";
import { useDispatch } from "react-redux";
import { setKeyword, setPage } from "../../slices/catalog/reducer";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import { setKeywordOrder, setPageOrder } from "../../slices/orders/reducer";
import {
  setKeywordProduct,
  setPageProduct,
} from "../../slices/product/reducer";
import {
  setKeywordSupport,
  setPageSupport,
} from "../../slices/supportTicket/reducer";
import {
  setEndDateCustomer,
  setKeywordCustomer,
  setPageCustomer,
  setStartDateCustomer,
} from "../../slices/customer/reducer";

// Column Filter
// const Filter = ({
//   column,
//   // table
// }) => {
//   const columnFilterValue = column.getFilterValue();

//   return (
//     <>
//       <DebouncedInput
//         type="text"
//         value={columnFilterValue ?? ""}
//         onChange={(event) => column.setFilterValue(event.target.value)}
//         placeholder="Search..."
//         className="w-36 border shadow rounded"
//         list={column.id + "list"}
//       />
//       <div className="h-1" />
//     </>
//   );
// };

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      id="search-bar-0"
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
const TableContainer = ({
  columns,
  data,
  total,
  header = true,
  isGlobalFilter,
  isProductsFilter,
  isCustomerFilter,
  isOrderFilter,
  isCatalogFilter,
  isContactsFilter,
  isCompaniesFilter,
  isLeadsFilter,
  isCryptoOrdersFilter,
  isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  pageRes,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const dispatch = useDispatch();

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    setPageSize,
    getState,
  } = table;

  // useEffect(() => {
  //   customPageSize && setPageSize(customPageSize);
  // }, [customPageSize, setPageSize]);

  const handleChangeInput = useCallback((value) => {
    if (isCatalogFilter) {
      dispatch(setKeyword(value));
    } else if (isOrderFilter) {
      dispatch(setKeywordOrder(value));
    } else if (isProductsFilter) {
      dispatch(setKeywordProduct(value));
    } else if (isTicketsListFilter) {
      dispatch(setKeywordSupport(value));
    } else if (isCustomerFilter) {
      dispatch(setKeywordCustomer(value));
    }
  }, []);

  const ourNextPage = throttle(() => {
    if (isCatalogFilter) {
      dispatch(setPage(pageRes + 1));
    } else if (isOrderFilter) {
      dispatch(setPageOrder(pageRes + 1));
    } else if (isProductsFilter) {
      dispatch(setPageProduct(pageRes + 1));
    } else if (isTicketsListFilter) {
      dispatch(setPageSupport(pageRes + 1));
    } else if (isCustomerFilter) {
      dispatch(setPageCustomer(pageRes + 1));
    }
  }, 1000);

  const ourPreviousPage = () => {
    if (isCatalogFilter) {
      dispatch(setPage(pageRes - 1));
    } else if (isOrderFilter) {
      dispatch(setPageOrder(pageRes - 1));
    } else if (isProductsFilter) {
      dispatch(setPageProduct(pageRes - 1));
    } else if (isTicketsListFilter) {
      dispatch(setPageSupport(pageRes - 1));
    } else if (isCustomerFilter) {
      dispatch(setPageCustomer(pageRes - 1));
    }
  };
  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody className={!header ? "border border-dashed border-end-0 border-start-0" : ""}>
            <form>
              <Row>
                {header && <Col sm={2}>
                  <div
                    className={
                      isProductsFilter ||
                        isContactsFilter ||
                        isCompaniesFilter ||
                        isNFTRankingFilter
                        ? "search-box me-2 mb-2 d-inline-block"
                        : "search-box me-2 mb-2 d-inline-block col-12"
                    }
                  >
                    <DebouncedInput
                      value={globalFilter ?? ""}
                      onChange={(value) => handleChangeInput(value)}
                      placeholder={SearchPlaceholder}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </Col>}
                {isProductsFilter && header && <ProductsGlobalFilter />}
                {isCustomerFilter && <CustomersGlobalFilter />}
                {isOrderFilter && <OrderGlobalFilter />}
                {isCatalogFilter && header && <CatalogGlobalFilter />}
                {isContactsFilter && <ContactsGlobalFilter />}
                {isCompaniesFilter && <CompaniesGlobalFilter />}
                {isLeadsFilter && <LeadsGlobalFilter />}
                {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
                {isInvoiceListFilter && <InvoiceListGlobalSearch />}
                {isTicketsListFilter && <TicketsListGlobalFilter />}
                {isNFTRankingFilter && <NFTRankingGlobalFilter />}
                {isTaskListFilter && <TaskListGlobalFilter />}
              </Row>
            </form>
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={thClass}
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ",
                          desc: " ",
                        }[header.column.getIsSorted()] ?? null}
                        {header.column.getCanFilter() ? (
                          <div>
                            {/* <Filter column={header.column} table={table} /> */}
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {data?.length === 0 && (
        <div className="py-4 text-center">
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/msoeawqm.json"
              trigger="loop"
              colors="primary:#405189,secondary:#0ab39c"
              style={{ width: "72px", height: "72px" }}
            ></lord-icon>
          </div>

          <div className="mt-4">
            <h5>Sorry! No Result Found</h5>
          </div>
        </div>
      )}

      {data && data.length > 0 && (
        <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
          <div className="col-sm">
            <div className="text-muted">
              Showing
              <span className="fw-semibold ms-1">
                {data?.length * pageRes}
              </span>{" "}
              of <span className="fw-semibold">{total}</span> Results
            </div>
          </div>
          <div className="col-sm-auto">
            <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
              <li
                className={pageRes === 1 ? "page-item disabled" : "page-item"}
              >
                <button to="#" className="page-link" onClick={ourPreviousPage}>
                  Previous
                </button>
              </li>
              <li className="page-item">
                <Link
                  to="#"
                  className={
                    pageRes === pageRes ? "page-link active" : "page-link"
                  }
                // onClick={() => dispatch(setPage(pageRes))}
                >
                  {pageRes}
                </Link>
              </li>
              {/* <li className="page-item">
              <Link
                to="#"
                className={
                  pageRes + 1 === pageRes
                    ? "page-link active"
                    : "page-link"
                }
                onClick={() => dispatch(setPage(pageRes + 1))}
              >
                {pageRes + 1}
              </Link>
            </li>
            <li className="page-item">
              <Link
                to="#"
                className={
                  pageRes + 2 === pageRes
                    ? "page-link active"
                    : "page-link"
                }
                onClick={() => dispatch(setPage(pageRes + 2))}
              >
                {pageRes + 2}
              </Link>
            </li> */}

              <li
                className={
                  data.length < 10 ? "page-item disabled" : "page-item"
                }
              >
                <button to="#" className="page-link" onClick={ourNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  );
};

export default TableContainer;
