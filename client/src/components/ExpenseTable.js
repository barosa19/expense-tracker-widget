import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseForm from "./AddExpenseForm";
import FilterTable from "./FilterTable";
import Spinner from 'react-bootstrap/Spinner';
import { GlobalContext } from "../contexts/GlobalContext";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function ExpenseTable() {
  const { darkMode, setShowModal } = React.useContext(GlobalContext)
  const { data, error, isLoading } = useGetExpenses();
  const [expense, setExpense] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setExpense(data);
      setShowModal(false)
    }
  }, [data]);


  const columns = React.useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: (props) => {
          const date = new Date(props.getValue())
          return (
            <span key={props.id} value={props.getValue()}>{date.toLocaleDateString("en-GB", {  
              day: "2-digit", month: "short", year: "numeric"})}</span>
          );
        },
        enableColumnFilter: false,
        sortingFN: 'datetime'
      },
      {
        accessorKey: "name",
        id: "name",
        header: "Name",
        enableColumnFilter: false,
      },
      {
        accessorKey: "category",
        header: "",
        cell: (props) => <text className={`${props.getValue().split(" ")[0]}-custom category-tag-spacing `}>{props.getValue()}</text>,
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (props) => <span className="text-end">NOK {props.getValue()}</span>,
        enableColumnFilter: false,
      }
    ],
    []
  );

  const table = useReactTable({
    data: expense,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    initialState: {
      sorting: [
        {
          id: 'date',
          desc: true, 
        },
      ],
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  if (isLoading) {
    return (
      <div className={`text-center ${darkMode ? "text-light" : "text-dark"}`}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        <p>Failed to load expenses: {error.message}</p>
      </div>
    );
  }
  if (data?.length == 0){
    setShowModal(true)
    return <AddExpenseForm></AddExpenseForm>
  }

  return (
    <div className="container " data-bs-theme={darkMode ? "dark" : "light"}>
      <div className="border border-5 rounded-4 table-responsive mx-auto">
      <table className=" table table-striped table-hover">
        <thead className="px-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div {...{ className: header.column.getCanSort() ? "cursor-pointer select-none" : ""}}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.getCanFilter() ? (<FilterTable column={header.column} />) : null}
                          {"  "}
                          {header.column.getCanSort() && !header.column.getIsSorted() 
                          ? (<i className="bi bi-arrow-down-up" onClick={header.column.getToggleSortingHandler()}></i>) 
                          : header.column.getIsSorted() === 'asc' ? (<i className="bi bi-arrow-up" onClick={header.column.getToggleSortingHandler()}></i>) 
                          : header.column.getIsSorted() === 'desc' ? (<i className="bi bi-arrow-down" onClick={header.column.getToggleSortingHandler()}></i>) : null}

                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>{flexRender( cell.column.columnDef.cell, cell.getContext())}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 pb-2">
        <button
          className={`border rounded ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="bi bi-rewind-fill" ></i>
        </button>
        <button
          className={`border rounded ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <select className="border rounded btn-light mx-2 mb-2"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button
          className={`border rounded ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
        <button
          className={`border rounded ${darkMode ? "bg-light text-dark" : "bg-dark text-light"}`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <i className="bi bi-fast-forward-fill"></i>
        </button>
      </div>
      </div>
    </div>
  );
}

export default ExpenseTable;
