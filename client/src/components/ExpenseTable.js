import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Table as BTable } from "react-bootstrap";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseForm from "./AddExpenseForm";
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
      },
      {
        accessorKey: "amount",
        header: "Amount",
        meta: {
          filterVariant: "range",
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "date",
        header: "Date",
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
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
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
      </BTable>
      <AddExpenseForm openExpenseForm={showModal} closeExpenseForm={closeExpenseForm} />
    </div>
  );
}

function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={columnFilterValue?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-12 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={columnFilterValue?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-12 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="Automotive">Automotive</option>
      <option value="Bills & Utilities">Bills & Utilities</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Food & Drink">Food & Drink</option>
      <option value="Gifts & Donations">Gifts & Donations</option>
      <option value="Groceries">Groceries</option>
      <option value="Health & Wellness">Health & Wellness</option>
      <option value="Home">Home</option>
      <option value="Miscellaneous">Miscellaneous</option>
      <option value="Travel">Travel</option>
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={columnFilterValue ?? ""}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default ExpenseTable;
