import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import TablePaginationActions from "../../components/table/TablePaginationActions";

// eslint-disable-next-line no-unused-vars
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 4,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// eslint-disable-next-line react/prop-types
const Tanstack = ({ data, columns, customBtn = "" }) => {
  const [globalFilter, setGlobalFilter] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,

    //core
    getCoreRowModel: getCoreRowModel(),

    //global filter
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,

    //sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    //pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    //column resize
    columnResizeMode: "onChange",
    state: { sorting, pagination, globalFilter },
  });

  return (
    <section className="container mx-auto w-5xl p-2 font-roboto mt-10">
      {/**global filter */}
      <section className="flex flex-row gap-2 justify-end mb-2">
        {customBtn}

        <TextField
          id="search"
          label="Search"
          variant="outlined"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          size="small"
          className="bg-white"
        />
      </section>

      <TableContainer className="border-l border-t border-[#e0e0e0] overflow-x-auto rounded-md shadow-md">
        <Table
          className="min-w-full border-collapse bg-white rounded-md"
          sx={{ minWidth: 750 }}
        >
          {/** header */}
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell
                    component="th"
                    key={header.id}
                    className="border-r border-[#e0e0e0] relative cursor-pointer"
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.columnDef.header}
                    {
                      { asc: " 🔼", desc: " 🔽" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute top-0 right-0 w-[5px] h-full border border-[#e0e0e0] bg-[#e0e0e0] opacity-0 cursor-ew-resize hover:opacity-100 "
                    />
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {/** body */}
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id} hover>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell
                    key={cell.id}
                    className="border-r border-[#e0e0e0]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
          {/** footer */}
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((footer) => (
                  <StyledTableCell
                    key={footer.id}
                    className="border-r border-t border-[#e0e0e0]"
                  >
                    {footer.column.columnDef.footer}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
        <TablePagination
          rowsPerPageOptions={[
            10,
            20,
            30,
            40,
            50,
            // eslint-disable-next-line react/prop-types
            { label: "All", value: data.length },
          ]}
          component="div"
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={pagination.pageSize}
          page={pagination.pageIndex}
          slotProps={{
            select: {
              inputProps: { "aria-label": "rows per page" },
              native: true,
            },
          }}
          onPageChange={(_, page) => {
            table.setPageIndex(page);
          }}
          onRowsPerPageChange={(e) => {
            const size = e.target.value ? Number(e.target.value) : 10;
            table.setPageSize(size);
          }}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
    </section>
  );
};

export default Tanstack;
