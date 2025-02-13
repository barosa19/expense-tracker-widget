import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Table as BTable } from "react-bootstrap";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseForm from "./AddExpenseForm";
import FilterTable from "./FilterTable";
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
            amount: `NOK ${expense.amount}`,
            // date: date
          }
      })
      console.log(formatedData)
      setExpense(formatedData);
    }
  }, [data]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const openExpenseForm = () => setShowModal(true);
  const closeExpenseForm = () => setShowModal(false);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => (
          <button
            type="button"
            className="btn"
            onClick={() => {
              openExpenseForm();
            }}
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        ),
        cell: (info) => <i className="bi bi-pencil"></i>,
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "name",
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        enableColumnFilter: false,
        // meta: {
        //   filterVariant: "range",
        // },
      },
      {
        accessorKey: "category",
        header: "",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        enableColumnFilter: false,
        sortingFN: 'datetime'
      },
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
    <div className="p-2">
      <BTable striped bordered hover responsive size="sm">
        <thead>
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
      </BTable>
      <AddExpenseForm openExpenseForm={showModal} closeExpenseForm={closeExpenseForm} />
    </div>
  );
}

export default ExpenseTable;
