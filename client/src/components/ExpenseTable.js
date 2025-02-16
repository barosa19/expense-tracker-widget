import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseForm from "./AddExpenseForm";
import FilterTable from "./FilterTable";
import "../color.css"
import Spinner from 'react-bootstrap/Spinner';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function ExpenseTable() {
  const { data, error, isLoading } = useGetExpenses();
  const [expense, setExpense] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setExpense(data);
    }
  }, [data]);
  const [columnFilters, setColumnFilters] = React.useState([]);

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
        header: "Header",
        enableColumnFilter: false,
      },
      {
        accessorKey: "category",
        header: "",
        cell: (props) => <span className={`bg-${props.getValue().split(" ")[0]}-custom bg-spacing `}>{props.getValue()}</span>,
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (props) => <span className="text-end">NOK ${props.getValue()}</span>,
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

  return (
    <div className="container ">
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
          className="border rounded btn-light"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="bi bi-rewind-fill" ></i>
        </button>
        <button
          className="border rounded btn-light"
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
          className="border rounded btn-light"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
        <button
          className="border rounded btn-light"
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
