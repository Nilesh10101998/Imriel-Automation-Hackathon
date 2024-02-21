import React from 'react';

function DataTable({ data }) {
  // Assuming `data` is an array of arrays, where each child array represents a row
  // and each element in the child array represents a column

  return (
    <table>
      <thead>
        <tr>
          {data[0] && data[0].map((header, index) => <th key={index}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((column, columnIndex) => <td key={columnIndex}>{column}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;