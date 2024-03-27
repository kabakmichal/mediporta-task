// TableResults.jsx
import "./style.css";
import { useState, useEffect } from "react";
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TableResults = ({ data, elementsPerPage, setElementsPerPage }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [page, setPage] = useState(0);

  useEffect(() => {
    setSortedData(sortData(data, sortConfig));
  }, [data, sortConfig]);

  const sortData = (data, config) => {
    if (!config.key) return data;

    const sortableData = [...data];
    sortableData.sort((a, b) => {
      if (config.key === "id") {
        return config.direction === "ascending" ? a.id - b.id : b.id - a.id;
      } else if (config.key === "tag") {
        const tagA = a.name || ""; // Używamy a.name zamiast a.tag
        const tagB = b.name || ""; // Używamy b.name zamiast b.tag
        return config.direction === "ascending"
          ? tagA.localeCompare(tagB)
          : tagB.localeCompare(tagA);
      } else if (config.key === "count") {
        return config.direction === "ascending"
          ? a.count - b.count
          : b.count - a.count;
      }
      return 0;
    });
    return sortableData;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setElementsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    if (key === "id") {
      // Jeśli kliknięto na nagłówek ID, przywróć pierwotny stan tabeli
      setSortConfig({ key: null, direction: "ascending" });
    } else {
      setSortConfig({ key, direction });
    }
  };

  const sortedDataItems = sortedData.slice(
    page * elementsPerPage,
    (page + 1) * elementsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("id")}>ID</TableCell>
            <TableCell onClick={() => handleSort("tag")}>Tag</TableCell>
            <TableCell onClick={() => handleSort("count")}>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDataItems.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{page * elementsPerPage + index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={sortedData.length}
        rowsPerPage={elementsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TableResults;
