import React from "react";
import categories from '../data/categories'

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
        <option value="">All</option>
        {categories.map(category => <option value={category}>{category}</option>)}
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