import { useSortBy, useTable } from "react-table";

import { Funnel, SortAscending, SortDescending } from "phosphor-react";

import { TableProps } from "./Table.types";

export function Table({ columns, data }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="table w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <span className="flex gap-2">
                  {column.render("Header")}
                  {column.isSorted &&
                    (column.isSortedDesc ? (
                      <SortAscending size={16} />
                    ) : (
                      <SortDescending size={16} />
                    ))}
                  {!column.disableSortBy && !column.isSorted && (
                    <Funnel size={16} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
