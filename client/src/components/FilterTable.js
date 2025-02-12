import React from "react";

function FilterTable({ column }) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};
  
    return filterVariant === "range" ? (
      <div>
        <div className="flex space-x-2">
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
        <option value="">All Categories</option>
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

  export default FilterTable