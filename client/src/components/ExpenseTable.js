import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseForm from "./AddExpenseForm";
import FilterTable from "./FilterTable";
import "../color.css"
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
      const formatedData = data.map(
        (expense)=>{
          return {
            ...expense,
            amount: `NOK ${expense.amount}`
          }
      })
      console.log(formatedData)
      setExpense(formatedData);
    }
  }, [data]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        enableColumnFilter: false,
        sortingFN: 'datetime'
      },
      {
        accessorKey: "name",
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorKey: "category",
        header: "",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        enableColumnFilter: false,
        // meta: {
        //   filterVariant: "range",
        // }
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
                  if (cell.id.includes("date")){
                    const date = new Date(cell.getValue())
                    return (
                      <td key={cell.id} value={cell.getValue()}>{date.toLocaleDateString("en-GB", {  
                        day: "2-digit", month: "short", year: "numeric"})}</td>
                    );
                  }
                  if (cell.id.includes("category")){
                    const date = new Date(cell.getValue())
                    console.log(cell.getValue().split(" ")[0])
                    return (
                      <td key={cell.id}>
                        <div >
                          <text className={`bg-${cell.getValue().split(" ")[0]}-custom text-white bg-spacing `}>{cell.getValue()}</text>
                        </div>
                        
                      </td>
                    );
                  }
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
