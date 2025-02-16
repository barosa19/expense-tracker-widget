import React from "react";
import categories from '../data/categories'

function FilterTable({ column }) {
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};
  
    return (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value="">All</option>
        {categories.map(category => <option value={category}>{category}</option>)}
      </select>
    ) 
  }
  
  export default FilterTable