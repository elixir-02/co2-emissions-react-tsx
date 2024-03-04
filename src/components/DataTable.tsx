import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
} from '@mui/material';
import Footer from './Footer';

interface DataTableProps {
  data: DataRow[];
  rowsPerPage: number;
}

interface DataRow {
  ISO3: string;
  Name: string;
  [year: string]: string;
}


const DataTable: React.FC<DataTableProps> = ({ data, rowsPerPage: initialRowsPerPage }) => {
  const [sortedData, setSortedData] = useState<DataRow[]>(data);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);

  const handleSort = (column: string) => {
    const order = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(column);
    setSortOrder(order);

    const sorted = [...data].sort((a, b) => {
      const aValue = String(a[column] || '');
      const bValue = String(b[column] || '');
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setSortedData(sorted);
  };

  const handleFilter = (column: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, 'global': value }));
  };

  const filteredData = sortedData.filter((row) => {
    const globalFilterValue = filters['global']?.toLowerCase();
    if (!globalFilterValue) return true;

    return Object.values(row).some((cellValue) =>
      String(cellValue).toLowerCase().includes(globalFilterValue)
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when changing rows per page
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => handleFilter('', e.target.value)}
          style={{ marginBottom: '8px', marginTop: '8px', marginLeft: '-79rem' }}
          size='small'
        />
        <TableContainer style={{ height: '80vh', width: '98vw', marginLeft: '-176px' }} component={Paper}>
          <Table>
          <TableHead>
            <TableRow style={{ background: 'rgb(79 110 142)' }}>
              <TableCell style={{ fontSize: '14px', minWidth: '80px', height: '40px' }} className="font-bold header-cell">
                <TableSortLabel
                  active={sortBy === 'ISO3'}
                  direction={sortOrder}
                  onClick={() => handleSort('ISO3')}
                >
                  ISO3
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontSize: '14px', minWidth: '130px', height: '40px' }} className="font-bold header-cell">
                <TableSortLabel
                  active={sortBy === 'Name'}
                  direction={sortOrder}
                  onClick={() => handleSort('Name')}
                >
                  Indicator Name
                </TableSortLabel>
              </TableCell>
              {Array.from({ length: 23 }, (_, index) => 1995 + index).map((year) => (
                <TableCell key={year} className="font-bold header-cell">
                  <TableSortLabel
                    active={sortBy === String(year)}
                    direction={sortOrder}
                    onClick={() => handleSort(String(year))}
                  >
                    {year}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? 'rgb(229 240 255)' : 'white' }}>
                 <TableCell className="font-bold">{row.ISO3}</TableCell>
               <TableCell style={{ verticalAlign: 'top' }}>{row.Name}</TableCell>
                 {Array.from({ length: 23 }, (_, index) => 1995 + index).map((year) => (
                  <TableCell key={year}>
                    {row[String(year)] !== undefined && row[String(year)] !== '' ? row[String(year)] : '--'}
                  </TableCell>
                ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage, rowsPerPage * 2, rowsPerPage * 3]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <Footer/>
    </>
  );
};

export default DataTable;
